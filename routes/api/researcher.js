const express = require("express");
const router = express.Router();
const driver = require("bigchaindb-driver");
const axios = require("axios");

// LOAD MODEL
const Researcher = require("../../models/Researcher");

// LOAD VALIDATION

// Test
router.get("/", (req, res) => {
  res.json({ msg: "researcher working ..." });
});

/*  @route      GET api/researcher/register
    @desc       Register researher
    @access     Private 
*/
router.post("/register", (req, res) => {
  // Establish connection
  const researcher = new driver.Ed25519Keypair();
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");

  // Create transaction
  const tx = driver.Transaction.makeCreateTransaction(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      study: req.body.study,
      research: req.body.research,
      university: req.body.university,
      researchFirm: req.body.researchFirm,
      creds: req.body.creds
    },
    { type: "researcher" },
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(researcher.publicKey)
      )
    ],
    researcher.publicKey
  );

  // Sign
  const txSigned = driver.Transaction.signTransaction(
    tx,
    researcher.privateKey
  );
  conn.postTransactionCommit(txSigned);

  //https://test.ipdb.io/api/v1/transactions/${txSigned.id}
  axios
    .get(`https://test.ipdb.io/api/v1/transactions/${txSigned.id}`)
    .then(res => {
      console.log(res.inputs);
    })
    .catch(err => {
      console.log(err);
    });

  /* const newResearcher = new Researcher({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    study: req.body.study,
    research: req.body.research,
    university: req.body.university,
    researchFirm: req.body.researchFirm,
    creds: req.body.creds
  });

  newResearcher.save().then(r => {
    res.json(r);
  }); */
});

router.get("/all", (req, res) => {
  const errors = {};

  Researcher.find()
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

/*  @route      GET api/researcher/key
    @desc       Retrieve user key
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
