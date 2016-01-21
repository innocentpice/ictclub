var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
 
app.set('views', path.join(__dirname, 'views'));
 

app.set('view engine', 'jade');
app.use(express.static('public'));

app.get(['/','/:url'], function(req, res){
  if(req.params.url == undefined){
    req.params.url = 'index';
  }
  docs = path.join('views/',req.params.url+'.jade');
  fs.exists(docs, function (exists) {
    if(exists){
      res.render(req.params.url); 
    }else{
      res.render('error');
    }
  });
  console.log("Name : "+req.query.Name);
});
 
var server = app.listen(8080, function() {
    console.log('Express.js is running...');
});