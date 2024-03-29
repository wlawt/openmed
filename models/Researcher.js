const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResearcherSchema = new Schema({
  researcher: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  study: {
    type: String,
    required: true
  },
  research: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  researchFirm: {
    type: String,
    required: true
  },
  creds: {
    type: String,
    required: true
  },
  public_key: {
    type: String,
    required: true
  },
  private_key: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  fulfillment: {
    type: String,
    required: true
  },
  wallet: {
    type: Number,
    default: 0
  }
});

module.exports = Researcher = mongoose.model("researcher", ResearcherSchema);
