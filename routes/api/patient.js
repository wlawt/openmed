const express = require("express");
const router = express.Router();
const driver = require("bigchaindb-driver");

// LOAD MODEL
const Patient = require("../../models/Patient");

// LOAD VALIDATION

// Test
router.get("/", (req, res) => {
  res.json({ msg: "patient working ..." });
});

/*  @route      POST api/patient/register
    @desc       Register patient
    @access     Private
*/
router.post("/register", (req, res) => {
  const patient = new driver.Ed25519Keypair();
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");

  // Create transaction
  const tx = driver.Transaction.makeCreateTransaction(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      doctor: req.body.doctor,
      description: req.body.description,
      results: req.body.results
    },
    { type: "patient" },
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(patient.publicKey)
      )
    ],
    patient.publicKey
  );

  const txSigned = driver.Transaction.signTransaction(tx, patient.privateKey);

  conn.postTransactionCommit(txSigned);
  console.log(patient.privateKey);
  console.log(txSigned.outputs[0].public_keys[0]);
  console.log(txSigned.id);
  console.log(txSigned.inputs[0].fulfillment);

  const newPatient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    doctor: req.body.doctor,
    description: req.body.description,
    results: req.body.results,
    public_key: txSigned.outputs[0].public_keys[0],
    private_key: patient.privateKey,
    id: txSigned.id,
    fulfillment: txSigned.inputs[0].fulfillment
  });

  newPatient.save().then(p => {
    res.json(p);
  });
});

/*  @route      GET api/patient/all
    @desc       Retrieve all patients
    @access     Private
*/
router.get("/all", (req, res) => {
  Patient.find()
    .sort({ date: -1 })
    .then(patients => {
      res.json(patients);
    })
    .catch(err => res.status(400).json({ patient: "No patients" }));
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