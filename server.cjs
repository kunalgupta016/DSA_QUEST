const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/gemini', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCoEuVy6d6qSGEW4U0AToSDtpiNZ0IL4Cc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ reply: 'Error contacting Gemini.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Gemini API running on http://localhost:${PORT}`);
});
