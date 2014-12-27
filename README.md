# Web Components Support

Runs some tests to evaluate the level of support for web components in your browsers.

```javascript
WebComponentsSupport(function(results) {
	// results will hold an object with four keys
	// output it to the console:
	console.log(JSON.stringify(results, null, 2));
});
```

Output might be something like this in a browser will full web components support:

```
{
  "customElements": {
    "available": true,
    "implementation": "native"
  },
  "shadowDOM": {
    "available": true,
    "implementation": "native"
  },
  "templates": {
    "available": true,
    "implementation": "native"
  },
  "htmlImports": {
    "available": true,
    "implementation": "native"
  }
}
```

or this in a browser which doesn't support web components:

```
{
  "customElements": {
    "available": false
  },
  "shadowDOM": {
    "available": false
  },
  "templates": {
    "available": true,
    "implementation": "native"
  },
  "htmlImports": {
    "available": false
  }
}
```

## !!! Warning !!!

It's early times for this code. Look at the [issues](https://github.com/sole/WebComponentsSupport/issues) to figure out what is missing.

In particular, HTML imports detection for Firefox might not be really reliable. I also need to see how things look like when using polyfills such as [webcomponents.js](https://github.com/WebComponents/webcomponentsjs).

Help appreciated!
