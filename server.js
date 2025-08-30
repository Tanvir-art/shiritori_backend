const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let wordHistory = [];  

app.post("/validate-word", async (req, res) => {
  const { word, lastWord } = req.body;

  // 1. Minimum 4 letters
  if (!word || word.length < 4) {
    return res.json({ valid: false, reason: "Word must be at least 4 letters." });
  }

  // 2. Start with last letter
  if (lastWord && word[0].toLowerCase() !== lastWord.slice(-1).toLowerCase()) {
    return res.json({ valid: false, reason: `Word must start with '${lastWord.slice(-1)}'.` });
  }

  // 3. Check if repeated
  if (wordHistory.includes(word.toLowerCase())) {
    return res.json({ valid: false, reason: "Word already used." });
  }

  // 4. Validate via dictionary API
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.data && response.data.length > 0) {
      wordHistory.push(word.toLowerCase());
      return res.json({ valid: true });
    }
  } catch (err) {
    return res.json({ valid: false, reason: "Invalid English word." });
  }
});

app.get("/history", (req, res) => {
  res.json({ history: wordHistory });
});

app.post("/reset", (req, res) => {
  wordHistory = [];
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
