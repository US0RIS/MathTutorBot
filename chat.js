const chatBox = document.getElementById('chat');
const userInput = document.getElementById('userInput');

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  userInput.value = "";

  try {
    const response = await fetch("https://e1daa5d0-10d2-48ff-9214-1495a9b30b37-00-3fsa6b19pb26o.riker.replit.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    appendMessage("TutorBot", data.reply || "⚠️ No reply.");
  } catch (err) {
    console.error(err);
    appendMessage("TutorBot", "⚠️ Could not reach the tutor server.");
  }
}

function appendMessage(sender, text) {
  chatBox.innerHTML += `<p><strong>${sender}:</strong> ${text}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
