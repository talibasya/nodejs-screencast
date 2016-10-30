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
- mpm prune - remove packages which not added to `package.json`

## 8 (npm pakage structure)
field `version` //MAJOR.MINOR.PATCH http://semver.org

### devDependencies 
istalled with flag (npm config) or run `npm i` in downloaded package.

### main 
path to app.

## 9 (global modules)
`sudo npm -g i express`

## 10 (util, inherits)

```javascript
var obj = {
	a: 5,
	b: 6,
	inspect: function() {
		return 123,
	}
}

console.log(obj) // will 123
```

## 11 (module console)
```javascript
// no console.debug
console.log("Log")  // = info (out) -> standard flow
console.error("Error") // = warn (err) -> error flow
console.trace();
```

## 12 (Inherit Error)
Add to code own HttpError (for 404 type error) and PhraseError (for 500). Inherit using `util`

`Error.captureStackTrace(this, HttpError)` - put stack into Error object.

error handler:
```javascript
try {
	var page = makePage('index')
	console.log(page)
} catch (e) {
	if (e instanceof HttpError) {
		console.log(e.status, e.message);
	} else {
		console.error("Error %s\n message: %s\n stack: %s", e.name, e.message, e.stack);
	}
}
```

## 13 (EE)
```javascript
var server = new EventEmitter;
server.on('request', function(req) {
	// request handler	
});
//...
server.emit('request', {from : 'Client'})

// by default next example will kill process
server.emit('error');
```

### Memory leak 
if they write your handlers into EE, then will leak.

## 14 (nodeJS server )
```javascript
var http = require('http');

var server = new http.Server();

server.listen(1337, '127.0.0.1');

server.on('request', function(req, res) {
	res.end('Hello world');
});

////////
var emit = server.emit;
server.emit = function(event) {
	console.log(event);
	emit.apply(server, arguments);
}
```
## 15 (echo server)

```javascript
var http = require('http');
var url = require('url');

var server = new http.Server(function(req, res) {
	console.log(req.method, req.url);

	var urlParsed = url.parse(req.url, true);

	if (urlParsed.pathname = '/echo' && urlParsed.query.message) {
		res.end(urlParsed.query.message);
	} else {
		res.status.Code = 404;
		res.end('Page not found');
	}
});

server.listen(1337, '127.0.0.1');
```

## 16 (http mpdule documentation)
`http.request` - make http request to resource in the web.

## 17 (development supervisor)
development with livereload for node js
instead `node server.js` using `supervisor server.js`.

## 18 (debugging)

###Default debugger:

1. add command `debugger` to your code;
2. run `node debug server.js`;
3. run `help` in console (`repl`, `cont` ...).

### node-inspector

1. install global package `node-inspector`;
2. run `node --debug server.js` (node --debug-brk server.js); 
3. new console and run `node-inpsector`;
4. add command 'debugger' to your code;

## 19 (login, debug and winston modules)

```javascript
var debug = require('debug')('server:request');
//...
 debug('Echo: ' + message);

```

run server using `DEBUG=server node server.js`
run server using `DEBUG=server:* node server.js`

show code logs:
`NODE_DEBUG="http net" node server.js`

## 20 (async development)
example based `fs.readFile` and `fs.readFileSync`
