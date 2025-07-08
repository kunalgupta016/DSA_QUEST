// api/gemini.js
export default async function handler(req, res) {
  const { prompt } = req.body;
  apikey = process.env.GEMINI_API_KEY;
  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apikey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await geminiRes.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ reply: 'Error contacting Gemini.' });
  }
}
