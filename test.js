var exec = require('child_process').exec;
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var secret = "";
var repo = "../demoexpress";

app.get('/', function(req,res){
	console.log('Hello World '+req.url);
	res.send("Hello World");
	exec('cd ' + repo + ' && git pull');
});

// this calls a git pull
app.post('/update', function(req,res){
	console.log('got something');
	var data = req.body;
	if(data !== null){
    var child = exec('cd ../demoexpress && git pull --rebase origin master',
    function(error, stdout, stderr)  {
     console.log('error', error);
     console.log('stdout: ', stdout);
     console.log('stderr: ', stderr);
     if (error !== null) {
      console.log("exec error", error);
    }
    });
  }
	res.status(200);
    res.send();
});


var port = 80;
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log('server is listening on '+ port);
});