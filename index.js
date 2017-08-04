var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false})

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
});

app.use(express.static('public'));
app.get('/form.html', function(req, res){
  res.sendFile(__dirname + "/" + "form.html");
});

app.get('/', function (req, res) {
  res.send('Hello GET');
});

app.post('/process',urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

app.get('/process',urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

app.delete('/del', function (req, res) {
  console.log('Got a DELETE request');
  res.send('Hello DELETE');
});

app.get('/abcd*', function(req, res) {
  console.log("Got a GET request for /ab*cd");
  res.send('Page Pattern Match');
});
