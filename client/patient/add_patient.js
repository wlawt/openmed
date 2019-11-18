const PatientTransaction = require("../../transactions/PatientTransaction");
const transactions = require("@liskhq/lisk-transactions");
const { EPOCH_TIME } = require("@liskhq/lisk-constants");

// Time elapsed
const getTimestamp = () => {
  const msSinceEpoc = Date.now() - Date.parse(EPOCH_TIME);
  const inSecs = (msSinceEpoc / 1000).toFixed(0);

  return parseInt(inSecs);
};

// Info
let patientInfo = new PatientTransaction({
  asset: {
    patientID: 231208125967
  },
  fee: `${transactions.utils.convertLSKToBeddows("1")}`,
  receiptId: "12881167371402274308L"
  //timestamp: getTimestamp()
});

patientInfo.sign(
  "asdfaje fa episode laundry kitten salute link globe zero feed marble"
);

// Output
console.log(patientInfo.stringify());
process.exit(0);
