const http = require("http");
const fs = require("fs");

const port = 3000;


const server = http.createServer(function(req,res){
	
	res.writeHead(200, {"Content-Type":"text/html"});
		//res.write(data);
		res.end(fs.readFileSync(__dirname + "/client/index.html"));

}).listen(port);