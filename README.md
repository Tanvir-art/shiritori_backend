# Shiritori Game Backend

This is the **backend server** for a simplified multiplayer Shiritori game built with **Express.js**.  
It provides APIs to validate words, track word history, and reset the game.  

---

## **Table of Contents**

- [Features](#features)  
- [Installation](#installation)   
- [API Endpoints](#api-endpoints)   

---

## **Features**

- Turn-based word validation for Shiritori game  
- Validates words using [DictionaryAPI](https://dictionaryapi.dev/)  
- Ensures words:
  - Start with the last letter of the previous word  
  - Are at least 4 letters long  
  - Are not repeated  
- Tracks word history  
- Resets game history  
- CORS enabled for cross-origin requests  

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/Tanvir-art/shiritori_backend.git
cd shiritori_backend
```
```bash
npm install
node server.js
```

## **API Endpoints**
1. Validate Word

POST /validate-word

Validates a word submitted by a player based on Shiritori rules.

Checks:

  Word length ≥ 4 letters
  Starts with the last letter of the previous word
  Not repeated
  Exists in DictionaryAPI   

2. Get Word History
GET /history
Returns the list of all previously submitted words in the game.


3. Reset Game
POST /reset
Clears the word history, allowing a new game to start.
