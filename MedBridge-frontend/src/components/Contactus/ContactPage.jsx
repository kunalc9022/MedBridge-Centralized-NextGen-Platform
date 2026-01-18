import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import NavigationBar from "../Navbar/NavigationBar";
import Footer from "../Footer/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    branch: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to a server)
    console.log(formData);
    // You can add a thank you message or redirect the user after submission
    alert("Thank you for your message! We will get back to you soon."); // Simple feedback
    setFormData({ fullName: "", mobileNumber: "", branch: "", message: "" }); //clear form
  };

  return (
    <div className="bg-light">
      <Container className="py-5">
        <h1 className="text-blue mb-4">CONTACT US</h1>

        <Row className="mb-5">
          <Col md={6}>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-red mb-4">Get in touch</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Your Full Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMobileNumber">
                  <Form.Label>Mobile Number*</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter your mobile number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBranch">
                  <Form.Label>Select Branch</Form.Label>
                  <Form.Select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                  >
                    <option value="">Select a branch</option>
                    <option value="pune">Pune</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                    {/* Add more branches as needed */}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Any Message*</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Enter your message"
                  />
                </Form.Group>

                <Button variant="danger" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src="../../../public/assets/LoginPageImages/MedBridge Hospital and Surroundings.png"
              alt="Contact Illustration"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;
