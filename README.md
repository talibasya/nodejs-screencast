# nodejs-screencast
Source from nodejs tutorial (youtube screencast::kantor)

## 1-4
(introduction, installing, adding sources etc) 

## 5 (modules)
### global objects:
```
global.User = function() {
	...
}
```
### require('./file'):
1. file.js
2. file.node
2. file.json
3. file/index.js

## 6 (working with modules)
structure variable module

```
if (module.parent) {
	console.log('was included to another file')
} else {
	console.log('this file was run')
}

``` 

A file included once and getting from cache for next `require` method.

## module searching
for method `require(db)`
```
node_modules
../node_modules
../../node_modules
...
NODE_PATH=. node server.js
```
## factory

```javasctipt
// index.js
var log = require('logger')(module);

// logger/index.js
module.exports = function(module) {
	return function(/*...*/) {
		var args = [module.filename].concat([].slice.call(arguments));
		console.log.apply(console, arguments);		
	}
};
```