// Initiate Express
var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
console.log('App started');

//DELETE THIS
var cors = require('cors');
app.use(cors());

//HTTPS REDIRECT
app.use( function (req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://standardrequests.com' + req.url);
    }
});

//Static Files
app.use(express.static('public', {dotfiles:'allow'}));
var routes = require('./routes');

//If the webApp is using the api
app.use('/api/', routes);

//Otherwise, just give them the client webApp
app.use('*', function(req,res){
     res.sendFile('/home/adam/standard-requests/public/test/login/login.html');
});


var http  = require('http');
http.createServer(app).listen(80);
var fs = require('fs');
var privateKey = fs.readFileSync('/etc/letsencrypt/live/standardrequests.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/standardrequests.com/cert.pem', 'utf8');
var ca = fs.readFileSync('/etc/letsencrypt/live/standardrequests.com/chain.pem', 'utf8');
var options = {key: privateKey, cert: certificate, ca: ca};
var https = require('https');
https.createServer(options, app).listen(443);