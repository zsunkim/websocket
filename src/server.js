import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log("Disconnected from the Browser");
}

const sockets = [];

// backend에 연결된 사람의 정보 제공 (socket)
wss.on("connection", (socket) => { // connection이 생겼을 때 socket으로 즉시 메세지 보내기
  sockets.push(socket);
  console.log("Connected to Browser ✅");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message));
  });
});

server.listen(3000, handleListen);