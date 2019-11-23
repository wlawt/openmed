const express = require("express");
const router = express.Router();
const driver = require("bigchaindb-driver");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const writeJsonFile = require("write-json-file");
const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const { exec } = require("child_process");

// LOAD MODEL
const Researcher = require("../../models/Researcher");

// LOAD VALIDATION

// Test
router.get("/", (req, res) => {
  res.json({ msg: "researcher working ..." });
});

/*  @route      POPST api/researcher/register
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

  console.log(researcher.privateKey);
  console.log(txSigned.outputs[0].public_keys[0]);
  console.log(txSigned.id);
  console.log(txSigned.inputs[0].fulfillment);

  //https://test.ipdb.io/api/v1/transactions/${txSigned.id}
  /*   axios
    .get(`https://test.ipdb.io/api/v1/transactions/${txSigned.id}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    }); */

  const newResearcher = new Researcher({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    study: req.body.study,
    research: req.body.research,
    university: req.body.university,
    researchFirm: req.body.researchFirm,
    creds: req.body.creds,
    public_key: txSigned.outputs[0].public_keys[0],
    private_key: researcher.privateKey,
    id: txSigned.id,
    fulfillment: txSigned.inputs[0].fulfillment
  });

  newResearcher.save().then(r => {
    res.json(r);
  });
});

/*  @route      POST api/researcher/key
    @desc       Login researcher
    @access     Public
*/
router.post("/login", (req, res) => {
  const id = req.body.id;
  const private_key = req.body.private_key;

  Researcher.findOne({ id }).then(researcher => {
    if (id === researcher.id && private_key === researcher.private_key) {
      const payload = {
        id: researcher.id,
        firstName: researcher.firstName,
        private_key: researcher.private_key
      };

      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      });
    } else {
      console.log("dont match");
    }
  });
});

var currentPath = process.cwd();
router.get("/download", (req, res, next) => {
  Researcher.find()
    .then(researcher => {
      try {
        /*         const data = fs.writeFileSync(
          "D:\\Coding Folder\\CES\\OpenMed\\routes\\api\\file.txt",
          JSON.stringify(researcher)
        );

        console.log(currentPath); */

        /* const data = fs.createReadStream("file.txt");
        res.writeHead(200, {
          "Content-disposition": "attachment; filename=file.txt"
        });
        data.pipe(res); */

        exec(
          "mongoexport --db test --collection patients --type=csv --fields firstName, lastName, study",
          function(code, stdout, stderr) {
            console.log("Exit code:", code);
            console.log("Program output:", stdout);
            console.log("Program stderr:", stderr);
          }
        );

        //res.download(data);
      } catch (e) {
        console.error(e);
      }
    })
    .catch(err => console.log(err));
  next();
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
