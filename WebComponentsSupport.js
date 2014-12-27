(function() {

	// custom elements -> registerElement
	var regElemAvailable = !!document.registerElement;
	var regElemNative = false;
	if(regElemAvailable) {
		regElemNative = isNativeCode(document.registerElement);
	}

	// shadowDom -> createShadowRoot
	// html imports
	// html templates

	function isNativeCode(fun) {
		var src = fun.toSource();
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
		customElements: makeSupportObject(regElemAvailable, regElemNative)
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
