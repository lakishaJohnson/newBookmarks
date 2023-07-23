// THIS FILE HOLDS ALL THE CRUD ROUTES: REQUESTS TO DATABASE
const express = require("express");
const bookmarks = express.Router();
const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
} = require("../queries/bookmarks");
const {
  checkName,
  checkBoolean,
  validateURL,
} = require("../validations/checkBookmarks.js");

// INDEX
bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks[0]) {
    res.status(200).json(allBookmarks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
bookmarks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const bookmark = await getBookmark(id);
  if (bookmark) {
    res.json(bookmark);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE W/VALIDATOR FUNCTIONS
bookmarks.post("/", checkName, checkBoolean, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    res.json(bookmark);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// DELETE
bookmarks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBookmark = await deleteBookmark(id);
  if (deletedBookmark) {
    res.status(200).json(deletedBookmark);
  } else {
    res.status(404).json("Bookmark not found");
  }
});

// UPDATE W/VALIDATOR FUNCTIONS
bookmarks.put(
  "/:id",
  checkName,
  checkBoolean,
  validateURL,
  async (req, res) => {
    const { id } = req.params;
    const updatedBookmark = await updateBookmark(id, req.body);
    res.status(200).json(updatedBookmark);
  }
);

module.exports = bookmarks;
