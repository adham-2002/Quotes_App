const express = require("express");
const router = express.Router();
const { Client } = require("pg"); // PostgreSQL client

const client = new Client({
  host: 'db', // replace with your PostgreSQL host
  port: 5432,           // default PostgreSQL port
  user: 'user', // replace with your PostgreSQL user
  password: 'password', // replace with your PostgreSQL password
  database: 'myappdb', // replace with your PostgreSQL database name
});

client.connect();

// Route to render the add quote page
router.get("/add-quote", (req, res) => {
  res.render("addQuote"); // This will render the addQuote.ejs file
});

// Route to add a quote
router.post("/add", async (req, res) => {
  const { text, author } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO quotes (text, author) VALUES ($1, $2) RETURNING *',
      [text, author]
    );
    res.redirect("/view-quote");
  } catch (err) {
    res.status(500).send("Error saving quote");
  }
});

// Route to view all quotes
let currentIndex = 0; // Global variable to keep track of the current index

router.get("/view-quote", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM quotes');
    const quotes = result.rows;

    // Check if quotes exist
    if (quotes.length === 0) {
      return res.status(404).send("No quotes found");
    }

    // Get the current quote
    const currentQuote = quotes[currentIndex];

    // Increment the index and reset if necessary
    currentIndex = (currentIndex + 1) % quotes.length;

    // Render the quote
    res.render("viewQuote", { quote: currentQuote });
  } catch (err) {
    res.status(500).send("Error retrieving quote");
  }
});

// Route to view all quotes
router.get("/all-quotes", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM quotes');
    const quotes = result.rows;
    res.render("allQuotes", { quotes: quotes });
  } catch (err) {
    res.status(500).send("Error retrieving quotes");
  }
});

// Route to delete a quote
router.post("/delete-quote/:id", async (req, res) => {
  try {
    const quoteId = req.params.id;
    await client.query('DELETE FROM quotes WHERE id = $1', [quoteId]);
    res.redirect("/all-quotes");
  } catch (err) {
    res.status(500).send("Error deleting quote");
  }
});

module.exports = router;
