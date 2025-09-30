const chatBox = document.getElementById('chat');
const userInput = document.getElementById('userInput');

// 👇 Add your OpenAI API key here
const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  userInput.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a friendly 8th grade math tutor. 
You help students solve problems by explaining concepts and asking questions to guide their thinking. 
Never give the final answer directly. Your job is to help students understand the process and build confidence.`
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  appendMessage("TutorBot", reply);
}

function appendMessage(sender, text) {
  chatBox.innerHTML += `<p><strong>${sender}:</strong> ${text}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
