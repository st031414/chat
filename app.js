const http = require("http");
const server = http.createServer();
const fs = require("fs");


server.on("request",function(req,res){
	fs.readFile("./client/index.html","utf8",function(err,data){
		if(err){
			res.writeHead(404,{"contest-Type":"text/plain"});
			res.write("page not found");
			return res.end();
		}
		res.writeHead(200, {"Content-Type":"text/html"});
		res.write(data);
		res.end();
	})
});

const port = 3000;
server.listen(port,function(){
	console.log("server running on port" + port);
});

const socketio = require("socket.io");
const io = socketio.listen(server);
var cot = 0;

io.sockets.on('connection', function(socket) {
  socket.emit("from_server", {value: 'hello'}, function (data) {
    console.log("hey" + cot);
	cot++;
  });
  
  socket.on("txtsend", function (data) {
    io.sockets.emit("txtsend", {value:data.value});
  });
});