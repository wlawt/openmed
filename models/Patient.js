const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  patient: {
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
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  visits: [
    {
      id: {
        type: String,
        required: true
      },
      doctor: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      results: {
        type: String,
        required: true
      }
    }
  ],
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
  }
});

module.exports = Patient = mongoose.model("patient", PatientSchema);
