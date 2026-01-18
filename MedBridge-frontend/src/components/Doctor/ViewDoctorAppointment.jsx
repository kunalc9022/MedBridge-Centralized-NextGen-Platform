import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Table,
  Button,
  Spinner,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import NavigationBar from "../Navbar/NavigationBar";
import { toast } from "react-toastify";

const ViewDoctorAppointment = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // For updating prescription and price
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescription, setPrescription] = useState("");
  const [price, setPrice] = useState("");

  // For scheduling appointment time
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedAppointmentForSchedule, setSelectedAppointmentForSchedule] =
    useState(null);
  const [scheduledTime, setScheduledTime] = useState("");

  const doctor = JSON.parse(sessionStorage.getItem("active-doctor"));

  useEffect(() => {
    const getAllAppointments = async () => {
      setLoading(true);
      const appointments = await retrieveAllAppointments();
      if (appointments) {
        setAllAppointments(appointments);
      }
      setLoading(false);
    };

    getAllAppointments();
  }, []);

  const retrieveAllAppointments = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/doctor/id?doctorId=${doctor.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      setLoading(false);
      return [];
    }
  };

  // Prescription & price modal handlers
  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setPrescription(appointment.prescription || "");
    setPrice(appointment.price || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setPrescription("");
    setPrice("");
  };

  const handleUpdate = async () => {
    if (!selectedAppointment) return;

    try {
      const token = sessionStorage.getItem("token");
      setLoading(true);

      await axios.put(
        `http://localhost:8080/api/appointment/${selectedAppointment.id}/update`,
        {
          prescription: prescription,
          price: parseFloat(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedAppointments = await retrieveAllAppointments();
      setAllAppointments(updatedAppointments);
      setLoading(false);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update appointment:", error);
      alert("Update failed. Try again.");
      setLoading(false);
    }
  };

  // Schedule appointment modal handlers
  const handleOpenScheduleModal = (appointment) => {
    setSelectedAppointmentForSchedule(appointment);
    setScheduledTime("");
    setShowScheduleModal(true);
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(false);
    setSelectedAppointmentForSchedule(null);
    setScheduledTime("");
  };

  const handleScheduleSubmit = async () => {
    if (!selectedAppointmentForSchedule || !scheduledTime) return;

    try {
      const token = sessionStorage.getItem("token");
      setLoading(true);

      await axios.put(
        `http://localhost:8080/api/appointment/${selectedAppointmentForSchedule.id}/schedule`,
        {
          scheduledTime: scheduledTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedAppointments = await retrieveAllAppointments();
      setAllAppointments(updatedAppointments);
      setLoading(false);
      handleCloseScheduleModal();
      toast.success("Schedule is shared with you and patient on Email");
    } catch (error) {
      console.error("Failed to schedule appointment:", error);
      alert("Scheduling failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="my-5">
        <Card className="shadow-lg border-0">
          <Card.Header className="bg-primary text-white text-center">
            <h3>All Appointments</h3>
          </Card.Header>
          <Card.Body style={{ maxHeight: "600px", overflowY: "auto" }}>
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <div>Loading appointments...</div>
              </div>
            ) : allAppointments.length === 0 ? (
              <div className="text-center text-muted">
                No appointments found.
              </div>
            ) : (
              <Table striped bordered hover responsive className="text-center">
                <thead className="table-primary">
                  <tr>
                    <th>Patient Name</th>
                    <th>Patient Contact</th>
                    <th>Problem</th>
                    <th>Doctor Name</th>
                    <th>Prescription</th>
                    <th>Booked On</th>
                    <th>Appointment Date</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Confirm Appointment</th>
                  </tr>
                </thead>
                <tbody>
                  {allAppointments.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <strong>{a.patientName}</strong>
                      </td>
                      <td>{a.patientContact}</td>
                      <td>{a.problem}</td>
                      <td>{a.doctorName}</td>
                      <td>{a.prescription || <i>--</i>}</td>
                      <td>{a.date}</td>
                      <td>{a.appointmentDate}</td>
                      <td>
                        <Badge
                          bg={
                            a.status === "Cancel"
                              ? "danger"
                              : a.status === "Assigned"
                              ? "success"
                              : "warning"
                          }
                        >
                          {a.status}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleOpenModal(a)}
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleOpenScheduleModal(a)}
                        >
                          Schedule Appointment
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* Modal for updating prescription & price */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="prescription">
              <Form.Label>Prescription</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for scheduling appointment time */}
      <Modal
        show={showScheduleModal}
        onHide={handleCloseScheduleModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Schedule Appointment Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="scheduledTime">
              <Form.Label>Appointment Time</Form.Label>
              <Form.Control
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                placeholder="Select time"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseScheduleModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleScheduleSubmit}
            disabled={!scheduledTime}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Loader Overlay */}
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

export default ViewDoctorAppointment;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Container,
//   Card,
//   Table,
//   Button,
//   Spinner,
//   Modal,
//   Form,
//   Badge,
// } from "react-bootstrap";
// import NavigationBar from "../Navbar/NavigationBar";

// const ViewDoctorAppointment = () => {
//   const [allAppointments, setAllAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [prescription, setPrescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [AppointmentModel, setAppointmentModel] = useState(false);

//   const doctor = JSON.parse(sessionStorage.getItem("active-doctor"));

//   useEffect(() => {
//     const getAllAppointments = async () => {
//       setLoading(true);
//       const appointments = await retrieveAllAppointments();
//       if (appointments) {
//         setAllAppointments(appointments);
//         setPrice(appointments.price);
//       }
//       setLoading(false);
//     };

//     getAllAppointments();
//   }, []);

//   const retrieveAllAppointments = async () => {
//     try {
//       setLoading(true);
//       const token = sessionStorage.getItem("token"); // 🛡 Get JWT token
//       const response = await axios.get(
//         `http://localhost:8080/api/doctor/id?doctorId=${doctor.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // 🧾 Attach token in header
//           },
//         }
//       );
//       console.log(response.data);
//       setLoading(false);
//       return response.data;
//     } catch (error) {
//       console.error("Failed to fetch appointments:", error);
//       return [];
//     }
//   };

//   // const retrieveAllAppointments = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `http://localhost:8080/api/doctor/id?doctorId=${doctor.id}`
//   //     );
//   //     console.log(response.data);
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error("Failed to fetch appointments:", error);
//   //     return [];
//   //   }
//   // };

//   const handleOpenModal = (appointment) => {
//     setSelectedAppointment(appointment);
//     setPrescription(appointment.prescription || "");
//     setPrice(appointment.price || "");
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedAppointment(null);
//   };

//   const handleUpdate = async () => {
//     if (!selectedAppointment) return;

//     try {
//       const token = sessionStorage.getItem("token");

//       setLoading(true);

//       await axios.put(
//         `http://localhost:8080/api/appointment/${selectedAppointment.id}/update`,
//         {
//           prescription: prescription,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Refresh the data
//       const updatedAppointments = await retrieveAllAppointments();
//       setAllAppointments(updatedAppointments);
//       setLoading(false);
//       handleCloseModal();
//     } catch (error) {
//       console.error("Failed to update appointment:", error);
//       alert("Update failed. Try again.");
//     }
//   };

//   return (
//     <>
//       <Container className="my-5">
//         <Card className="shadow-lg border-0">
//           <Card.Header className="bg-primary text-white text-center">
//             <h3>All Appointments</h3>
//           </Card.Header>
//           <Card.Body style={{ maxHeight: "600px", overflowY: "auto" }}>
//             {loading ? (
//               <div className="text-center py-5">
//                 <Spinner animation="border" variant="primary" />
//                 <div>Loading appointments...</div>
//               </div>
//             ) : allAppointments.length === 0 ? (
//               <div className="text-center text-muted">
//                 No appointments found.
//               </div>
//             ) : (
//               <Table striped bordered hover responsive className="text-center">
//                 <thead className="table-primary">
//                   <tr>
//                     <th>Patient Name</th>
//                     <th>Patient Contact</th>
//                     <th>Problem</th>
//                     <th>Doctor Name</th>
//                     <th>Prescription</th>
//                     <th>Booked On</th>
//                     <th>Appointment Date</th>
//                     <th>Status</th>

//                     <th>Action</th>
//                     <th>Confirm Appointment</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {allAppointments.map((a) => (
//                     <tr key={a.id}>
//                       <td>
//                         <strong>{a.patientName}</strong>
//                       </td>
//                       <td>{a.patientContact}</td>
//                       <td>{a.problem}</td>
//                       <td>{a.doctorName}</td>
//                       <td>{a.prescription || <i>--</i>}</td>
//                       <td>{a.date}</td>
//                       <td>{a.appointmentDate}</td>
//                       <td>
//                         <Badge
//                           bg={
//                             a.status === "Cancel"
//                               ? "danger"
//                               : a.status === "Assigned"
//                               ? "success"
//                               : "warning"
//                           }
//                         >
//                           {a.status}
//                         </Badge>
//                       </td>
//                       <td>
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           onClick={() => handleOpenModal(a)}
//                         >
//                           Update
//                         </Button>
//                       </td>
//                       <td>
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           // onClick={() => handleAppointmentModel(a)}
//                         >
//                           Schedule Appointment
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             )}
//           </Card.Body>
//         </Card>
//       </Container>

//       {/* Modal for updating appointment */}
//       <Modal show={showModal} onHide={handleCloseModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Appointment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="prescription">
//               <Form.Label>Prescription</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 value={prescription}
//                 onChange={(e) => setPrescription(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleUpdate}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       {/* 🔄 Loader Overlay */}
//       {loading && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             backgroundColor: "rgba(255, 255, 255, 0.7)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//           }}
//         >
//           <div className="text-center">
//             <div
//               className="spinner-border text-primary"
//               role="status"
//               style={{ width: "4rem", height: "4rem" }}
//             >
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <div className="mt-3 fw-bold text-primary">
//               Processing, please wait...
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ViewDoctorAppointment;
