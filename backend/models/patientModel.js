const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

//instructor table and path
const Patient = mongoose.model("patient", PatientSchema);
module.exports = Patient;
