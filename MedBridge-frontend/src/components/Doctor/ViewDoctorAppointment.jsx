import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";

const ViewDoctorAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [prescription, setPrescription] = useState("");

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleTime, setScheduleTime] = useState("");

  const doctor = JSON.parse(sessionStorage.getItem("active-doctor"));

  /* ---------------- FETCH APPOINTMENTS ---------------- */
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:8080/api/appointment/doctor/id?doctorId=${doctor.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments(res.data);
    } catch {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* ---------------- UPDATE PRESCRIPTION ---------------- */
  const openPrescriptionModal = (a) => {
    setSelectedAppointment(a);
    setPrescription(a.prescription || "");
    setShowPrescriptionModal(true);
  };

  const updatePrescription = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/appointment/${selectedAppointment.id}/update`,
        { prescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Prescription updated");
      setShowPrescriptionModal(false);
      fetchAppointments();
    } catch {
      toast.error("Update failed");
      setLoading(false);
    }
  };

  /* ---------------- SCHEDULE APPOINTMENT ---------------- */
  const openScheduleModal = (a) => {
    setSelectedAppointment(a);
    setScheduleTime("");
    setShowScheduleModal(true);
  };

  const scheduleAppointment = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/appointment/${selectedAppointment.id}/schedule`,
        { scheduledTime: scheduleTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Appointment scheduled");
      setShowScheduleModal(false);
      fetchAppointments();
    } catch {
      toast.error("Scheduling failed");
      setLoading(false);
    }
  };

  /* ---------------- CANCEL APPOINTMENT ---------------- */
  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;

    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");

      await axios.put(
        `http://localhost:8080/api/doctor/cancel-appointment/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Appointment cancelled");
      fetchAppointments();
    } catch {
      toast.error("Cancel failed");
      setLoading(false);
    }
  };

  /* ---------------- STATUS BADGE COLOR ---------------- */
  const statusColor = (status) => {
    if (status === "Cancel" || status === "Appointment Cancelled") return "danger";
    if (status === "Appointment Scheduled") return "success";
    if (status === "Treatment Done") return "secondary";
    return "warning";
  };

  return (
    <Container className="my-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white text-center">
          <h3>Doctor Appointments</h3>
        </Card.Header>

        <Card.Body>
          {appointments.length === 0 ? (
            <div className="text-center text-muted py-5">No appointments found</div>
          ) : (
            <Table bordered hover responsive className="text-center">
              <thead className="table-primary">
                <tr>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Problem</th>
                  <th>Prescription</th>
                  <th>Scheduled Time</th>
                  <th>Appointment Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.patientName}</td>
                    <td>{a.patientContact}</td>
                    <td>{a.problem}</td>
                    <td>{a.prescription || <i>Not Added</i>}</td>
                    <td>{a.scheduledTime || <i>Not Scheduled</i>}</td>
                    <td>{a.appointmentDate}</td>
                    <td>
                      <Badge bg={statusColor(a.status)}>{a.status}</Badge>
                    </td>

                    <td className="d-flex gap-2 justify-content-center">
                      {a.status !== "Cancel" && a.status !== "Appointment Cancelled" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            disabled={a.status === "Treatment Done"}
                            onClick={() => openPrescriptionModal(a)}
                          >
                            Update
                          </Button>

                          {a.status !== "Appointment Scheduled" && (
                            <Button
                              size="sm"
                              variant="outline-success"
                              disabled={a.status === "Treatment Done"}
                              onClick={() => openScheduleModal(a)}
                            >
                              Schedule
                            </Button>
                          )}
                        </>
                      )}

                      {a.status !== "Cancel" &&
                        a.status !== "Appointment Cancelled" &&
                        a.status !== "Treatment Done" && (
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => cancelAppointment(a.id)}
                          >
                            Cancel
                          </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Prescription Modal */}
      <Modal show={showPrescriptionModal} onHide={() => setShowPrescriptionModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Prescription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={3}
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updatePrescription}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Schedule Modal */}
      <Modal show={showScheduleModal} onHide={() => setShowScheduleModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="time"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={scheduleAppointment}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      {/* 🔵 FULL SCREEN LOADER */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255,255,255,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div className="text-center">
            <Spinner animation="border" variant="primary" style={{ width: "4rem", height: "4rem" }} />
            <div className="mt-3 fw-bold text-primary">Processing, please wait...</div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ViewDoctorAppointment;
