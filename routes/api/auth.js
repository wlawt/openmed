const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// LOAD MODEL

// LOAD VALIDATION

// Test
router.get("/", (req, res) => {
  res.json({ msg: "auth working ..." });
});

/*  @route      POST api/auth/login
    @desc       Login user
    @access     Public
*/
router.post("/login", (req, res) => {
  res.json({ msg: "login" });
});

/*  @route      POST api/auth/register
    @desc       Register user
    @access     Public
*/
router.post("/register", (req, res) => {
  res.json({ msg: "register" });
});

module.exports = router;
