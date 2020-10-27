const { verifySignUp } = require("../middleware");
// const controller = require("../controllers/auth.controller");

// module.exports = function (app) {
//     app.use(function (req, res, next) {
//         res.header(
//             "Access-Control-Allow-Headers",
//             "x-access-token, Origin, Content-Type, Accept"
//         );
//         next();
//     });

//     app.post(
//         "/api/auth/signup",
//         [
//             verifySignUp.checkDuplicateUsernameOrEmail,
//             verifySignUp.checkRolesExisted
//         ],
//         controller.signup
//     );

//     app.post("/api/auth/signin", controller.signin);
// };


const express = require("express")
const { signIn, signUp } = require('../controllers/auth.controller')
const validator = require('../validators')

const router = express.Router();

// Create User
router.post("/notes/auth/signup", [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
], signUp);

// User login
router.post("/notes/auth/signin", signIn);

module.exports = router;