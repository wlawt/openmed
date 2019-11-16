const express = require("express");
const router = express.Router();

// LOAD MODEL

// LOAD VALIDATION

// Test
router.get("/", (req, res) => {
  res.json({ msg: "patient working ..." });
});

module.exports = router;
