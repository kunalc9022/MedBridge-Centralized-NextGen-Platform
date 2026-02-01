import React, { useState, useEffect, useMemo } from "react";
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
  Form,
} from "react-bootstrap";

const ViewAppointmentToAdmin = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const getAllAppointments = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:8080/api/appointment/all",
          { headers: { Authorization: `Bearer ${token}` } }
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

  /* -------- STATUS BADGE COLORS -------- */
  const renderStatusBadge = (status) => {
    if (
      status === "Cancel" ||
      status === "Cancelled" ||
      status === "Appointment Cancelled"
    ) {
      return <Badge bg="danger">{status}</Badge>;
    }

    if (
      status === "Appointment Scheduled" ||
      status === "Appointment Shceduled" // fallback old spelling
    ) {
      return <Badge bg="primary">Appointment Scheduled</Badge>;
    }

    if (status === "Treatment Done") {
      return <Badge bg="success">{status}</Badge>;
    }

    return <Badge bg="secondary">{status}</Badge>;
  };

  /* -------- FILTER LOGIC -------- */
  const filteredAppointments = useMemo(() => {
    if (statusFilter === "Scheduled") {
      return allAppointments.filter(
        (a) =>
          a.status === "Appointment Scheduled" ||
          a.status === "Appointment Shceduled"
      );
    }

    if (statusFilter === "Treatment Done") {
      return allAppointments.filter((a) => a.status === "Treatment Done");
    }

    return allAppointments;
  }, [allAppointments, statusFilter]);

  /* -------- FEE DISPLAY FIX -------- */
  const renderFee = (a) => {
    if (
      a.status === "Cancel" ||
      a.status === "Cancelled" ||
      a.status === "Appointment Cancelled"
    ) {
      return <span className="text-danger fw-bold">₹ 0</span>;
    }

    if (a.status === "Treatment Done") {
      return <span className="text-success fw-bold">₹ {a.price}</span>;
    }

    return <span className="text-warning fw-bold">Treatment Pending</span>;
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Button
            variant="secondary"
            onClick={() => navigate("/admin/dashboard")}
          >
            ⬅ Back to Dashboard
          </Button>
        </Col>

        <Col md={6} className="text-end">
          <Form.Select
            style={{ width: "200px", display: "inline-block" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Appointments</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Treatment Done">Treatment Done</option>
          </Form.Select>
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
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((a) => (
                    <tr key={a.id}>
                      <td>{a.patientName}</td>
                      <td>{a.patientContact}</td>
                      <td>{a.problem}</td>
                      <td>{a.doctorName || <em>Not assigned</em>}</td>
                      <td>{a.prescription || <em>None</em>}</td>
                      <td>{a.date}</td>
                      <td>{a.appointmentDate}</td>
                      <td>{renderStatusBadge(a.status)}</td>
                      <td>{renderFee(a)}</td>

                      <td>
                        {a.status === "Cancel" ||
                        a.status === "Cancelled" ||
                        a.status === "Appointment Cancelled" ? (
                          <Badge bg="danger">{a.status}</Badge>
                        ) : a.doctorId === 0 ? (
                          <Link to={`/admin/appointment/${a.id}/assign`}>
                            <Button variant="outline-primary" size="sm">
                              Assign Doctor
                            </Button>
                          </Link>
                        ) : (
                          <Badge bg="info">Assigned</Badge>
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
  );
};

export default ViewAppointmentToAdmin;
