const express = require("express");
const router = express.Router();
const { inquiryHandler } = require("../controllers/inquiry.controller");

router.route("/inquiry").get(inquiryHandler).post(inquiryHandler);

module.exports = router;
