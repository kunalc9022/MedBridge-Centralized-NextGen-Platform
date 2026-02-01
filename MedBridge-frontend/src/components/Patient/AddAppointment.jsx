import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import axios from "axios";

const AddAppointment = () => {
  const navigate = useNavigate();
  const patient = JSON.parse(sessionStorage.getItem("active-patient"));

  const amount = 200;
  const [isLoading, setIsLoading] = useState(false);

  // Prevent past dates
  const today = new Date().toISOString().split("T")[0];

  const [appointment, setAppointment] = useState({
    patientId: patient?.id || "",
    speciality: "",
    doctorId: "",
    problem: "",
    appointmentDate: "",
    price: amount,
    paymentID: "",
  });

  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/doctor/specialist/all")
      .then((res) => {
        if (Array.isArray(res.data)) setSpecialities(res.data);
      })
      .catch((err) => console.error("Error loading specialities", err));
  }, []);

  useEffect(() => {
    if (appointment.speciality) {
      axios
        .get(
          `http://localhost:8080/api/doctor/by-speciality/${appointment.speciality}`
        )
        .then((res) => {
          if (Array.isArray(res.data)) setDoctors(res.data);
        })
        .catch((err) => console.error("Error loading doctors", err));
    } else {
      setDoctors([]);
    }
  }, [appointment.speciality]);

  const handleUserInput = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const saveAppointment = async (event) => {
    event.preventDefault();

    if (
      !appointment.speciality ||
      !appointment.doctorId ||
      !appointment.problem ||
      !appointment.appointmentDate
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const token = sessionStorage.getItem("token");

    try {
      setIsLoading(true);

      const orderRes = await fetch(
        `http://localhost:8080/api/payment/createOrder?amount=${amount}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderData = await orderRes.json();

      const options = {
        key: "rzp_test_TNpcedZQbcsMrm",
        amount: orderData.amount,
        currency: "INR",
        name: "MedBridge",
        description: "Appointment Payment",
        order_id: orderData.id,
        handler: async function (response) {
          const verifyRes = await fetch(
            "http://localhost:8080/api/payment/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                order_id: orderData.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          if (verifyRes.ok) {
            fetch("http://localhost:8080/api/appointment/patient/add", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(appointment),
            })
              .then(async (res) => {
                if (!res.ok) throw new Error(await res.text());
                toast.success("Appointment booked and payment successful!");
              })
              .catch(() => {
                toast.error("Payment done but appointment failed to save.");
              })
              .finally(() => setIsLoading(false));
          } else {
            toast.error("Payment verification failed");
            setIsLoading(false);
          }
        },
        prefill: {
          name: patient?.firstName || "Patient",
          email: patient?.email || "",
        },
        theme: { color: "#4070b8ff" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url('/images/hospital-bg.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Header className="bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">🩺 Take Appointment</h4>
                  <Button
                    variant="light"
                    className="fw-semibold rounded-pill shadow-sm d-flex align-items-center"
                    onClick={() => navigate("/patient/viewAppointment")}
                  >
                    <FaClipboardList className="me-2" />
                    View Appointments
                  </Button>
                </Card.Header>

                <Card.Body className="p-4">
                  <Form onSubmit={saveAppointment}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Speciality</Form.Label>
                      <Form.Select
                        name="speciality"
                        value={appointment.speciality}
                        onChange={handleUserInput}
                        required
                      >
                        <option value="">-- Select Speciality --</option>
                        {specialities.map((spec, idx) => (
                          <option key={idx} value={spec}>
                            {spec}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Select Doctor</Form.Label>
                      <Form.Select
                        name="doctorId"
                        value={appointment.doctorId}
                        onChange={handleUserInput}
                        required
                        disabled={!doctors.length}
                      >
                        <option value="">-- Select Doctor --</option>
                        {doctors.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            Dr. {doc.firstName} {doc.lastName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <FloatingLabel label="Mention your problems" className="mb-4">
                      <Form.Control
                        as="textarea"
                        name="problem"
                        style={{ height: "100px" }}
                        value={appointment.problem}
                        onChange={handleUserInput}
                      />
                    </FloatingLabel>

                    <FloatingLabel label="Appointment Date" className="mb-4">
                      <Form.Control
                        type="date"
                        name="appointmentDate"
                        value={appointment.appointmentDate}
                        onChange={handleUserInput}
                        min={today}
                        required
                      />
                    </FloatingLabel>

                    <div className="d-grid">
                      <Button variant="primary" size="lg" type="submit">
                        Book Appointment
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <ToastContainer />
        </Container>

        {/* ✅ PERFECTLY CENTERED LOADER */}
        {isLoading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(255,255,255,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div className="text-center">
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "4rem", height: "4rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="mt-3 fw-bold text-primary">
                Processing, please wait...
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddAppointment;
