const {
  transactions: { BaseTransaction },
  TransactionError
} = require("lisk-sdk");

class ResearcherTransaction extends BaseTransaction {
  static get TYPE() {
    return 10;
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

    if (
      !this.asset.researcherID ||
      typeof this.asset.researcherID !== "number"
    ) {
      errors.push(
        new TransactionError(
          "Undefined ID for researcher",
          this.id,
          "Invalid ID for researcher",
          this.asset.researcherID
        )
      );
    }

    return errors;
  }

  applyAsset(store) {
    const errors = [];
    const sender = store.account.get(this.senderId);

    if (sender.asset && sender.asset.researcherID) {
      errors.push(
        new TransactionError(
          "Researcher ID already exists ...",
          this.researcherID
        )
      );
    } else {
      const newObj = {
        ...sender,
        asset: { researcherID: this.asset.researcherID }
      };
      store.account.set(sender.address, newObj);
    }

    // Empty if none
    return errors == null ? this.asset.researcherID : [];
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

module.exports = ResearcherTransaction;
