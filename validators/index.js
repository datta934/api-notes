exports.createNoteValidator = (req, res, next) => {
    // Title
    req.check('title', "Write a title").notEmpty()
    req.check('title', "Title must be between 4 to 150 characters").isLength({
        min: 4,
        max: 150
    });
    //Body
    req.check('description', "Write a description").notEmpty()
    req.check('description', "Description must be between 4 to 2000 characters").isLength({
        min: 4,
        max: 2000
    });
    // Check for errors
    const errors = req.validationErrors()
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg);
        return res.status(400).json({ error: firstError })
    }
    //To proceed to next middleware
    next();
}