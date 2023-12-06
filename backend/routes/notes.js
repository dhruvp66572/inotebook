const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROTE 1 : Get All the Notes using: GET "/api/auth/fetchllnotes". Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    console.log({ user: req.user.id })
    const note = await Note.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error Occured");
  }
});

// ROTE 2 : Add new Note using: POST "/api/auth/addnote". Login Required
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

module.exports = router;
