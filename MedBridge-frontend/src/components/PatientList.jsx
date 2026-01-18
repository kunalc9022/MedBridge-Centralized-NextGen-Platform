import { useEffect, useState } from "react";
import { Alert, Button, Container, Modal, Table } from "react-bootstrap";
import { fetchAllPatients, fetchaAlldetails } from "../services/PatientService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Navbar/NavigationBar";
import Footer from "./Footer/Footer";
export function PatientList() {
  const navigate = useNavigate();

  const { organ } = useParams();
  const [patients, setPatients] = useState([]);
  //   const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [detailVisibility, setDetailVisibility] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    const getPatients = async () => {
      try {
        console.log(organ);
        const response = await fetchAllPatients(organ); // service api call
        setPatients(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch patients.");
      }
    };

    getPatients();
  }, [organ]);

  const showDetails = async (patientId) => {
    try {
      const res = await fetchaAlldetails(patientId); // API call
      setPatientDetails(res.data);
      setDetailVisibility(true);
    } catch (error) {
      console.log("Error fetching details:", error);
      toast.error("Failed to fetch patient details.");
    }
  };
const editPatient = (patientId) => {
  navigate(`/edit-patient/${patientId}`);
};
  const closeDetailModal = () => {
    setDetailVisibility(false);
    setPatientDetails(null);
  };

  return (
    <div>
      <NavigationBar />
    <Container className="mt-4">
      <Alert variant="success">
        <h5>List of Patients</h5>
      </Alert>
      <Container className="mt-3">
        {patients.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Organ Needed</th>
                <th>Urgency</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((s) => (
                <tr key={s.patient_id}>
                  <td>{s.patient_id}</td>
                  <td>{s.full_name}</td>
                  <td>{s.phone_number}</td>
                  <td>{s.organ_needed}</td>
                  <td>{s.urgency_level}</td>
                  <td>
                    <Button
                      variant="info"
                      className="btn-sm"
                      onClick={() => showDetails(s.patient_id)}
                    >
                      View
                    </Button>
                    &nbsp;
                    <Button
                      variant="warning"
                      className="btn-sm"
                      onClick={() => editPatient(s.patient_id)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h2>No record found!</h2>
        )}

        {/* Details Modal */}
        <Modal show={detailVisibility} onHide={closeDetailModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Patient Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {patientDetails ? (
              <div>
                <p>
                  <strong>Name:</strong> {patientDetails.full_name}
                </p>
                <p>
                  <strong>Gender:</strong> {patientDetails.gender}
                </p>
                <p>
                  <strong>DOB:</strong>{" "}
                  {new Date(patientDetails.dob).toLocaleDateString()}
                </p>
                <p>
                  <strong>Blood Group:</strong> {patientDetails.blood_group}
                </p>
                <p>
                  <strong>Organ Needed:</strong> {patientDetails.organ_needed}
                </p>
                <p>
                  <strong>Urgency Level:</strong> {patientDetails.urgency_level}
                </p>
                <p>
                  <strong>Address:</strong> {patientDetails.address}
                </p>
                <p>
                  <strong>Phone:</strong> {patientDetails.phone_number}
                </p>
                <p>
                  <strong>Email:</strong> {patientDetails.email}
                </p>
                <p>
                  <strong>Allergies:</strong> {patientDetails.allergies}
                </p>
                <p>
                  <strong>Current Medications:</strong>{" "}
                  {patientDetails.current_medications}
                </p>
                <p>
                  <strong>Known Conditions:</strong>{" "}
                  {patientDetails.known_conditions}
                </p>
                <p>
                  <strong>ID Proof:</strong> {patientDetails.id_proof}
                </p>
                <p>
                  <strong>Emergency Contact:</strong>{" "}
                  {patientDetails.emergency_contact}
                </p>
              </div>
            ) : (
              <p>Loading details...</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="btn-sm"
              onClick={closeDetailModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
          <Footer />
    </div>
  );
}
