const {
  transactions: { BaseTransaction },
  TransactionError
} = require("lisk-sdk");

class PatientTransaction extends BaseTransaction {
  static get TYPE() {
    return 11;
  }

  static get FEE() {
    return `${10 ** 8}`;
  }

  async prepare(store) {
    await store.account.cache([
      {
        address: this.senderId
      }
    ]);
  }

  // Check
  validateAsset() {
    const errors = [];

    if (!this.asset.patientID || typeof this.asset.patientID !== "number") {
      errors.push(
        new TransactionError(
          "Undefined ID for Patient",
          this.id,
          "Invalid ID for Patient",
          asset.patientID
        )
      );
    }

    return errors;
  }

  applyAsset(store) {
    const errors = [];
    const sender = store.account.get(this.senderId);

    if (sender.asset && sender.asset.patientID) {
      errors.push(
        new TransactionError(
          "Patient ID already exists ...",
          this.asset.patientID
        )
      );
    } else {
      const newObj = {
        ...sender,
        asset: { patientID: this.asset.patientID }
      };
      store.account.set(sender.address, newObj);
    }

    // Empty if none
    return errors;
  }

  // Reverse apply
  undoAsset(store) {
    // Get ID
    const sender = store.account.get(this.senderId);

    // Reverse transaction
    const oldObj = { ...sender, asset: null };
    store.account.set(sender.address, oldObj);

    // Return empty array
    return [];
  }
}

module.exports = PatientTransaction;
