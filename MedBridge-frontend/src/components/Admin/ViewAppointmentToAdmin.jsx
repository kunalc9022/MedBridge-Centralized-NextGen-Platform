import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  Button,
  Card,
  Spinner,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import NavigationBar from "../Navbar/NavigationBar";

const ViewAppointmentToAdmin = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllAppointments = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:8080/api/appointment/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllAppointments();
  }, []);

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge bg="warning">Pending</Badge>;
      case "Approved":
        return <Badge bg="success">Approved</Badge>;
      case "Cancel":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <Container fluid className="py-4">
        <Row className="mb-3">
          <Col>
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/dashboard")}
            >
              ⬅ Back to Dashboard
            </Button>
          </Col>
        </Row>

        <Card className="shadow-sm border-0">
          <Card.Header className="bg-primary text-white text-center">
            <h3>📅 All Appointments</h3>
          </Card.Header>
          <Card.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p>Loading appointments...</p>
              </div>
            ) : (
              <Table striped bordered hover responsive className="text-center">
                <thead className="table-primary">
                  <tr>
                    <th>Patient Name</th>
                    <th>Contact</th>
                    <th>Problem</th>
                    <th>Doctor</th>
                    <th>Prescription</th>
                    <th>Booked On</th>
                    <th>Appointment Date</th>
                    <th>Status</th>
                    <th>Fee</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allAppointments.length > 0 ? (
                    allAppointments.map((a) => (
                      <tr key={a.id}>
                        <td>{a.patientName}</td>
                        <td>{a.patientContact}</td>
                        <td>{a.problem}</td>
                        <td>{a.doctorName || <em>Not assigned</em>}</td>
                        <td>{a.prescription || <em>None</em>}</td>
                        <td>{a.date}</td>
                        <td>{a.appointmentDate}</td>
                        <td>{renderStatusBadge(a.status)}</td>
                        <td>₹ {a.price}</td>
                        <td>
                          {a.status !== "Cancel" ? (
                            a.doctorId === 0 ? (
                              <Link to={`/admin/appointment/${a.id}/assign`}>
                                <Button variant="outline-primary" size="sm">
                                  Assign Doctor
                                </Button>
                              </Link>
                            ) : (
                              <Badge bg="info">Assigned</Badge>
                            )
                          ) : (
                            <Badge bg="danger">Cancelled</Badge>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10">
                        <p className="text-muted">No appointments found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ViewAppointmentToAdmin;
