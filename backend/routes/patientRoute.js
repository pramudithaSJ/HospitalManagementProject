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
  const bloodGroup = req.body.BloodGroup;
  const time = req.body.time;

  const newPatient = new Patient({
    fullName,
    contact,
    sex,
    DOB,
    NIC,
    age,
    password,
    bloodGroup,
    time,
  });

  newInstructor
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
  const { fullName, contact, sex, DOB, NIC, age, password, bloodGroup, time } =
    req.body;
  const updateInstructor = {
    fullName,
    contact,
    sex,
    DOB,
    NIC,
    age,
    password,
    bloodGroup,
    time,
  };

  const update = await Patient.findByIdAndUpdate(patientId, updateInstructor)
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
    bloodGroup: req.body.BloodGroup || patient.bloodGroup,
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



module.exports = router;
