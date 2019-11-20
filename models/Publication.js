const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
  publication: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  r_public_key: {
    type: String,
    required: true
  },
  publication: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  }
});

module.exports = Publication = mongoose.model("publication", PublicationSchema);
