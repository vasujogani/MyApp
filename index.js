var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var urlencodedParser = bodyParser.urlencoded({extended: false})

app.use(express.static('public'));
app.use(urlencodedParser);
app.use(multer({dest: '/tmp/'}));

app.get('/form.html', function(req, res){
  res.sendFile(__dirname + "/" + "form.html");
});

app.get('/', function (req, res) {
  res.send('Hello GET');
});

app.post('/process',upload.single('avatar'), function (req, res, next) {
  console.log(req.files.file.name);
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


var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
});
