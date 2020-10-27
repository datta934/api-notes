const { authJwt } = require("../middleware");
const express = require("express")
const { allAccess, adminBoard, moderatorBoard, userBoard } = require('../controllers/user.controller')

const router = express.Router();

router.get("/api/test/all", allAccess);

router.get("/api/test/user", [authJwt.verifyToken], userBoard);

router.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard
);

router.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
);

module.exports = router;