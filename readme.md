steeringwheel.js
================

Steeringwheel is a handlebars-compatible (not really) templating engine that updates the DOM in place rather than replacing it.

Why?
----
I like Handlebars templates, but when used on the client, they [break CSS transitions](http://geon.github.io/programming/2013/05/11/client-side-templating-breaks-css-transitions/), which is sad. I hope to fix that.

How?
----
Instead of re-rendering a template and replacing the DOM fragment over and over, I build the DOM fragment once, and only overwrite the value of the text nodes.

For Backbone?
-------------
Yes, it is built for using with Backbone, but it shouldn't be a problem to generalize it to work without it.

But This Isn't Handlebars-Compatible!
-------------------------------------
No, I know. Not yet. 

By actually using Handlebars to render the text-nodes, full compatibility should be possible, apart from custom block helpers.

TODO
----
* Use Handlebars to render text nodes.
* Mimic the `#if` and `#unless` block helpers.
* Mimic the `#each` block helper.
* Mimic the `#with` block helper.