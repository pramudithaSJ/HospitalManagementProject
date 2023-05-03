import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
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

const ReceptionistHomePage = () => {
  let navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });
  const initialValuesForRegister = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchemaForRegister = Yup.object({
    name: Yup.string().required("Required Name"),
    age: Yup.number().required("Required Age"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string()
      .matches(/^0\d{9}$/, {
        message: "Phone number must start with 0 and have exactly 10 digits",
      })
      .required("Phone number is required"),
    password: Yup.string().required("Required Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className=" w-full bg-slate-400 flex justify-center content-center shadow-lg p-10 h-screen overflow-auto">
      <div className=" bg-slate-100 w-1/2 p-10 shadow-lg rounded-lg min-h-screen">
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
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Register" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <section className="">
              <div className="w-full">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="flex-col w-full">
                        <div className="ll">
                          {" "}
                          <p className="font-semibold">Email</p>
                        </div>
                        <div className="ll">
                          {" "}
                          <Field
                            className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                            type="email"
                            name="email"
                          />
                        </div>

                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xs"
                          name="email"
                        />
                      </div>

                      <div className="flex-col">
                        <div className="ll">
                          {" "}
                          <p className="font-semibold">Password</p>
                        </div>
                        <div className="ll">
                          {" "}
                          <Field
                            className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full"
                            type="password"
                            name="password"
                          />
                        </div>

                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xs italic"
                          name="password"
                        />
                      </div>

                      <button
                        className="bg-yellow-600 text-white w-full py-2 mt-2 hover:bg-white hover:text-black border-2
                "
                        type="submit"
                      >
                        Login
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </section>
          </TabPanel>
          <TabPanel className="overflow-auto" value={value} index={1}>
            <section className="">
              <div className="h-screen overflow-auto">
                <Formik
                  initialValues={initialValuesForRegister}
                  validationSchema={validationSchemaForRegister}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="flex-col w-full">
                        <div className="ll">
                          {" "}
                          <p className="font-semibold">Name</p>
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
                          <p className="font-semibold">Age</p>
                        </div>
                        <div className="ll">
                          {" "}
                          <Field
                            className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                            type="number"
                            name="age"
                          />
                        </div>

                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xs"
                          name="age"
                        />
                      </div>
                      <div className="flex-col w-full">
                        <div className="ll">
                          {" "}
                          <p className="font-semibold">Email</p>
                        </div>
                        <div className="ll">
                          {" "}
                          <Field
                            className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                            type="email"
                            name="email"
                          />
                        </div>

                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xs"
                          name="email"
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
                            type="phone"
                            name="phone"
                          />
                        </div>

                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xs"
                          name="phone"
                        />
                      </div>

                      <div className="flex-col">
                        <div className="ll">
                          {" "}
                          <p className="font-semibold">Password</p>
                        </div>
                        <div className="ll">
                          {" "}
                          <Field
                            className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full"
                            type="password"
                            name="password"
                          />
                        </div>

                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xs italic"
                          name="password"
                        />
                      </div>
                      <div>
                        <div className="ll">
                          {" "}
                          <p className="font-semibold">Confirm Password</p>
                        </div>
                        <div className="ll w-full">
                          {" "}
                          <Field
                            className="border border-grey-dark text-sm p-3 my-3  rounded-md w-full"
                            type="password"
                            name="confirmPassword"
                          />
                        </div>

                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xs italic"
                          name="confirmPassword"
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
        </Box>
      </div>
    </div>
  );
};

export default ReceptionistHomePage;
