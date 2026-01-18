import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import NavigationBar from "../Navbar/NavigationBar";

const AssignAppointment = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();

  const [doctorId, setDoctorId] = useState("");
  const [appointment, setAppointment] = useState({});
  const [allDoctor, setAllDoctor] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loader state

  const token = sessionStorage.getItem("token");

  const retrieveAppointment = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/appointment/id?appointmentId=${appointmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const retrieveAllDoctor = async () => {
    const response = await axios.get("http://localhost:8080/api/doctor/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true); // 🔵 Start loader
        const doctors = await retrieveAllDoctor();
        const appt = await retrieveAppointment();
        setAllDoctor(doctors);
        setAppointment(appt);
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error(err);
      } finally {
        setLoading(false); // 🔴 Stop loader
      }
    };

    getData();
  }, []);

  const saveAppointment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // 🔵 Start loader
      await axios.post(
        "http://localhost:8080/api/appointment/admin/assign/doctor",
        {
          appointmentId: Number(appointmentId),
          doctorId: Number(doctorId),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Patient Appointment Assigned to Doctor");
      navigate("/admin/dashboard/appointment");
    } catch (err) {
      console.error(err);
      setError("Failed to assign doctor. Please try again.");
    } finally {
      setLoading(false); // 🔴 Stop loader
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center mt-4">
        <Card style={{ width: "35rem" }} className="shadow">
          <Card.Header className="bg-primary text-white text-center">
            <h5>Assign Doctor to Appointment</h5>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={saveAppointment}>
              <Form.Group className="mb-3">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  value={appointment.patientName || ""}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Problem Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={appointment.problem || ""}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  type="text"
                  value={appointment.appointmentDate || ""}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Doctor</Form.Label>
                <Form.Select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                >
                  <option value="">Select Doctor</option>
                  {allDoctor.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit" disabled={!doctorId}>
                  Assign Doctor
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      {/* 🔄 Loader Overlay */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
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
    </>
  );
};

export default AssignAppointment;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Container,
//   Card,
//   Form,
//   Button,
//   Row,
//   Col,
//   FloatingLabel,
//   Alert,
// } from "react-bootstrap";
// import NavigationBar from "../Navbar/NavigationBar";

// const AssignAppointment = () => {
//   const navigate = useNavigate();
//   const { appointmentId } = useParams();

//   const [doctorId, setDoctorId] = useState("");
//   const [appointment, setAppointment] = useState({});
//   const [allDoctor, setAllDoctor] = useState([]);
//   const [error, setError] = useState("");

//   const token = sessionStorage.getItem("token");

//   const retrieveAppointment = async () => {
//     const response = await axios.get(
//       `http://localhost:8080/api/appointment/id?appointmentId=${appointmentId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   };

//   const retrieveAllDoctor = async () => {
//     const response = await axios.get("http://localhost:8080/api/doctor/all", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   };

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const doctors = await retrieveAllDoctor();
//         const appt = await retrieveAppointment();
//         setAllDoctor(doctors);
//         setAppointment(appt);
//       } catch (err) {
//         setError("Something went wrong. Please try again.");
//         console.error(err);
//       }
//     };

//     getData();
//   }, []);

//   const saveAppointment = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("appointmentId", appointmentId);
//     formData.append("doctorId", doctorId);

//     try {
//       // const result = await axios.post(
//       //   "http://localhost:8080/api/appointment/admin/assign/doctor",
//       //   formData
//       // );
//       await axios.post(
//         "http://localhost:8080/api/appointment/admin/assign/doctor",
//         {
//           appointmentId: Number(appointmentId),
//           doctorId: Number(doctorId),
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Patient Appointment Assigned to Doctor");
//       navigate("/admin/dashboard/appointment");
//     } catch (err) {
//       setError("Failed to assign doctor. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Container className="d-flex justify-content-center mt-4">
//         <Card style={{ width: "35rem" }} className="shadow">
//           <Card.Header className="bg-primary text-white text-center">
//             <h5>Assign Doctor to Appointment</h5>
//           </Card.Header>
//           <Card.Body>
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={saveAppointment}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Patient Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={appointment.patientName || ""}
//                   readOnly
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Problem Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   value={appointment.problem || ""}
//                   readOnly
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Appointment Date</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={appointment.appointmentDate || ""}
//                   readOnly
//                 />
//               </Form.Group>

//               <Form.Group className="mb-4">
//                 <Form.Label>Doctor</Form.Label>
//                 <Form.Select
//                   value={doctorId}
//                   onChange={(e) => setDoctorId(e.target.value)}
//                 >
//                   <option value="">Select Doctor</option>
//                   {allDoctor.map((doctor) => (
//                     <option key={doctor.id} value={doctor.id}>
//                       {doctor.firstName} {doctor.lastName}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>

//               <div className="text-center">
//                 <Button variant="primary" type="submit" disabled={!doctorId}>
//                   Assign Doctor
//                 </Button>
//               </div>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </>
//   );
// };

// export default AssignAppointment;
