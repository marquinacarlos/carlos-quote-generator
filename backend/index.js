import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const quotes = [
  {
    quote: "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
];

function pickRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

app.get("/", (req, res) => {
  const quote = pickRandomQuote();
  res.json(quote);
});

app.post("/", (req, res) => {
  const { quote, author } = req.body;
  if (!quote || !author) {
    res.status(400).send("Expected body to be a JSON object containing keys quote and author.");
    return;
  }
  quotes.push({ quote, author });
  res.send("ok");
});

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});