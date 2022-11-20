const express = require("express");
const router = express();
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../Models/Notes");

// Route :1 Get All the notes of user throught this route
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// Route :2 Add notes of user throught this route
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid descr").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route :03 this route update the notes
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // creating new note object
  const newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }

  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newnote },
    { new: true }
  );

  res.json({ note });
});

// Route :04 this route update the notes
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // FIND THE NOTES TO BE DELETE AND DELETE IT
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  // ALLOW DELETION IF USER OWNS THIS NOTES
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Notes.findByIdAndDelete(req.params.id);

  res.json({ SUCCESS: "THIS NOTE IS DELETED SUCESSFULLY",note:note });
});

module.exports = router;
