class OllamaApiWrapper {
  constructor(model = 'llama3:latest', baseUrl = 'http://localhost:11434') {
    this.model = model;
    this.baseUrl = baseUrl;
  }

  async generateResponse(prompt, options = {}) {
    const defaultOptions = {
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.9,
      stream: false
    };

    const requestOptions = { ...defaultOptions, ...options };

    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        prompt: prompt,
        ...requestOptions
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  }

  async generateChat(messages, options = {}) {
    const defaultOptions = {
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.9,
      stream: false
    };

    const requestOptions = { ...defaultOptions, ...options };

    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages,
        ...requestOptions
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.message;
  }
}

// Usage example:
// const ollama = new OllamaApiWrapper('llama2');
// 
// // For generating a response to a single prompt
// ollama.generateResponse("Tell me a joke")
//   .then(response => console.log(response))
//   .catch(error => console.error('Error:', error));
// 
// // For a chat-like interaction
// const messages = [
//   { role: "user", content: "Hello, how are you?" },
//   { role: "assistant", content: "I'm doing well, thank you! How can I assist you today?" },
//   { role: "user", content: "Can you explain what JavaScript is?" }
// ];
// ollama.generateChat(messages)
//   .then(response => console.log(response))
//   .catch(error => console.error('Error:', error));
