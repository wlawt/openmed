const express = require("express");
const router = express.Router();

// LOAD MODEL

// LOAD VALIDATION

// Test
router.get("/", (req, res) => {
  res.json({ msg: "researcher working ..." });
});

/*  @route      GET api/researcher/key
    @desc       Retrieve key
    @access     Private
*/
router.get("/key", (req, res) => {
  res.json({ msg: "researcher key" });
});

/*  @route      POST api/researcher/create_key
    @desc       Create key
    @access     Private
*/
router.post("/create_key", (req, res) => {
  res.json({ msg: "create researcher key" });
});

/*  @route      POST api/researcher/publication
    @desc       Upload publication
    @access     Private
*/
router.post("/publication", (req, res) => {
  res.json({ msg: "publication" });
});

module.exports = router;
