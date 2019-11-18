const { Application, genesisBlockDevnet, configDevnet } = require("lisk-sdk");
const keys = require("./config/keys");

// Import TRANSACTIONS
const ResearcherTransaction = require("./transactions/ResearcherTransaction");
const PatientTransaction = require("./transactions/PatientTransaction");

// Config
configDevnet.app.label = "openmed-blockchain";
configDevnet.components.storage.user = `${keys.USERNAME}`;
configDevnet.components.storage.database = `${keys.DATABASE}`;
configDevnet.components.storage.password = `${keys.PASSWORD}`;

// Init app
const app = new Application(genesisBlockDevnet, configDevnet);

// Add transactions
app.registerTransaction(ResearcherTransaction);
app.registerTransaction(PatientTransaction);

// Run
app
  .run()
  .then(() => app.logger.info("App started ..."))
  .catch(e => {
    console.error("Faced error in application", e);
    process.exit(1);
  });
