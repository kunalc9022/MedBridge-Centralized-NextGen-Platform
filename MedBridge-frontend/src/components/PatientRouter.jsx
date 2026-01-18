import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { registerPatient } from "../services/PatientService";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Navbar/NavigationBar";
import Footer from "./Footer/Footer";
export function PatientRegistrationForm() {
  const navigate = useNavigate();

  // const [organname, setOrganName] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    gender: "",
    phone_number: "",
    email: "",
    address: "",
    id_proof: "",
    blood_group: "",
    known_conditions: "",
    current_medications: "",
    allergies: "",
    emergency_contact: "",
    organ_needed: "",
    urgency_level: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Regex patterns
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const aadhaarRegex = /^(?!0{8})\d{12}$/;
    const bloodGroupRegex = /^(A|B|AB|O)[+-]$/;

    // Trim and normalize form data
    const cleanedFormData = {
      ...formData,
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      id_proof: formData.id_proof.trim(),
      blood_group: formData.blood_group.trim().toUpperCase(),
      organ_needed: formData.organ_needed.trim(),
      emergency_contact: formData.emergency_contact.trim(),
    };
    console.log(`ajjj ${cleanedFormData}`)
    const today = new Date();
    const dobDate = new Date(cleanedFormData.dob);
    today.setHours(0, 0, 0, 0); // Strip time for accurate comparison
    dobDate.setHours(0, 0, 0, 0);

    if (!cleanedFormData.dob || dobDate >= today) {
      toast.error("Date of birth must be a valid past date");
      return;
    }
    // Validations
    if (!nameRegex.test(cleanedFormData.full_name)) {
      toast.error("Invalid full name");
      return;
    }

    if (!cleanedFormData.dob) {
      toast.error("Date of Birth is required");
      return;
    }

    if (!cleanedFormData.gender) {
      toast.error("Please select a gender");
      return;
    }

    if (!phoneRegex.test(cleanedFormData.phone_number)) {
      toast.error("Invalid phone number");
      return;
    }

    if (!emailRegex.test(cleanedFormData.email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!aadhaarRegex.test(cleanedFormData.id_proof)) {
      toast.error(
        "Invalid Aadhaar (must be 12 digits and not start with 8 zeros)"
      );
      return;
    }

    if (!bloodGroupRegex.test(cleanedFormData.blood_group)) {
      toast.error("Invalid blood group (e.g., A+, B-, O+)");
      return;
    }

    if (!phoneRegex.test(cleanedFormData.emergency_contact)) {
      toast.error("Invalid emergency contact number");
      return;
    }

    if (!cleanedFormData.urgency_level) {
      toast.error("Please select urgency level");
      return;
    }

    try {
      console.log(cleanedFormData);
      const response = await registerPatient(cleanedFormData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Patient Registered Successfully");
        console.log(`${cleanedFormData.organ_needed}`)
        navigate(`/donor-list/${cleanedFormData.organ_needed}`);
        // console.log(organname)
        // navigate(`/donor-list/${organname}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <NavigationBar />
    <Container className="mt-4">
      <Alert variant="info">
        <h2>Register a Patient</h2>
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Aadhar No.</Form.Label>
              <Form.Control
                type="text"
                name="id_proof"
                value={formData.id_proof}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                type="text"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Known Conditions</Form.Label>
              <Form.Control
                type="text"
                name="known_conditions"
                value={formData.known_conditions}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Current Medications</Form.Label>
              <Form.Control
                type="text"
                name="current_medications"
                value={formData.current_medications}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Allergies</Form.Label>
              <Form.Control
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Emergency Contact</Form.Label>
              <Form.Control
                type="text"
                name="emergency_contact"
                value={formData.emergency_contact}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Organ Needed</Form.Label>
              <Form.Select
                name="organ_needed"
                value={formData.organ_needed}
                onChange={handleChange}
              >
                <option value="">-- Select an Organ --</option>
                <option value="Heart">Heart</option>
                <option value="Liver">Liver</option>
                <option value="Kidney">Kidney</option>
                <option value="Lungs">Lungs</option>
                <option value="Pancreas">Pancreas</option>
                <option value="Intestine">Intestine</option>
                <option value="Eye">Eye</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Urgency Level</Form.Label>
              <Form.Control
                as="select"
                name="urgency_level"
                value={formData.urgency_level}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </Container>
          <Footer />
    </div>
  );
}
