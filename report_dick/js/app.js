const express = require('express');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve your static files

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is securely configured
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // You can use newer models as they become available
      messages: [{role: "user", content: req.body.message}],
    });
    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing your request');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
