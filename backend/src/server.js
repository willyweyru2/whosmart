const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Fake DB (later we replace with JSON/DB)
const levels = {
  1: {
    id: 1,
    question: "Who is lying?",
    image: "http://localhost:3000/levels/level1.png",
    options: ["Boy", "Girl", "Man"],
    answer: 2
  },
  2: {
    id: 2,
    question: "Who is the richest?",
    image: "http://localhost:3000/levels/level2.png",
    options: ["Old man", "Young girl", "Businessman"],
    answer: 0
  }
};

app.get("/levels/:id", (req, res) => {
  const id = req.params.id;
  res.json(levels[id] || null);
});

app.listen(5000, () => console.log("API running on http://localhost:5000"));
