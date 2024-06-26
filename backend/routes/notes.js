const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROTE 1 : Get All the Notes using: GET "/api/notes/fetchllnotes". Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    console.log({ user: req.user.id });
    const note = await Note.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error Occured");
  }
});

// ROTE 2 : Add new Note using: POST "/api/notes/addnote". Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    //Set Validation
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Enter valid Description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // if there are Errors, return bad request and errors
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error Occured");
    }
  }
);

// ROTE 3 : Update an existing Note using: PUT "/api/notes/updatenote/:id". Login Required
router.put("/updatenode/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Create newNote Object

    let newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it

    let note = await Note.findById(req.params.id);
    console.log(note);
    if (!note) {
      return res.status(404).send("Not Found/....");
    }

    // Allows Upadation only User own this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error Occured");
  }
});

// ROTE 4 : Delete an existing Note using: DELETE "/api/notes/deletetenote/:id". Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be Deleted and Delete it

    let note = await Note.findById(req.params.id);
    console.log(note);
    if (!note) {
      return res.status(404).send("Not Found/....");
    }

    // Allows Deletion only User own this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been Deleted ", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error Occured");
  }
});

module.exports = router;
