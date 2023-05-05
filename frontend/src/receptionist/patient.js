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
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "20%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "10px",
  },
};
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
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [age, setAge] = React.useState("");
  const [bloodGroup, setBloodGroup] = React.useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [UpdateItem, setUpdateItem] = React.useState("");
  const [inputText, setInputText] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:8020/patient/")
      .then((response) => {
        if (response) {
          setItems(response.data);
        } else {
          toast.error("Error While Fetching Data!!");
        }
      })
      .catch((error) => toast.error(error));
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    phone: Yup.string().required("Phone number is required"),
    sex: Yup.string().required("Please mention your gender"),
    dob: Yup.date().required("Please mention your date of birth"),
    NIC: Yup.number().required("Required NIC number"),
    age: Yup.number().required("Please mention your age"),
    bloodGroup: Yup.string().required("Please mention your blood group"),
    timeOfRegistration: Yup.string().required("Please mention the time"),
  });
  const initialValues = {
    email: "",
    password: "",
    name: "",
  };
  const onSubmit = (values) => {
    const responses = axios

      .post(`http://localhost:8020/patient/add`, {
        fullName: values.fullName,
        contact: values.phone,
        sex: values.sex,
        DateOfBirth: values.dob,
        NIC: values.NIC,
        age: values.age,
        bloodGroup: values.bloodGroup,
        time: values.timeOfRegistration,
      })
      .then((response) => {
        toast.success("Successfully Added");
        setValue(1);
      })

      .catch((error) => {
        toast.error("Invalid Credentials");
      });
  };
  const updatePatient = (values) => {
    const responses = axios

      .put(`http://localhost:8020/patient/updateOne/${UpdateItem}`, {
        fullName: values.fullName,
        contact: values.phone,
        sex: values.sex,
        age: values.age,
        bloodGroup: values.bloodGroup,
      })
      .then((response) => {
        toast.success("Successfully updated");
        setIsOpen(false);
      })

      .catch((error) => {
        toast.error("Invalid Credentials");
      });
  };
  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:8020/patient/delete/${id} `)
      .then(() => {
        toast.error("Deleted Successfully!!");
      })
      .catch((err) => {
        alert(err);
      });
  };
  function getOne(id) {
    const response = axios
      .get(`http://localhost:8020/patient/get/${id}`)
      .then((response) => {
        console.log(response?.data?._id);
        console.log(response?.data);
        setUpdateItem(response.data._id);
        setIsOpen(true);
        setName(response.data.fullName);
        setAge(response.data.age);
        setBloodGroup(response.data.bloodGroup);
        setContact(response.data.contact);
        setSex(response.data.sex);
      });
  }
  const handleSearch = (event) => {
    event.preventDefault();
    search(inputText);
  };
  const search = (text) => {
    
    console.log(text);
    axios
      .get(`http://localhost:8020/patient/search/${text}`, {
        
      })
      .then((response) => {
        if (response.data.length > 0) {
          setSearchResults(response.data);
        } else {
          toast.error("No Results Found!!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
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
                          name="fullName"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="fullName"
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
                    <div className="flex-col w-full">
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">NIC</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                          type="number"
                          name="NIC"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="NIC"
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
                        <p className="font-semibold">Blood Group </p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                          type="text"
                          name="bloodGroup"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="bloodGroup"
                      />
                    </div>
                    <div className="flex-col w-full">
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">Time Of Registration</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                          type="time"
                          name="timeOfRegistration"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="timeOfRegistration"
                      />
                    </div>

                    <button
                      className="bg-yellow-600 text-white w-full py-2 mt-2 hover:bg-white hover:text-black border-2
                "
                      type="submit"
                    >
                      Register the patient
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </section>
        </TabPanel>
        <TabPanel className="overflow-auto" value={value} index={1}>
          <div className="w-1/2 mx-10">
            <form onSubmit={handleSearch}>
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search By Name"
                  required
                  value={inputText}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className=" px-10 mt-10 ">
            <div class=" shadow-md sm:rounded-lg ">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      NAME
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" class="px-6 py-3">
                      SEX
                    </th>
                    <th scope="col" class="px-6 py-3">
                      AGE
                    </th>
                    <th scope="col" class="px-6 py-3">
                      BLOOD GROUP
                    </th>

                    <th scope="col" class="px-6 py-3 text-center">
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="px-6 py-4">{item.fullName}</td>
                      <td class="px-6 py-4">{item.contact}</td>
                      <td class="px-6 py-4">{item.sex}</td>
                      <td class="px-6 py-4">{item.age}</td>
                      <td class="px-6 py-4">{item.bloodGroup}</td>

                      <td class="px-1 py-4 w-full justify-center flex gap-4">
                        <button
                          onClick={() => {
                            getOne(item._id);
                          }}
                          className="font-medium text-yellow-300 hover:text-yellow-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>

                        <a
                          href="#"
                          class="font-medium"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this Patient ?"
                              )
                            ) {
                              deleteItem(item._id);
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 text-red-500 hover:text-red-100"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabPanel>
      </Box>
      <div className="m-10">
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="m-10">
            {" "}
            <Formik
              initialValues={{
                fullName: name,
                phone: contact,
                sex: sex,
                age: age,
                bloodGroup: bloodGroup,
              }}
              onSubmit={updatePatient}
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
                        name="fullName"
                      />
                    </div>

                    <ErrorMessage
                      component="div"
                      className="text-red-500 text-xs"
                      name="fullName"
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
                      <p className="font-semibold">Blood Group </p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="bloodGroup"
                      />
                    </div>

                    <ErrorMessage
                      component="div"
                      className="text-red-500 text-xs"
                      name="bloodGroup"
                    />
                  </div>

                  <div className="flex">
                    <button
                      className="bg-red-600 text-white w-full py-2 mt-2 hover:bg-white hover:text-black border-2
                "
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-yellow-600 text-white w-full py-2 mt-2 hover:bg-white hover:text-black border-2
                "
                      type="submit"
                    >
                      Update the patient
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      </div>
    </div>
  );
};
