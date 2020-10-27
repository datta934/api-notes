const Note = require('../models/notes.model')

//Get all notes
exports.getNotes = (req, res) => {
    const notes = Note.find({user_id: req.params.user_id})
        .then((notes) => {
            res.json({
                notes: notes
            })
        })
        .catch(err => console.log(err || "Some error occurred while retrieving notes"));
};

// Get note by id
exports.getNoteById = (req, res) => {
    Note.findById(req.params.id)
        .then((note) => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send(note);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.id
            })
        });
};

// Create a Note
exports.createNote = (req, res) => {
    const note = new Note(req.body);
    // Modified after validators
    //  note.save((result) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: err
    //         });
    //     }
    //     res.status(200).json({
    //         note: result
    //     });
    // });
    if (!req.body) {
        return res.status(400).send({
            message: "Note cannot be empty"
        });
    }
    note.save().then(result => {
        res.status(200).json({
            note: result
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating note"
        })
    })
};

// Update a note
exports.updateNote = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Note with id " + req.params.id
            });
        });
};


// Delete a note
exports.deleteNote = (req, res) => {
    var id = req.params.id;
    Note.findByIdAndRemove(id).then((note) => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.status(200).send({
            message: "Note deleted successfully!"
        })
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error deleteting Note with id " + req.params.id
        });
    });
};

