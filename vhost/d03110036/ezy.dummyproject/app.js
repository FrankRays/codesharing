var express      = require('express'),
    app          = express(),
    http         = require('http').Server(app),
    io           = require('socket.io')(http),
    mysql        = require('mysql'),
    connection   = require('express-myconnection'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    path         = require('path'),
    editor       = require('./lib/editor')(app, io),
    api          = require('./lib/phpapi');


global.__vhost = path.resolve('../vhost/');
global.__asset = "../codesharing/assets/";
global.fs      = fs = require('fs-extra');
    
app.set('views', path.join(__dirname, 'views'));app.set('view engine', 'ejs');
app.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cookieParser(),
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306,
        database:'codesharing'
    },'request'),
    function(r,s,n) {
        r.header("Access-Control-Allow-Origin", "*");
        r.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        n();
    }
);
app.use('/api', api);
function createServer () {
    http.listen(3000);
	console.log('Server running');
}
createServer();
