
function Steeringwheel (template, model) {

	this.model = model;
	var DOMFragment = $.parseHTML(template);
	this.$el = $(DOMFragment);

	this.templateParameterPattern = /{{.+?}}/g;
	this.usedTemplateParameters = []

	this.initNodes(DOMFragment);

	_.each(this.usedTemplateParameters, function (parameter) {
		
		// Initial render.
		this.applyParameterToNodes(parameter);

		// Re-render when any parameter changes.
		this.model.on("change:"+parameter.name, function () {
			this.applyParameterToNodes(parameter);
		}, this);
	}, this);
}


Steeringwheel.prototype.initNodes = function (nodes) {

	// Go throught the DOM tree recursively and run collectParameters on all text nodes.

	for (var i = 0; i < nodes.length; ++i) {
		var node = nodes[i];

		switch (node.nodeType) {

			case 1: // ELEMENT_NODE

				// TODO: Handle properties as well.
				_.each(node.attributes, this.collectParameters, this);
				this.initNodes(node.childNodes); // Recurse.

				break;

			case 3: // TEXT_NODE

				this.collectParameters(node);
				break;
		}
	}
}


Steeringwheel.prototype.collectParameters = function (node) {

	// Build up a list of all used template parameters and what nodes they affect.

	// Check if the node contains template parameters.
	var matches = node.nodeValue.match(this.templateParameterPattern);
	if (matches) {
		for (var j = 0; j < matches.length; ++j) {
			var match = matches[j];

			var templateParameterName = match.substring(2, match.length-2);

			// Find the parameter or create a new.
			var usedTemplateParameter = _.findWhere(this.usedTemplateParameters, {name: templateParameterName});
			if (!usedTemplateParameter) {

				usedTemplateParameter = {
					name: templateParameterName,
					affectedDOMNodes: []
				};

				this.usedTemplateParameters.push(usedTemplateParameter); 
			}
			
			// Save this node and it's original value.
			usedTemplateParameter.affectedDOMNodes.push({
				node: node,
				originalValue: node.nodeValue				
			});
		}
	}
}


Steeringwheel.prototype.applyParameterToNodes = function (parameter) {

	// Update each affected DOM node.
	_.each(parameter.affectedDOMNodes, function (affectedDOMNode) {

		var newNodeValue = affectedDOMNode.originalValue;

		// ...with all the parameters contained in it.
		_.each(this.usedTemplateParameters, function(parameter){

			var value = this.model.get(parameter.name);
			if (value) {

				newNodeValue = newNodeValue.replace("{{" + parameter.name + "}}", value);
			}
		}, this);

		affectedDOMNode.node.nodeValue = newNodeValue;

	}, this);
}
