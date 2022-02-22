const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

// object -> string 변환
function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

// socker open event // connection이 open되면 메소드 실행
socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

// socker message event // 메세지를 받을 때마다 내용을 출력하는 이벤트
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
})

// socker close event
socket.addEventListener("close", () => {
  console.log("Disconnected to Server");
})

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);