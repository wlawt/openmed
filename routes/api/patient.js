const express = require("express");
const router = express.Router();

// LOAD MODEL

// LOAD VALIDATION

// Test
router.get("/", (req, res) => {
  res.json({ msg: "patient working ..." });
});

/*  @route      GET api/patient/key
    @desc       Retrieve key
    @access     Private
*/
router.get("/key", (req, res) => {
  res.json({ msg: "patient key" });
});

/*  @route      POST api/patient/create_key
    @desc       Create key 
    @access     Private
*/
router.post("/create_key", (req, res) => {
  res.json({ msg: "create patient key" });
});

/*  @route      POST api/patient/validate
    @desc       Validate key between doctor and patient
    @access     Private
*/
router.post("/validate", (req, res) => {
  res.json({ msg: "validate" });
});

module.exports = router;
