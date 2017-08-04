var http = require('http');
var dt = require('./timemodule.js');
var url = require('url');
var fs = require('fs');

// var events = require('events');
// var eventEmitter = new events.EventEmitter();
// eventEmitter.on('scream', function () {console.log('I hear a scream!');});
// eventEmitter.emit('scream');

http.createServer(function (req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    var q = url.parse(req.url, true).query;
    res.write('Current time is :' + dt.myDateTime() + "\n");
    var txt = q.year + " " + q.month;
//    res.write(req.url + "\n");
    res.write(txt);
    res.end();
}).listen(8080);
