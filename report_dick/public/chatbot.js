function submitMessage() {
    const input = document.getElementById("userInput");
    const output = document.getElementById("chatOutput");

    // Append user message
    let userDiv = document.createElement("div");
    userDiv.className = "chat user";
    userDiv.innerHTML = `<div class="chat-message">${input.value}</div>`;
    output.appendChild(userDiv);

    // Simple response logic
    setTimeout(() => {
        let botResponse = document.createElement("div");
        botResponse.className = "chat bot";
        switch(input.value.toLowerCase()) {
            case "hello":
                botResponse.innerHTML = "<div class='chat-message'>Hi there! What can I do for you today?</div>";
                break;
            case "help":
                botResponse.innerHTML = "<div class='chat-message'>Sure, I can help! Please ask your question.</div>";
                break;
            default:
                botResponse.innerHTML = "<div class='chat-message'>Sorry, I didn't understand that. Can you try again?</div>";
                break;
        }
        output.appendChild(botResponse);
    }, 1000);

    // Clear input
    input.value = "";
}
async function sendMessage() {
    const inputField = document.getElementById("userInput");
    const chatOutput = document.getElementById("chatOutput");
  
    const message = inputField.value;
    inputField.value = ''; // Clear input field
  
    displayMessage(message, 'user');
  
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
  
    if (response.ok) {
      const data = await response.json();
      displayMessage(data.message, 'bot');
    } else {
      displayMessage('Failed to get response from the bot', 'bot');
    }
  }
  
  function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    document.getElementById('chatOutput').appendChild(messageDiv);
  }
  