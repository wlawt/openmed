const express = require("express");
const router = express.Router();

// LOAD MODEL

// LOAD VALIDATION

// Test
router.get("/", (req, res) => {
  res.json({ msg: "doctor working ..." });
});

/*  @route      GET api/doctor/key
    @desc       Retrieve doctor key
    @access     Private
*/
router.get("/key", (req, res) => {
  res.json({ msg: "doc key" });
});

/*  @route      POST api/doctor/create_key
    @desc       Create key for doctor
    @access     Private
*/
router.post("/create_key", (req, res) => {
  res.json({ msg: "create doc key" });
});

/*  @route      POST api/auth/file_payment
    @desc       File payment for ONE user
    @access     Private
*/
router.post("/file_payment", (req, res) => {
  res.json({ msg: "file payment" });
});

/*  @route      GET api/doctor/list_patients
    @desc       List patients
    @access     Private 
*/

module.exports = router;
