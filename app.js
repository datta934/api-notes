const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()

const db = require("./models");
const Role = db.role;

//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => {
        console.log('DB Connected')
        initial();
    }).catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

const port = process.env.PORT || 8080;
const www = process.env.WWW || './';

//bring in routes
const noteRoutes = require("./routes/notes.routes");
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');


function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

// use middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/', cors(), noteRoutes, authRoutes, userRoutes);
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
