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
var userHash = {};
var cnt = 1;

io.sockets.on('connection', function(socket) {
  socket.emit("countshow", {value: cnt}, function (data) {
  });
  
  //メッセージを表示するソケット
  socket.on("txtsend", function (data) {
    io.sockets.emit("txtsend", {value:data.value});
  });
  
  //サーバーに現在の人数を表示させるソケット
   socket.on("connected", function (name) {
    userHash[socket.id] = name;
	console.log("現在の人数：" + cnt + "人");
	cnt++;
  });
  
  socket.on("disconnect", function () {
    if (userHash[socket.id]) {
      delete userHash[socket.id];
	  cnt--;
	  console.log("現在の人数：" + cnt + "人");
    }
  });
  
  //クライアントに現在の人数を教える
  /*
  socket.on("countshow", function () {
	  io.sockets.emit("countshow", {value:cnt});
  });*/
  
});