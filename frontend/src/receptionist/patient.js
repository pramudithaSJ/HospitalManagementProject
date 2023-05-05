import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Patient = () => {
  let navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const initialValuesForRegister = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchemaForRegister = Yup.object({
    name: Yup.string().required("Required Name"),
    NIC: Yup.number().required("Required NIC number"),
    phone: Yup.string()
      .matches(/^0\d{9}$/, {
        message: "Phone number must start with 0 and have exactly 10 digits",
      })
      .required("Phone number is required"),
    sex: Yup.string().required("Please mention your gender"),
    dob: Yup.date().required("Please mention your date of birth"),
    age: Yup.number().required("Please mention your age"),
    timeOfRegistration: Yup.string().required("Please mention the time"),
    bloodGroup: Yup.string().required("Please mention your blood group"),
  });
  const onRegisterSubmit = (values) => {
    console.log("values");
  };
  return (
    <div className="">
      <Box sx={{ width: "100%" }}>
        <Box
          className="flex justify-center mt-5 "
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Register Patient" {...a11yProps(0)} />
            <Tab label="Patient List" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel className="overflow-auto" value={value} index={0}>
          <section className="">
            <div className="h-screen overflow-auto">
              <Formik
                initialValues={initialValuesForRegister}
                validationSchema={validationSchemaForRegister}
                onSubmit={onRegisterSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="flex-col w-full">
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">Full Name</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                          type="text"
                          name="name"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="name"
                      />
                    </div>

                    <div className="flex-col w-full">
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">Phone Number</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                          type="number"
                          name="phone"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="phone"
                      />
                    </div>
                    <div className="flex-col w-full">
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">Sex</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                          type="text"
                          name="sex"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="sex"
                      />
                    </div>
                    <div className="flex-col w-full">
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">Date Of Birth</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                          type="date"
                          name="dob"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="dob"
                      />
                    </div>

                    <div className="flex-col">
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">NIC</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full"
                          type="number"
                          name="NIC"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs italic"
                        name="NIC"
                      />
                    </div>
                    <div>
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">Age</p>
                      </div>
                      <div className="ll w-full">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-3  rounded-md w-full"
                          type="number"
                          name="age"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs italic"
                        name="age"
                      />
                    </div>
                    <div>
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">Blood Group</p>
                      </div>
                      <div className="ll w-full">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-3  rounded-md w-full"
                          type="text"
                          name="bloodGroup"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs italic"
                        name="bloodGroup"
                      />
                    </div>
                    <div>
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">Time Of Registration</p>
                      </div>
                      <div className="ll w-full">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-3  rounded-md w-full"
                          type="time"
                          name="timeOfRegistration"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs italic"
                        name="timeOfRegistration"
                      />
                    </div>

                    <button
                      className="bg-yellow-600 text-white w-full py-2 mt-2 hover:bg-white hover:text-black border-2
                "
                      type="submit"
                    >
                      Register
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </section>
        </TabPanel>
        <TabPanel className="overflow-auto" value={value} index={1}>
          <div>sd</div>
        </TabPanel>
      </Box>
    </div>
  );
};
