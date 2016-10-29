# nodejs-screencast
Source from nodejs tutorial (youtube screencast::kantor)

## 1-4
(introduction, installing, adding sources etc) 

## 5 (modules)
### global objects:
```javascript
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

```javascript
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

```javascript
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

## 7 (npm introduction)
NPM commands:
- npm **i**nit - initialization;
- npm **pu**blish - add to remote npm repo;
- npm unpublish - remove to remote npm repo;
- npm **addu**ser - log in in npm as user;
- npm **s**earch - search in npm base module by name;
- npm **i**nstall - install module by name;
- npm **up**date - update all modules in you node_modules directory;
- npm **r**emove - remove module from node_modules directody;

