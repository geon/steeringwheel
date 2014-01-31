"use strict";

var template = $("#js-template").text();

var model = new Backbone.Model({
	text: "Some text",
	textInNestedTag: "Works recursively.",
	url: "http://geon.github.io"
});

var View = Backbone.View.extend({

	initialize: function (options) {

		this.$el.append(new Steeringwheel(options.template, this.model).$el);
	}
});

var view = new View({
	model: model,
	el: $("#some-view"),
	template: template
})



var dataLarge = [{
	anotherClass: "large"
},{
	anotherClass: ""
}];

var dataWarning = [{
	class: "warning"
},{
	class: ""
}];

var dataBoast = [{
	text: "Steeringwheel is SUPER DUPER AWESOME.",
	textInNestedTag: "Click it. You know you want to."
},{
	text: "Steeringwheel sort of works.",
	textInNestedTag: "You might want to click here. Maybe."
}];

var large = 0;
$("#large").click(function(){
	model.set(dataLarge[large]);
	large = 1 - large;
})

var warning = 0;
$("#warning").click(function(){
	model.set(dataWarning[warning]);
	warning = 1 - warning;
})

var boast = 0;
$("#boast").click(function(){
	model.set(dataBoast[boast]);
	boast = 1 - boast;
})
