const express = require("express");
const { Client } = require("pg");  // PostgreSQL Client
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Connect to PostgreSQL
const client = new Client({
  host: 'db', // replace with your PostgreSQL host
  port: 5432,           // default PostgreSQL port
  user: 'user', // replace with your PostgreSQL user
  password: 'password', // replace with your PostgreSQL password
  database: 'myappdb', // replace with your PostgreSQL database name
});


client.connect()
  .then(() => {
    console.log(`DB connection successful! 🥳`);
  })
  .catch((err) => {
    console.error("DB connection error", err.stack);
  });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs");

// Routes
const quotesRoutes = require("../routes/quotes");
app.use("/", quotesRoutes);

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// Fetch quotes from PostgreSQL database
app.get("/quotes", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM quotes');  // Assuming 'quotes' table exists
    const quotes = result.rows;

    res.render("quotes", { quotes });
  } catch (error) {
    console.error("Error fetching quotes", error);
    res.status(500).send("Error fetching quotes from database.");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
