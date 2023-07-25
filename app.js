// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to SQL Bookmarks App");
});

// Bookmarks ROUTES
const bookmarksController = require("./controllers/bookmarkController.js");
app.use("/bookmarks", bookmarksController);
//TELLING APP TO USE CONTROLLER WITH THAT ROUTE

// Reviews ROUTES
// const reviewsController = require("./controllers/reviewsController.js");
// app.use("/reviews", reviewsController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
