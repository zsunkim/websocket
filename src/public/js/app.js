const socket = new WebSocket(`ws://${window.location.host}`);

// socker open event // connection이 open되면 메소드 실행
socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

// socker message event // 메세지를 받을 때마다 내용을 출력하는 이벤트
socket.addEventListener("message", (message) => {
  console.log("message: ", message.data);
})

// socker close event
socket.addEventListener("close", () => {
  console.log("Disconnected to Server");
})

setTimeout(() => {
  socket.send("hello");
}, 10000)