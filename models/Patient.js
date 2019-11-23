const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseToCsv = require("mongoose-to-csv");
const fs = require("fs");

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
  },
  wallet: {
    type: Number,
    default: 0
  }
});

PatientSchema.plugin(mongooseToCsv, {
  headers: "Patient Data",
  constraints: {
    Firstname: "firstName",
    Lastname: "lastName",
    City: "city"
  }
});

module.exports = Patient = mongoose.model("patient", PatientSchema);

Patient.find({})
  .exec()
  .then(function(docs) {
    Patient.csvReadStream(docs).pipe(fs.createWriteStream("p.csv"));
  });
