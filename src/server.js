import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    console.log(roomName); // 받은 메세지 출력
    setTimeout(() => {
      done("hello from the backend"); // socket.emit()의 함수 호출
    }, 15000);
  });
});

/*const sockets = [];

// backend에 연결된 사람의 정보 제공 (socket)
wss.on("connection", (socket) => { // connection이 생겼을 때 socket으로 즉시 메세지 보내기
  socket["nickname"] = "Anon";
  sockets.push(socket);
  console.log("Connected to Browser");
  socket.on("close", onSocketClose);
  socket.on("message", (msg) => {
    const message = JSON.parse(msg); // string ->javascript object로 변환
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
        case "nickname":
          socket["nickname"] = message.payload;
        }
      });
    });
    */

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);