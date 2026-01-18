import React, { useState } from "react";
import { Container, Form, Row, Col, Alert, Button } from "react-bootstrap";
// import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import NavigationBar from "../Navbar/NavigationBar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { storeToken } from "../../services/tokenService";
import { registerAsPatient } from "../../services/LoginServices.js";

const PatientLogin = () => {
  const [data, setData] = useState({
    PatientUsername: "",
    PatientPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { PatientUsername, PatientPassword } = data;

    if (PatientUsername.trim() === "" || PatientPassword.trim() === "") {
      toast.error("All fields are required");
      return;
    }

    try {
      console.log(data);

      const response = await registerAsPatient(data);

      if (response.status === 200) {
        const { token, organ } = response.data;

        // localStorage.setItem("patientToken", token); // or use storeToken(token)
        storeToken(token);
        toast.success("Patient logged in..");

        setData({
          Patientname: "",
          PatientUsername: "",
          PatientPassword: "",
        });

        navigate(`/donor-list/${organ}`);
      } else {
        toast.error("Incorrect Username or Password");
      }
    } catch (error) {
      toast.error("Username or Password is Incorrect");
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <NavigationBar />
        <Container className="mt-5 mb-5 w-custom border border-secondary rounded">
          <ToastContainer position="top-center" />
          <Alert
            variant="success"
            className="mt-4 mb-4 text-center fs-4 fw-bold"
          >
            Patient Login
          </Alert>
          <Form className="justify-center align-center" onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} className="fs-5 fw-bold">
                Patient Username
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter Patient Username or Email-Id"
                  name="PatientUsername"
                  onChange={handleChange}
                  value={data.PatientUsername}
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
                  name="PatientPassword"
                  onChange={handleChange}
                  value={data.PatientPassword}
                />
              </Col>
            </Form.Group>
            <Row className="justify-center mt-2 mb-2 text-center fs-3 ">
              <Col>
                <span>Are you a new Patient ? </span>
                <a href="/patientRegister">Signup</a>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button type="submit" className="success m-3 fs-5 p-2">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default PatientLogin;
