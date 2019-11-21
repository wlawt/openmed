const express = require("express");
const router = express.Router();
const driver = require("bigchaindb-driver");

var ObjectID = require("mongodb").ObjectID;

// LOAD MODEL
const Payment = require("../../models/Payment");
const Patient = require("../../models/Patient");
const Researcher = require("../../models/Researcher");
const Publication = require("../../models/Publication");

// LOAD VALIDATION

// Test
router.get("/", (req, res) => {
  res.json({ msg: "patient working ..." });
});

/* 
    1. researcher needs to select data used
    2. researcher needs to submit paper
    3. researcher pays a small fee to the patient
    4. researcher -> give || patient -> receive
    5. researcher gets bonus for submitting paper onto the chain 
  */

/*  @route      GET api/payment/all_pub
    @desc       Retrieve all publications
    @access     Private
*/
router.get("/all_pub", (req, res) => {
  Publication.find()
    .sort({ date: -1 })
    .then(publication => {
      res.json(publication);
    })
    .catch(err => res.status(400).json({ patient: "No publications" }));
});

/*  @route      GET api/payment/all
    @desc       Retrieve all payment
    @access     Private
*/
router.get("/all", (req, res) => {
  Payment.find()
    .sort({ date: -1 })
    .then(payment => {
      res.json(payment);
    })
    .catch(err => res.status(400).json({ patient: "No payments" }));
});

/*  @route      POST api/payment/add_publication
    @desc       Add to publicactions
    @access     Private
*/
router.post("/add_publication", (req, res) => {
  const pub = new driver.Ed25519Keypair();
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");

  const tx = driver.Transaction.makeCreateTransaction(
    {
      publication: req.body.publication,
      institution: req.body.institution,
      pkey: req.body.pkey,
      rkey: req.body.rkey
    }[
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(pub.publicKey)
      )
    ],
    pub.publicKey
  );

  // Sign
  const txSigned = driver.Transaction.signTransaction(tx, pub.privateKey);

  conn.postTransactionCommit(txSigned);

  const newPublication = new Publication({
    publication: req.body.publication,
    institution: req.body.institution,
    pkey: req.body.pkey,
    rkey: req.body.rkey,
    transaction: pub.id
  });

  newPublication.save().then(p => {
    res.json(p);
  });

  /* 
    Transfer funds
  */
  const asset = {};
  const price = 1;

  // Prep to send money to patient
  const txTransferPatient = driver.Transaction.makeTransferTransaction(
    [{ tx: asset, output_index: 0 }],

    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(req.body.pkey)
      )
    ],

    { price: price }
  );

  // Researcher signs w/private key
  const txTransferResearchSigned = driver.Transaction.signTransaction(
    txTransferPatient,
    pub.privateKey
  );

  // Send over BigChain node
  conn.postTransaction(txTransferResearchSigned);

  // Save to Mongodb
  const newPaymentToPatient = new Payment({
    asset_id: asset,
    p_public_key: req.body.pkey,
    r_public_key: req.body.rkey
  });

  newPaymentToPatient.save().then(np => {
    res.json(np);
  });

  // Add money to patient wallet
  Patient.updateOne(
    { id: new ObjectID(req.body.pid) },
    {
      $inc: {
        wallet: price
      }
    }
  ).then(patient => res.json(patient));

  // Remove money from researcher wallet
  Researcher.updateOne(
    { id: new ObjectID(req.body.rid) },
    {
      $inc: {
        wallet: price * -1
      }
    }
  ).then(researcher => res.json(researcher));
});

module.exports = router;
