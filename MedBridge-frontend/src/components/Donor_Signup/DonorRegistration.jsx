import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./DonorRegistration.css";
import Marquee from "react-fast-marquee";
import { registerAsDoctor } from "../../services/LoginServices.js";
import {
  Container,
  Row,
  Col,
  Alert,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import NavigationBar from "../Navbar/NavigationBar.jsx";
import { ErrorMessage, Field, Form as FormikForm, Formik } from "formik";
import { SignupSchema } from "../Validation-Schemas/SignupSchema.js";
import Footer from "../Footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../../services/tokenService.js";

const DonorRegistration = () => {
  const initialvalues = {
    fullName: "",
    username: "",
    speciality: "",
    contactNo: "",
    password: "",
    email: "",
  };

  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      const response = await registerAsDoctor(values);
      console.log(response);
      if (response.status === 200) {
        toast.success("Doctor Registered Successfully");
        actions.resetForm();
        storeToken(response.data.token);
        navigate("");
        console.log(response.data.token);
      }
    } catch (error) {
      toast.error("Doctor Registration Failed");
      console.log(error);
    }
  };

  return (
    <>
      <div className="login">
        <NavigationBar />
        <Container fluid className="mt-5 ms-10 mb-5">
          <div className="Formdiv">
            <Container className="mt-5 w-custom border border-secondary rounded formContainer">
              <ToastContainer position="top-center" />
              <Alert
                variant="success"
                className="mt-4 mb-4 text-center fs-4 fw-bold"
              >
                Doctor Registration
              </Alert>

              <Formik
                initialValues={initialvalues}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
              >
                {(formik) => {
                  // const { error, touched, isValid, dirty } = formik;
                  const { isValid, dirty } = formik;
                  // const {  isValid, dirty } = formik;
                  return (
                    <FormikForm className="justify-center align-center">
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalEmail"
                      >
                        <Form.Label
                          style={{ color: "black" }}
                          column
                          sm={2}
                          className="fs-5 fw-bold"
                        >
                          Doctor Name
                        </Form.Label>
                        <Col sm={10}>
                          <Field
                            as={Form.Control}
                            type="text"
                            placeholder="Enter Doctor's Name"
                            name="fullName"
                            // value={data.Donorname}
                            // onChange={(e) => {
                            //   handleChange(e);
                            //   formik.handleChange(e); // keep Formik state updated
                            // }}
                            isInvalid={
                              formik.touched.Donorname &&
                              formik.errors.Donorname
                            }
                          />
                          <ErrorMessage
                            name="fullName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label
                          style={{ color: "black" }}
                          column
                          sm={2}
                          className="fs-5 fw-bold"
                        >
                          Doctor Username
                        </Form.Label>
                        <Col sm={10}>
                          <Field
                            type="text"
                            placeholder="Enter Doctor's Username"
                            name="username"
                            // onChange={handleChange}
                            // value={data.DonorUsername}
                            as={Form.Control}
                          />
                          <ErrorMessage
                            name="username"
                            component="span"
                            className="error"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label
                          style={{ color: "black" }}
                          column
                          sm={2}
                          className="fs-5 fw-bold"
                        >
                          Password
                        </Form.Label>
                        <Col sm={10}>
                          <Field
                            type="password"
                            placeholder="Enter Doctor's Password"
                            name="password"
                            // onChange={handleChange}
                            // value={data.DonorPassword}
                            as={Form.Control}
                          />
                          <ErrorMessage
                            name="password"
                            component="span"
                            className="error"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label
                          style={{ color: "black" }}
                          column
                          sm={2}
                          className="fs-5 fw-bold"
                        >
                          Doctor Speciality
                        </Form.Label>
                        <Col sm={10}>
                          <Field
                            type="text"
                            placeholder="Enter Doctor's Speciality"
                            name="speciality"
                            // onChange={handleChange}
                            // value={data.DonorUsername}
                            as={Form.Control}
                          />
                          <ErrorMessage
                            name="speciality"
                            component="span"
                            className="error"
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label
                          style={{ color: "black" }}
                          column
                          sm={2}
                          className="fs-5 fw-bold"
                        >
                          Doctor Contact No.
                        </Form.Label>
                        <Col sm={10}>
                          <Field
                            type="Number"
                            placeholder="Enter Doctor's Contact No."
                            name="contactNo"
                            // onChange={handleChange}
                            // value={data.DonorUsername}
                            as={Form.Control}
                          />
                          <ErrorMessage
                            name="contactNo"
                            component="span"
                            className="error"
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3">
                        <Form.Label
                          style={{ color: "black" }}
                          column
                          sm={2}
                          className="fs-5 fw-bold"
                        >
                          Doctor Email Address
                        </Form.Label>
                        <Col sm={10}>
                          <Field
                            type="text"
                            placeholder="Enter Doctor's Email Address"
                            name="email"
                            // onChange={handleChange}
                            // value={data.DonorUsername}
                            as={Form.Control}
                          />
                          <ErrorMessage
                            name="email"
                            component="span"
                            className="error"
                          />
                        </Col>
                      </Form.Group>
                      <Row className="justify-center mt-2 mb-2 text-center fs-3 ">
                        <Col>
                          <span style={{ color: "black" }}>
                            Already a Doctor ?
                          </span>
                          <a href="/login">Login</a>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center">
                          <Button
                            type="submit"
                            className="success m-3 fs-5 p-2 fw-bold"
                            disabled={!(dirty && isValid)}
                          >
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </FormikForm>
                  );
                }}
              </Formik>
            </Container>
          </div>
        </Container>
        <Footer />
        {/* <Marquee
          className="mt-5"
          speed={50}
          gradient={false}
          pauseOnHover
          direction="right"
          style={{ height: "25vh", width: "100%", backgroundColor: "#f8f9fa" }}
        >
          <img
            className="marquee-img"
            src="./../../../public/assets/doctor.png"
          ></img>
          <img
            className="marquee-img"
            src="./../../../public/assets/hostipal.png"
          ></img>
        </Marquee> */}
      </div>
    </>
  );
};

export default DonorRegistration;

// const [data, setData] = useState(initialvalues);

// const handleChange = (e) => {
//   setData({ ...data, [e.target.name]: e.target.value });
// };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const { Donorname, DonorUsername, DonorPassword } = data;

//   if (
//     Donorname.trim() === "" ||
//     DonorUsername.trim() === "" ||
//     DonorPassword.trim() === ""
//   ) {
//     toast.error("All fields are required");
//     return;
//   }
//   try {
//     e.preventDefault();
//     toast.success("Donor Registered Successfully");
//     const response = await axios.post("http://localhost:3000/donor", data);
//     console.log(response);
//     setData({
//       Donorname: "",
//       DonorUsername: "",
//       DonorPassword: "",
//     });
//   } catch (error) {
//     toast.error("Donor Registration Failed");
//   }
// };

{
  /* <Form className="justify-center align-center" onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={2} className="fs-5 fw-bold">
                Donor Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter Donor Name"
                  name="Donorname"
                  value={data.Donorname}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} className="fs-5 fw-bold">
                Donor Username
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter Donor Username"
                  name="DonorUsername"
                  onChange={handleChange}
                  value={data.DonorUsername}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} className="fs-5 fw-bold">
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="DonorPassword"
                  onChange={handleChange}
                  value={data.DonorPassword}
                />
              </Col>
            </Form.Group>
            <Row className="justify-center mt-2 mb-2 text-center fs-3 ">
              <Col>
                <span>Already a Donor ? </span>
                <a href="/login">Login</a>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button type="submit" className="success m-3 fs-5 p-2">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form> */
}
