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

/*  @route      POST api/payment/add_publication
    @desc       Add to publicactions
    @access     Private
*/

/*  @route      POST api/payment
    @desc       Researcher -> patient
    @access     Private
*/
router.post("/r2p", (req, res) => {
  // TODO: retrieve p and r keys

  // Establish connection to network
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");

  const asset = {};
  const price = 1;

  // Prep to send money to patient
  const txTransferPatient = driver.Transaction.makeTransferTransaction(
    [{ tx: asset, output_index: 0 }],

    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(patient.publicKey)
      )
    ],

    { price: price }
  );

  // Researcher signs w/private key
  const txTransferResearchSigned = driver.Transaction.signTransaction(
    txTransferPatient,
    researcher.privateKey
  );

  // Send over BigChain node
  conn.postTransaction(txTransferResearchSigned);

  // Save to Mongodb
  const newPaymentToPatient = new Payment({
    asset_id: asset,
    p_public_key: patient.publicKey,
    r_public_key: researcher.publicKey
  });

  newPaymentToPatient.save().then(np => {
    res.json(np);
  });

  // Add money to patient wallet
  Patient.updateOne(
    { id: new ObjectID(patient.id) },
    {
      $inc: {
        wallet: price
      }
    }
  ).then(patient => res.json(patient));

  // Remove money from researcher wallet
  Researcher.updateOne(
    { id: new ObjectID(researcher.id) },
    {
      $inc: {
        wallet: price * -1
      }
    }
  ).then(researcher => res.json(researcher));
});

/*  @route      POST api/payment
    @desc       Chain -> researcher
    @access     Private
*/
router.post("/c2r", (req, res) => {
  // Establish connection to network
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");

  const asset = {
    paper: "paper details"
  };

  const reward = {
    reward: "1"
  };

  const txRewardResearcher = driver.Transaction.makeCreateTransaction(
    asset,
    reward,
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(researcher.publicKey)
      )
    ],

    researcher.publicKey
  );

  const txSigned = driver.Transaction.signTransaction(
    txRewardResearcher,
    researcher.privateKey
  );
  conn.postTransactionCommit(txSigned);

  // Save
  const newPaymentToResearcher = new Payment({
    asset_id: asset,
    fulfillment: fulfillment,
    r_public_key: researcher.publicKey
  });

  newPaymentToResearcher.save().then(np => {
    res.json(np);
  });

  // Add money to researcher wallet
  Researcher.updateOne(
    { id: new ObjectID(researcher.id) },
    {
      $inc: {
        wallet: reward
      }
    }
  ).then(researcher => res.json(researcher));
});

module.exports = router;
