const express = require("express");
const bookmarks = express.Router();
const { getAllBookmarks } = require("../queries/bookmarks");

// INDEX
bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks[0]) {
    res.status(200).json(allBookmarks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = bookmarks;
//