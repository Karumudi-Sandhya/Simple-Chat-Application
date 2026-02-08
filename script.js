let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
let typingTimeout;

function saveMessages() {
  localStorage.setItem("chatMessages", JSON.stringify(messages));
}

function sendMessage() {
  const user = document.getElementById("username").value.trim();
  const text = document.getElementById("messageInput").value.trim();

  if (user === "" || text === "") return;

  const time = new Date().toLocaleTimeString();

  messages.push({ user, text, time });
  saveMessages();
  document.getElementById("messageInput").value = "";
  displayMessages();
}

function deleteMessage(index) {
  messages.splice(index, 1);
  saveMessages();
  displayMessages();
}

function editMessage(index) {
  const updated = prompt("Edit message:", messages[index].text);
  if (updated && updated.trim() !== "") {
    messages[index].text = updated;
    saveMessages();
    displayMessages();
  }
}

function displayMessages() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  messages.forEach((msg, index) => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `
      <strong>${msg.user}</strong>: ${msg.text}
      <br>
      <span>${msg.time}</span>
      <div class="actions">
        <button onclick="editMessage(${index})">Edit</button>
        <button onclick="deleteMessage(${index})">Delete</button>
      </div>
    `;
    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("messageInput").addEventListener("input", () => {
  document.getElementById("typingStatus").innerText = "Typing...";
  clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    document.getElementById("typingStatus").innerText = "";
  }, 1000);
});

displayMessages();
