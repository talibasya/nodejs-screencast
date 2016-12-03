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

## 21 (event cycle, library libUV)
how event loop works in the Node.js.

## 22 ( timers. difference between browser and server, **ref/unref** )

server will close connection after 2500 secs.

```javascript
var http = require('http');
var server = new http.Server(function(req, res){ ... }).listen(3000);

setTimeout(function(){
	server.close();	
}, 2500);
```

If will added a next code:
```javascript
setInterval(function() {
	console.log(process.memoryUsage());
}, 1000)
```
The node js working doesn't finish.

The resolve is:
```javascript
setTimeout(function(){
	server.close(function() { process.exit() }); // or clear interval 	
}, 2500);
```
### ref/unref

Tell node js `setInterval` timer is not important.
```javascript
var timer = setInterval(function() {
	console.log(process.memoryUsage());
}, 1000)

timer.unref();
```

**ref** - u can use after command `timer.unref()`. Set timer as an important worker again.
You can use these methods for `Socket`, `http.Server`, `Timer` etc.

**process.nextTick** - put callback into event loop as next event.

```javascript
var fs = require('fs');

fs.open(__filename, 'r', function(err, file) {
	console.log('IO!');
});

setImmediate(function(){
	console.log('immediate');
});

process.nextTick(function() {
	console.log('nextTick')
});
```
output:
```
nextTick
IO!
immediate
```

## 23 (read/write, binary, module fs)

```javascript
var fs = require('fs');

//fs.readFile(__filename, {encoding: 'utf-8'}, function(err, data) {
fs.readFile(__filename, function(err, data) {
	if (err) return console.error(err);
	console.log(data); // take a Buffer object [a5 58 19 ...]
	// console.log(data.toString()) // show text (current javascript source code)
});
```

## 24 (safe path to file)

Send remote file via access authorization
```javascript
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var ROOT = __dirname + '/public';

http.createServer(function(req, res) {
	if (!checkAccess(req)) {
		res.statusCode = 403;
		res.end('Tell me the secret to access!');
		return;
	}

	sendFileSafe(url.parse(req.url).pathname, res);

}).listen(3000);

function checkAccess(req) {
	return url.parse(req.url, true).query.secret == 'o_O';
}

function sendFileSafe(filePath, res) {

	function sendResult(code, text) {
		res.statusCode = code;
		res.end(text);
	}
	
	try { // decode cyrillic symbols
		filePath = decodeURIComponent(filePath);
	} catch(e) {
		return sendResult(400, 'Bad request');
	}

	if (~filePath.indexOf('\0')) { // find hidden symbol
		return sendResult(400, 'Bad request');
	}

	filePath = path.normalize(path.join(ROOT, filePath)); // from dir public

	if (filePath.indexOf(ROOT) != 0) { // check out safe mode (remove . .. //// etc)
		return sendResult(404, 'File not found');
	}

	fs.stat(filePath, function(err, stats) { // check exist file and type
		if (err || !stats.isFile()) {
			return sendResult(404, 'File not found');
		}

		sendFile(filePath, res); // send file
	})
}

function sendFile(filePath, res) {
	
	fs.readFile(filePath, function(err, content) { // bad approach - can kill server, file too big etc
		if (err) throw err;

		var mime = require('mime').lookup(filePath);
		res.setHeader('Content-Type'. mime + "; charset=utf-8");
		res.end(content);
	})
}
```

## 25 (threads, fs.ReadStream)

Read a big file using streams. This is the best way and safe for reading/writing files. 
```javascript
var fs = require('fs');

// fs.ReadStream incherids from stream.Readable
var stream = new fs.ReadStream(__filename);
//var stream = new fs.ReadStream(__filename, {encoding: 'utf-8'});

stream.on('readable', function() {
	var data = stream.read();
	console.log(data);
})

stream.on('end', function() {
	console.log('THE END')
});

stream.on('error', function(err) {
	console.error(err);	
})
```

## 26 (writable thread. method pipe)
The code below explain how to handle readable/writable streams and using pipe method
```javascript
var http = require('http');
var fs = require('fs');

new http.Server(function(req, res) {
	if (req.url == '/big.html'){
		var file = new fs.ReadStream('big.html');
		sendFile(file, res);
	}
}).listen(3000);

function sendFile(file, res) {
	file.on('readable', write);

	function write() {
		var fileContent = file.read();

		if (fileContent && !res.write(fileContent)) {
			file.removeListener('readable', write);

			res.once('drain', function() {
				file.on('readable', write);
				write();
			})
		}
	}

	file.on('end', function() {
		res.end();
	})
}

// new version
function sendFile(file, res) {
	file.pipe(res);
	file.pipe(process.stdout);

	file.on('error', function(err) {
		res.statusCode = 500;
		res.end('Server Error');
		console.error(err);
	});

	file
		.on('open', function() {
			console.log('open');
		})
		.on('close', function() {
			console.log('close');
		});

	res.on('close', function() { // connection was break (for normal 'close' emits event 'finish')
		file.destroy();
	})
}
```

curl tutorial :)
```
curl --limit-rate 1k http://localhost:3000/big.html
```

## 27 (chat based on long-polling, reading POST)

Implemented chat example in `chat` folder. 
```
git clone
node ./chat/server.js
``` 
## 28 (domain, async try..catch)

It is in `domain` folder and shows how to use domain. This is a specific module from **Node.js** and catches async errors from callback functions. The file `domain.js` is an example how to use. To run server please perform below commands:
```
git clone
node ./domain/app.js
```
A main file - `app.js`. Includes `handler` for example and emit error which goes throught domain. The another version `handler2` commented is once more kind of errors.

## 29 (read paramateres from command line)

```javascript
// node server.js --port=3000
// node server.js -port 3000
var http = require('http');
var opts = require('optimist').argv;

// console.log(process.argv);
// console.log(process.env.HOME); // home directory
// console.log(process.env.NODE_ENV); // type envoirment

http.createServer(function(req, res) {
	res.end('the server is running');
}).listen(opts.port);
```

## 30 Express: the basics, middleware

In this exercise was implemented chat based on **express** framework and add into `express-chat` folder

1. Install `express` as global package
 ```
 npm install -g express
 ```
 * for ubuntu also you need to install an `express-generator` package
 ```
 npm install -g express-generator
 ``` 
2. Create project making express
 ```
 express -e -s // -s parameter doesn't work on ubuntu
 npm i // install dependencies
 ```

Using middleware u can add your handler for each requrest to server. Also you have control for including next `use` or send response on current step.

Middleware with four parameters `express` get as an error handler.

Default response `not found GET /url` will rewrite your own middleware on the botttom of chain.
 