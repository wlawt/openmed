const ResearcherTransaction = require("../../transactions/ResearcherTransaction");
const transactions = require("@liskhq/lisk-transactions");
const { EPOCH_TIME } = require("@liskhq/lisk-constants");

// Time elapsed
const getTimestamp = () => {
  const msSinceEpoc = Date.now() - Date.parse(EPOCH_TIME);
  const inSecs = (msSinceEpoc / 1000).toFixed(0);

  return parseInt(inSecs);
};

// Info
let researcherInfo = new ResearcherTransaction({
  asset: {
    researcherID: 213124
  },
  fee: `${transactions.utils.convertLSKToBeddows("1")}`,
  receiptId: "11881167371402274308L",
  timestamp: getTimestamp()
});

researcherInfo.sign("stock borrow episode salute link globes zero feed marble");

// Output
console.log(researcherInfo.stringify());
process.exit(0);
