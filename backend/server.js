const express = require("express"); //using the json file dependencies(node_modules)
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//declare a constant variable
const app = express();
//require  for read variables(MONGODB_URL)
require("dotenv").config();

app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

//database link
const URL = process.env.MONGODB_URL;

const PORT = process.env.PORT || 8020;
//create mongo configurations

mongoose.connect(URL, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongoDB connection successful !!!");
});

//user
const userRouter = require("./routes/userRoute");
app.use("/user", userRouter);

//patient
const patientRouter = require("./routes/patientRoute");
app.use("/patient", patientRouter);

//run the app using portd
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
