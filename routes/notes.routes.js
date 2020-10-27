const express = require("express")
const { getNotes, getNoteById, createNote, updateNote, deleteNote } = require('../controllers/notes.controller')
const validator = require('../validators')

const router = express.Router();

//Get all notes
router.get("/notes/:user_id", getNotes);

// Get a note by id
router.get("/notes/:id", getNoteById);

//Create note
router.post("/notes", validator.createNoteValidator, createNote);

// Update certain content with id

// Update a note with id
router.put("/notes/:id", updateNote);

// Delete a note with id
router.delete("/notes/:id", deleteNote);

module.exports = router;



