var express = require('express');
var app = express();
var path =  require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});

var handlebars = require('express-handlebars').create({defaultLayout:'main'});


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(urlencodedParser);

var formidable = require('formidable');
var credentials = require('./credentials.js');
// app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(cookieParser(credentials.cookieSecret));

app.get('/', function (req, res) {
  // console.log("loading home page");
  res.render('login');
});

app.use(function(req, res, next){
  console.log("Looking for URL: " + req.url);
  next();
});

app.get('/junk', function(req,res,next){
  console.log('Tried to access /junk');
  throw new Error ('/junk doesn\'t exist')
});

app.use(function(err,req,res,next){
  console.log('Error: '+ err.message);
  next();
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/contact', function(req,res){
  res.render('contact', {csrf: 'CSRF token here'});
});

app.get('/thankyou', function(req,res){
  res.render('thankyou');
});

app.post('/process', function(req,res){
  console.log('Form : ' + req.query.form);
  console.log('CSRF token : ' + req.body._csrf);
  console.log('Email : ' + req.body.email);
  console.log('Question : ' + req.body.ques);
  res.redirect(303, '/thankyou');
});

app.get('/file-upload', function(req,res){
  var now = new Date();
  console.log(now.getMonth());
  res.render('file-upload',{
    year: 2012,
    month: 7
  });
});

app.post('/file-upload/:year/:month', function(req,res){
  var form = formidable.IncomingForm();
  form.parse(req, function(err, fields, file){
    if(err)
      return res.redirect(303, '/error');
    console.log('Received File');
    console.log(file);
    res.redirect(303,'/thankyou');
  });
});

var server = app.listen(8080, function () {
  // var host = server.address().address
  // var port = server.address().port
});

app.use(function(req,res){
  res.type('text/html');
  res.status(404);
  res.render('404');
});

app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
})
