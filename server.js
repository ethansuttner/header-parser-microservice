var express = require('express');
var app = express();

var useragent = require('express-useragent')
app.use(useragent.express());
app.use(express.static(__dirname + "/client/"))

app.get('/', function(req, res){
  //console.log(req.useragent)
  console.log(req.headers)
  var headers = req.headers
  var output = {}
  output["ipaddress"] = headers['x-forwarded-for']
  if (!headers['accept-language']) {
    output["language"] = ""
  } else if (headers['accept-language'].indexOf(",") !== -1) {
    output["language"] = headers['accept-language'].slice(0,headers['accept-language'].indexOf(","))
  } else {
    output["language"] = headers['accept-language']
  }
  
  if (!headers["user-agent"]) {
    output["software"] = ""
  } else if (headers["user-agent"].indexOf("(") !== -1 && headers["user-agent"].indexOf(")") !== -1) {
    output["software"] = headers["user-agent"].slice(headers["user-agent"].indexOf("(")+1,headers["user-agent"].indexOf(")"))
  } else {
    output["software"] = headers["user-agent"]
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(output))
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Example app listening on port 8080!');
});