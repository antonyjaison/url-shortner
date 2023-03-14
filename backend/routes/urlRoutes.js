const express = require("express");
const { getUrl, createUrl } = require("../controller/urlControllers");

const router = express.Router();

router.post("/", createUrl);

module.exports = router;
