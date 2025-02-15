const express = require("express");
const app = express();
app.use(express.json());

// Dataset in JSON format
const HOK = {
  heroes: [
    { id: "h1", 
      name: "Arthur", 
      class: "Warrior", 
      lane: "Solo", 
      faction: "Avalon" 
    },
    { id: "h2", 
      name: "Diao Chan", 
      class: "Mage", 
      lane: "Mid", 
      faction: "Frost Order" 
    },
    { id: "h3", 
      name: "Sun Ce", 
      class: "Tank", 
      lane: "Jungle", 
      faction: "Eastern Seas" 
    },
    { id: "h4", 
      name: "Marco Polo", 
      class: "Marksman", 
      lane: "Bot", 
      faction: "Western Lands" 
    },
    { id: "h5", 
      name: "Miyamoto Musashi", 
      class: "Assassin", 
      lane: "Jungle", 
      faction: "Ronin Clan" 
    },
    { id: "h6", 
      name: "Angela", 
      class: "Mage", 
      lane: "Mid", 
      faction: "Magic Council" 
    },
    { id: "h7", 
      name: "Lü Bu", 
      class: "Fighter", 
      lane: "Solo", 
      faction: "Conquerors" 
    },
    { id: "h8", 
      name: "Gongsun Li", 
      class: "Marksman", 
      lane: "Bot", 
      faction: "Shadow Sect" 
    },
    { id: "h9", 
      name: "Han Xin", 
      class: "Assassin", 
      lane: "Jungle", 
      faction: "Rebel Forces" 
    },
    { id: "h10", 
      name: "Zhuge Liang", 
      class: "Mage", 
      lane: "Mid", 
      faction: "Strategists" 
    }
  ]
};

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).send("Internal Server Error. Please try again later.");
});

// 1. Return all heroes
app.get("/hok-api/heroes", (req, res) => {
  res.send(HOK.heroes);
});

// 2. Return specific hero
app.get("/hok-api/heroes/:id", (req, res) => {
  const hero = HOK.heroes.find(hero => hero.id === req.params.id);
  if (!hero) {
    return res.status(404).send("Hero not found.");
  }
  res.send(hero);
});

// 3. Return heroes in a specific lane
app.get("/hok-api/lanes/:lane", (req, res) => {
  const heroes = HOK.heroes.filter(hero => hero.lane.toLowerCase() === req.params.lane.toLowerCase());
  if (heroes.length === 0) {
    return res.status(404).send("No heroes found in the given lane.");
  }
  res.send(heroes);
});

// 4. Return heroes of a specific faction
app.get("/hok-api/factions/:faction", (req, res) => {
  const heroes = HOK.heroes.filter(hero => hero.faction.toLowerCase() === req.params.faction.toLowerCase());
  if (heroes.length === 0) {
    return res.status(404).send("No heroes found in the given faction.");
  }
  res.send(heroes);
});

// 5. Return heroes of a specific class
app.get("/hok-api/classes/:class", (req, res) => {
  const heroes = HOK.heroes.filter(hero => hero.class.toLowerCase() === req.params.class.toLowerCase());
  if (heroes.length === 0) {
    return res.status(404).send("No heroes found in the given class.");
  }
  res.send(heroes);
});

// Start the server with error handling
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Server failed to start:", err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}/hok-api`);
  }
});