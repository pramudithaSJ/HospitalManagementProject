const router = require("express").Router();
const { request } = require("express");
let Patient = require("../models/patientModel");

//Patient Registration
router.route("/add").post((req, res) => {
  const fullName = req.body.fullName;
  const contact = req.body.contact;
  const sex = req.body.sex;
  const DOB = req.body.DateOfBirth;
  const NIC = req.body.NIC;
  const age = req.body.age;
  const bloodGroup = req.body.bloodGroup;
  const time = req.body.time;

  const newPatient = new Patient({
    fullName,
    contact,
    sex,
    DOB,
    NIC,
    age,
    bloodGroup,
    time,
  });

  newPatient
    .save()
    .then(() => {
      res.json("Patient Added Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

//fetch Patients
router.route("/").get((req, res) => {
  Patient.find()
    .then((patient) => {
      res.json(patient);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update patient
router.route("/update/:id").put(async (req, res) => {
  let patientId = req.params.id;
  const { fullName, contact, sex, DOB, NIC, age, bloodGroup, time } = req.body;
  const updatePatient = {
    fullName,
    contact,
    sex,
    DOB,
    NIC,
    age,
    bloodGroup,
    time,
  };

  const update = await Patient.findByIdAndUpdate(patientId, updatePatient)
    .then(() => {
      res.status(200).send({ status: "Patient Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//Updateone
router.route("/updateOne/:id").put(async (req, res) => {
  let patient = await Patient.findById(req.params.id);
  const data = {
    fullName: req.body.fullName || patient.fullName,
    contact: req.body.contact || patient.contact,
    sex: req.body.sex || patient.sex,
    DOB: req.body.DateOfBirth || patient.DOB,
    NIC: req.body.NIC || patient.NIC,
    age: req.body.age || patient.age,
    bloodGroup: req.body.bloodGroup || patient.bloodGroup,
    time: req.body.time || patient.time,
  };
  patient = await Patient.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });
  res.json(patient);
});

//delete patient
router.route("/delete/:id").delete(async (req, res) => {
  let patientId = req.params.id;

  await Patient.findByIdAndDelete(patientId)
    .then(() => {
      res.status(200).send({ status: "Patient deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//get one patient
router.route("/get/:id").get((req, res) => {
  let id = req.params.id;
  Patient.findById(id)
    .then((patient) => {
      res.json(patient);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.route("/search/:text").get((req, res) => {
  const searchQuery = req.params.text;
  const regex = new RegExp(searchQuery, "i"); // 'i' flag for case-insensitive search
  const patients = Patient.find({ fullName: regex });
  if (patients.length > 0) {
    res.json(patients);
  } else {
    res.status(404).json({ error: "No patient found" });
  }
});

module.exports = router;
