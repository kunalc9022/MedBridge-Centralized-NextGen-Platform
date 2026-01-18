import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./OrganInfo.css";

const OrganInfo = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (token && role === "patient") {
      navigate("/patient-dashboard");
    } else {
      navigate("/admin-login", { state: { role: "patient" } });
    }
  };

  const handleDoctorDashboard = () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (token && role === "doctor") {
      navigate("/doctor/viewAllAppointment");
    } else {
      navigate("/admin-login", { state: { role: "doctor" } });
    }
  };

  const handleAdminDashboard = () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (token && role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin-login", { state: { role: "admin" } });
    }
  };

  return (
    <div className="py-4 w-100 fullscreen-width">
      <Container fluid className="organ py-3 w-100">
        <h2 className="heading text-center mb-4 mt-5">WELCOME TO MEDBRIDGE</h2>
        <p className="para text-center mb-5">
          MedBridge is a smart hospital management system that simplifies
          patient care, doctor coordination, appointment scheduling, and health
          monitoring — all in one platform.
        </p>

        <Row className="gy-3 justify-content-between">
          {/* BOOK APPOINTMENT CARD */}
          <Col
            xs={12}
            md={3}
            style={{
              border: "0.2rem solid gray",
              borderRadius: "1em",
              margin: "1em",
            }}
            className="d-flex flex-column align-items-center text-center p-3"
          >
            <Image
              className="heartIcon mb-3"
              src="/assets/LoginPageImages/BookAppointment.png"
              roundedCircle
              width={100}
              height={100}
            />
            <div className="Ticket">
              <h4>BOOK APPOINTMENTS</h4>
              <p>
                Schedule doctor appointments seamlessly using our intuitive
                system. View available time slots, doctor specialization, and
                confirmation status.
              </p>
              <Button
                variant="primary"
                className="mt-2"
                onClick={handleBookAppointment}
              >
                Book Now
              </Button>
            </div>
          </Col>

          {/* DOCTOR DASHBOARD CARD */}
          <Col
            xs={12}
            md={3}
            style={{
              border: "0.2rem solid gray",
              borderRadius: "1em",
              margin: "0.2em",
            }}
            className="d-flex flex-column align-items-center text-center p-3"
          >
            <Image
              className="heartIcon mb-3"
              src="/assets/LoginPageImages/DoctorDashboard.png"
              roundedCircle
              width={100}
              height={100}
            />
            <div className="Ticket">
              <h4>DOCTOR DASHBOARD</h4>
              <p>
                Doctors can view and manage patient appointments, write
                prescriptions, and monitor their assigned hospitals in
                real-time.
              </p>
              <Button
                variant="success"
                className="mt-2"
                onClick={handleDoctorDashboard}
              >
                Go to Dashboard
              </Button>
            </div>
          </Col>

          {/* MEDICAL RECORDS CARD */}
          <Col
            xs={12}
            md={3}
            style={{
              border: "0.2rem solid gray",
              borderRadius: "1em",
              margin: "0.2em",
            }}
            className="d-flex flex-column align-items-center text-center p-3"
          >
            <Image
              className="heartIcon mb-3"
              src="/assets/LoginPageImages/MedicalInfo.png"
              roundedCircle
              width={100}
              height={100}
            />
            <div className="Ticket">
              <h4>ADMIN DASHBOARD</h4>
              <p>
                Patients can securely access prescriptions, reports, and
                appointment history — anytime, anywhere, all protected under a
                secure system.
              </p>
              <Button
                variant="info"
                className="mt-2"
                onClick={handleAdminDashboard}
              >
                Go to Dashboard
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrganInfo;
