// IMPORTANT: Change this URL to your deployed backend URL when you deploy
const API_URL = "http://mo8538gp93v5lk9x6bu988yq.178.105.39.91.sslip.io/";

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const inputQuote = document.getElementById("input-quote");
const inputAuthor = document.getElementById("input-author");
const addQuoteBtn = document.getElementById("add-quote-btn");
const addStatus = document.getElementById("add-status");

async function fetchQuote() {
  quoteText.textContent = "Loading...";
  quoteAuthor.textContent = "";
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (error) {
    quoteText.textContent = "Failed to fetch quote.";
  }
}

async function addQuote() {
  const quote = inputQuote.value.trim();
  const author = inputAuthor.value.trim();

  if (!quote || !author) {
    addStatus.textContent = "Please fill in both fields.";
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote, author }),
    });
    const result = await response.text();
    if (result === "ok") {
      addStatus.textContent = "Quote added!";
      inputQuote.value = "";
      inputAuthor.value = "";
    } else {
      addStatus.textContent = "Error: " + result;
    }
  } catch (error) {
    addStatus.textContent = "Failed to add quote.";
  }
}

newQuoteBtn.addEventListener("click", fetchQuote);
addQuoteBtn.addEventListener("click", addQuote);

fetchQuote();