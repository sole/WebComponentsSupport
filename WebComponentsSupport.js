(function() {

	// custom elements -> registerElement
	var regElemAvailable = !!document.registerElement;
	var regElemNative = false;
	if(regElemAvailable) {
		regElemNative = isNativeCode(document.registerElement);
	}

	// shadowDom -> createShadowRoot
	var dummyDiv = document.createElement('div');
	var shadowRootAvailable = !!dummyDiv.createShadowRoot;
	var shadowRootNative = false;
	if(shadowRootAvailable) {
		shadowRootNative = isNativeCode(dummyDiv.createShadowRoot);
	}

	// html imports
	// html templates
	var dummyTemplate = document.createElement('template');
	var templatesAvailable = !!(dummyTemplate.content);

	function isNativeCode(fun) {
		var src = fun.toString();
		var pos = src.search(/\[native code\]/);
		return (pos !== -1);
	}

	function makeSupportObject(available, funNative) {
		var obj = {};
		obj.available = available;

		if(available) {
			obj.implementation = funNative ? 'native' : 'polyfill';
		}

		return obj;
	}

	var WebComponentsSupport = {
		customElements: makeSupportObject(regElemAvailable, regElemNative),
		shadowDOM: makeSupportObject(shadowRootAvailable, shadowRootNative),
		// assuming if templates are available, support is nativ
		// - not sure how to test this as I can't access a browser without template support
		templates: makeSupportObject(templatesAvailable, templatesAvailable)
	};

	// Make it compatible for require.js/AMD loader(s)
	if(typeof define === 'function' && define.amd) {
		define(function() { return WebComponentsSupport; });
	} else if(typeof module !== 'undefined' && module.exports) {
		// And for npm/node.js
		module.exports = WebComponentsSupport;
	} else {
		this.WebComponentsSupport = WebComponentsSupport;
	}
})();
