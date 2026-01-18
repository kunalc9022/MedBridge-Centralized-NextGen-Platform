import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { registerDonor } from "../services/DoctorService";
// import { fetchAllPatients } from "../services/PatientService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./Navbar/NavigationBar";
import Footer from "./Footer/Footer";
export function DonorRegistrationForm() {
  const navigate = useNavigate();

  const [organname, setOrganname] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    gender: "",
    phone_number: "",
    email: "",
    address: "",
    id_proof: "",
    blood_group: "",
    height_cm: "",
    weight_kg: "",
    known_conditions: "",
    current_medications: "",
    allergies: "",
    smoking_or_alcohol: "",
    organs_to_donate: "",
    donation_type: "",
    emergency_contact: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");

    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const heightRegex = /^(?:[3-9][0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/;
    const weightRegex = /^(?:[2-9][0-9]|1[0-9]{2}|2[0-9]{2}|300)$/;
    const bloodGroupRegex = /^(A|B|AB|O)[+-]$/;
    const aadhaarRegex = /^(?!0{8})\d{12}$/;

    const data = {
      ...formData,
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      blood_group: formData.blood_group.trim().toUpperCase(),
      id_proof: formData.id_proof.trim(),
    };
    const today = new Date();
    const dobDate = new Date(data.dob);
    today.setHours(0, 0, 0, 0); // Strip time for accurate comparison
    dobDate.setHours(0, 0, 0, 0);

    if (!data.dob || dobDate >= today) {
      toast.error("Date of birth must be a valid past date");
      return;
    }
    if (!nameRegex.test(data.full_name)) {
      toast.error("Invalid full name");
      return;
    }

    if (!data.gender) {
      toast.error("Please select gender");
      return;
    }

    if (!phoneRegex.test(data.phone_number)) {
      toast.error("Invalid phone number");
      return;
    }

    if (!emailRegex.test(data.email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!aadhaarRegex.test(data.id_proof)) {
      toast.error("Invalid Aadhaar (must be 12 digits, not all zeros)");
      return;
    }

    if (!bloodGroupRegex.test(data.blood_group)) {
      toast.error("Invalid blood group (e.g., A+, B-, AB+)");
      return;
    }

    if (!heightRegex.test(data.height_cm)) {
      toast.error("Invalid height (30-250 cm allowed)");
      return;
    }

    if (!weightRegex.test(data.weight_kg)) {
      toast.error("Invalid weight (20-300 kg allowed)");
      return;
    }

    if (!phoneRegex.test(data.emergency_contact)) {
      toast.error("Invalid emergency contact number");
      return;
    }

    if (data.smoking_or_alcohol === "") {
      toast.error("Please select smoking/alcohol status");
      return;
    }

    if (!data.donation_type) {
      toast.error("Please select donation type");
      return;
    }

    try {
      console.log(data);
      const response = await registerDonor(data);
      if (response.status === 200 || response.status === 201) {
        toast.success("Donor Registered Successfully");
        console.log(organname);
        navigate(`/patient-list/${organname}`);
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
        <Alert variant="success">
          <h2>Register a Donor</h2>
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
                <Form.Label>Height (cm)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="height_cm"
                  value={formData.height_cm}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Weight (kg)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="weight_kg"
                  value={formData.weight_kg}
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
                <Form.Label>Smoking/Alcohol (0 - No, 1 - Yes)</Form.Label>
                <Form.Control
                  as="select"
                  name="smoking_or_alcohol"
                  value={formData.smoking_or_alcohol}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Organs to Donate</Form.Label>
                <Form.Select
                  name="organs_to_donate"
                  value={formData.organs_to_donate}
                  onChange={(e) => {
                    handleChange(e);
                    setOrganname(e.target.value);
                  }}
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
                <Form.Label>Donation Type</Form.Label>
                <Form.Control
                  as="select"
                  name="donation_type"
                  value={formData.donation_type}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="After Death">After Death</option>
                  <option value="Living Donor">Living Donor</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Emergency Contact</Form.Label>
            <Form.Control
              type="text"
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}
// import { useState } from "react";
// import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
// import { registerDonor } from "../services/DonorService";
// import { fetchAllPatients } from "../services/PatientService";
// import { toast } from "react-toastify";

// export function DonorRegistrationForm() {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     dob: "",
//     gender: "",
//     phone_number: "",
//     email: "",
//     address: "",
//     id_proof: "",
//     blood_group: "",
//     height_cm: "",
//     weight_kg: "",
//     known_conditions: "",
//     current_medications: "",
//     allergies: "",
//     smoking_or_alcohol: "",
//     organs_to_donate: "",
//     donation_type: "",
//     emergency_contact: "",
//   });

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//   event.preventDefault();

//   const nameRegex = /^[a-zA-Z\s]{2,50}$/;
//   const phoneRegex = /^[6-9]\d{9}$/;
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   const heightRegex = /^(?:[3-9][0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/;
//   const weightRegex = /^(?:[2-9][0-9]|1[0-9]{2}|2[0-9]{2}|300)$/;
//   const bloodGroupRegex = /^(A|B|AB|O)[+-]$/;
//   const aadhaarRegex = /^(?!0{8})\d{12}$/;

//   const data = {
//     ...formData,
//     full_name: formData.full_name.trim(),
//     email: formData.email.trim(),
//     blood_group: formData.blood_group.trim().toUpperCase(),
//     id_proof: formData.id_proof.trim(),
//   };
// const today = new Date();
//   const dobDate = new Date(data.dob);
//   today.setHours(0, 0, 0, 0); // Strip time for accurate comparison
//   dobDate.setHours(0, 0, 0, 0);

//   if (!data.dob || dobDate >= today) {
//     toast.error("Date of birth must be a valid past date");
//     return;
//   }
//   if (!nameRegex.test(data.full_name)) {
//     toast.error("Invalid full name");
//     return;
//   }

//   if (!data.gender) {
//     toast.error("Please select gender");
//     return;
//   }

//   if (!phoneRegex.test(data.phone_number)) {
//     toast.error("Invalid phone number");
//     return;
//   }

//   if (!emailRegex.test(data.email)) {
//     toast.error("Invalid email address");
//     return;
//   }

//   if (!aadhaarRegex.test(data.id_proof)) {
//     toast.error("Invalid Aadhaar (must be 12 digits, not all zeros)");
//     return;
//   }

//   if (!bloodGroupRegex.test(data.blood_group)) {
//     toast.error("Invalid blood group (e.g., A+, B-, AB+)");
//     return;
//   }

//   if (!heightRegex.test(data.height_cm)) {
//     toast.error("Invalid height (30-250 cm allowed)");
//     return;
//   }

//   if (!weightRegex.test(data.weight_kg)) {
//     toast.error("Invalid weight (20-300 kg allowed)");
//     return;
//   }

//   if (!phoneRegex.test(data.emergency_contact)) {
//     toast.error("Invalid emergency contact number");
//     return;
//   }

//   if (data.smoking_or_alcohol === "") {
//     toast.error("Please select smoking/alcohol status");
//     return;
//   }

//   if (!data.donation_type) {
//     toast.error("Please select donation type");
//     return;
//   }

//   try {
//     console.log(data);
//     const response = await registerDonor(data);
//     if (response.status === 200) {
//       toast.success("Donor Registered Successfully");
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Something went wrong");
//   }
// };

//   return (
//     <Container className="mt-4">
//       <Alert variant="success">
//         <h2>Register a Donor</h2>
//       </Alert>
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="full_name"
//                 value={formData.full_name}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Date of Birth</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Gender</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </Form.Control>
//             </Form.Group>
//           </Col>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Aadhar No.</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="id_proof"
//                 value={formData.id_proof}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Blood Group</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="blood_group"
//                 value={formData.blood_group}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Height (cm)</Form.Label>
//               <Form.Control
//                 type="number"
//                 step="0.01"
//                 name="height_cm"
//                 value={formData.height_cm}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Weight (kg)</Form.Label>
//               <Form.Control
//                 type="number"
//                 step="0.01"
//                 name="weight_kg"
//                 value={formData.weight_kg}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Known Conditions</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="known_conditions"
//                 value={formData.known_conditions}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Current Medications</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="current_medications"
//                 value={formData.current_medications}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Allergies</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="allergies"
//                 value={formData.allergies}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Smoking/Alcohol (0 - No, 1 - Yes)</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="smoking_or_alcohol"
//                 value={formData.smoking_or_alcohol}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="0">No</option>
//                 <option value="1">Yes</option>
//               </Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Organs to Donate</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="organs_to_donate"
//                 value={formData.organs_to_donate}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//           <Col lg={6}>
//             <Form.Group className="mb-3">
//               <Form.Label>Donation Type</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="donation_type"
//                 value={formData.donation_type}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="After Death">After Death</option>
//                 <option value="Living Donor">Living Donor</option>
//               </Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Form.Group className="mb-3">
//           <Form.Label>Emergency Contact</Form.Label>
//           <Form.Control
//             type="text"
//             name="emergency_contact"
//             value={formData.emergency_contact}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Button type="submit" variant="primary">
//           Register
//         </Button>
//       </Form>
//     </Container>
//   );
// }
