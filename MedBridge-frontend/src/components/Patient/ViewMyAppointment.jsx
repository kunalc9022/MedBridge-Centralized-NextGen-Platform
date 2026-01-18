import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Card,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { BsTrashFill } from "react-icons/bs";
import { FaCalendarPlus } from "react-icons/fa";

const ViewMyAppointment = () => {
  const navigate = useNavigate();
  const [allAppointments, setAllAppointments] = useState([]);
  const patient = JSON.parse(sessionStorage.getItem("active-patient"));
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        const appointments = await retrieveAllAppointments();
        if (appointments) {
          setAllAppointments(appointments);
        }
      } catch (error) {
        toast.error("Failed to fetch appointments.");
      }
    };
    getAllAppointments();
  }, []);

  const retrieveAllAppointments = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/appointment/patient/id?patientId=${patient.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const cancelAppointment = async (appointmentId) => {
    // 2. Then update appointment status
    try {
      const res = await fetch(
        "http://localhost:8080/api/appointment/patient/update",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentId: appointmentId,
            status: "Cancel",
          }),
        }
      );

      if (res.ok) {
        toast.success(
          "Appointment cancelled successfully! Refund will be credited shortly",
          {
            position: "top-center",
            autoClose: 2000,
          }
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to cancel appointment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while cancelling.");
    }
  };

  return (
    <>
      <Container fluid className="py-5">
        <ToastContainer />
        <Row className="justify-content-center mb-4">
          <Col md={12}>
            <Card className="shadow rounded-4 border-0">
              <Card.Header className="bg-primary text-white text-center rounded-top-4">
                <h4>📋 My Appointments</h4>
                <Button
                  variant="light"
                  className="fw-semibold rounded-pill shadow-sm d-flex align-items-center"
                  onClick={() => navigate("/patient/addAppointment")}
                >
                  <FaCalendarPlus className="me-2" />
                  Take Appointment
                </Button>
              </Card.Header>

              <Card.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
                {allAppointments.length > 0 ? (
                  <div className="table-responsive">
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className="text-center align-middle"
                    >
                      <thead className="table-primary">
                        <tr>
                          <th>Patient</th>
                          <th>Contact</th>
                          <th>Problem</th>
                          <th>Doctor</th>
                          <th>Prescription</th>
                          <th>Booked On</th>
                          <th>Appointment</th>
                          <th>Status</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allAppointments.map((a, index) => (
                          <tr key={index}>
                            <td>{a.patientName}</td>
                            <td>{a.patientContact}</td>
                            <td>{a.problem}</td>
                            <td>{a.doctorName}</td>
                            <td>{a.prescription || "-"}</td>
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
                              {a.status === "Cancel"
                                ? "Refund processed"
                                : `₹${a.price}`}
                            </td>
                            <td>
                              {a.status === "Treatment pending" && (
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() =>
                                    cancelAppointment(
                                      a.id,
                                      a.paymentId,
                                      a.price
                                    )
                                  }
                                >
                                  <BsTrashFill className="me-1" />
                                  Cancel
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-muted">No appointments found.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ViewMyAppointment;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Container,
//   Table,
//   Button,
//   Card,
//   Row,
//   Col,
//   Badge,
// } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { BsTrashFill } from "react-icons/bs";
// import NavigationBar from "../Navbar/NavigationBar";
// import { FaCalendarPlus } from "react-icons/fa";

// const ViewMyAppointment = () => {
//   const navigate = useNavigate();
//   const [allAppointments, setAllAppointments] = useState([]);
//   const [price, setPrice] = useState("");
//   const patient = JSON.parse(sessionStorage.getItem("active-patient"));

//   useEffect(() => {
//     const getAllAppointments = async () => {
//       const appointments = await retrieveAllAppointments();
//       if (appointments) {
//         setAllAppointments(appointments);
//       }
//     };
//     getAllAppointments();
//   }, []);

//   const token = sessionStorage.getItem("token");

//   const retrieveAllAppointments = async () => {
//     const response = await axios.get(
//       `http://localhost:8080/api/appointment/patient/id?patientId=${patient.id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   };

//   const handleRefund = async (paymentId) => {
//     const token = sessionStorage.getItem("token");

//     try {
//       const res = await fetch(
//         `http://localhost:8080/api/payment/refund?paymentId=${paymentId}&amount=200`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.ok) {
//         toast.success("Refund processed successfully!");
//       } else {
//         toast.error("Refund failed!");
//       }
//     } catch (err) {
//       console.error("Refund error:", err);
//       toast.error("Something went wrong.");
//     }
//   };

//   const cancelAppointment = (appointmentId) => {
//     handleRefund(appointmentId);

//     fetch("http://localhost:8080/api/appointment/patient/update", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         appointmentId: appointmentId,
//         status: "Cancel",
//       }),
//     })
//       .then((result) => result.json())
//       .then((res) => {
//         toast.success("Appointment cancelled successfully!", {
//           position: "top-center",
//           autoClose: 1500,
//         });
//         setTimeout(() => {
//           window.location.reload();
//         }, 1500);
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("Failed to cancel appointment.");
//       });
//   };

//   return (
//     <>
//       <Container fluid className="py-5">
//         <ToastContainer />
//         <Row className="justify-content-center mb-4">
//           <Col md={12}>
//             <Card className="shadow rounded-4 border-0">
//               <Card.Header className="bg-primary text-white text-center rounded-top-4">
//                 <h4>📋 My Appointments</h4>
//                 <Button
//                   variant="light"
//                   className="fw-semibold rounded-pill shadow-sm d-flex align-items-center"
//                   onClick={() => navigate("/patient/addAppointment")}
//                 >
//                   <FaCalendarPlus className="me-2" />
//                   Take Appointment
//                 </Button>
//               </Card.Header>

//               <Card.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
//                 {allAppointments.length > 0 ? (
//                   <div className="table-responsive">
//                     <Table
//                       striped
//                       bordered
//                       hover
//                       responsive
//                       className="text-center align-middle"
//                     >
//                       <thead className="table-primary">
//                         <tr>
//                           <th>Patient</th>
//                           <th>Contact</th>
//                           <th>Problem</th>
//                           <th>Doctor</th>
//                           <th>Prescription</th>
//                           <th>Booked On</th>
//                           <th>Appointment</th>
//                           <th>Status</th>
//                           <th>Price</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {allAppointments.map((a, index) => (
//                           <tr key={index}>
//                             <td>{a.patientName}</td>
//                             <td>{a.patientContact}</td>
//                             <td>{a.problem}</td>
//                             <td>{a.doctorName}</td>
//                             <td>{a.prescription || "-"}</td>
//                             <td>{a.date}</td>
//                             <td>{a.appointmentDate}</td>
//                             <td>
//                               <Badge
//                                 bg={
//                                   a.status === "Cancel"
//                                     ? "danger"
//                                     : a.status === "Assigned"
//                                     ? "success"
//                                     : "warning"
//                                 }
//                               >
//                                 {a.status}
//                               </Badge>
//                             </td>
//                             <td>₹{a.price}</td>
//                             <td>
//                               {a.status === "Not Assigned to Doctor" && (
//                                 <Button
//                                   variant="outline-danger"
//                                   size="sm"
//                                   onClick={() => cancelAppointment(a.id)}
//                                 >
//                                   <BsTrashFill className="me-1" />
//                                   Cancel
//                                 </Button>
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   </div>
//                 ) : (
//                   <div className="text-center">
//                     <p className="text-muted">No appointments found.</p>
//                   </div>
//                 )}
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default ViewMyAppointment;
