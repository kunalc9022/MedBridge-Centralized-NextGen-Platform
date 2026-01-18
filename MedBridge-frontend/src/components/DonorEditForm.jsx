import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { fetchAllDetailsDonors,UpdateDonor } from "../services/DonorService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "./Navbar/NavigationBar";
import Footer from "./Footer/Footer";
export function DonorEditForm() {

    const params = useParams();
    const navigate = useNavigate();
    console.log(params.id);

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
    const getDonorData = async () => {
        try {
            const response = await fetchAllDetailsDonors(params.id);
            setFormData(response.data);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong...!');
        }
        
    }

    useEffect(()=>{
        getDonorData();
    },[]);

    const handleChange = (event) => {
        setFormData({...formData,[event.target.name]:event.target.value});
    }

    const handleSubmit = async (event) => {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const heightRegex = /^(?:[3-9][0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/;
  const weightRegex = /^(?:[2-9][0-9]|1[0-9]{2}|2[0-9]{2}|300)$/;
  const bloodGroupRegex = /^(A|B|AB|O)[+-]$/;
  const aadhaarRegex = /^(?!0{8})\d{12}$/;
const today = new Date();
  const dobDate = new Date(data.dob);
  today.setHours(0, 0, 0, 0); // Strip time for accurate comparison
  dobDate.setHours(0, 0, 0, 0);

  if (!data.dob || dobDate >= today) {
    toast.error("Date of birth must be a valid past date");
    return;
  }
  const data = {
    ...formData,
    full_name: formData.full_name.trim(),
    email: formData.email.trim(),
    blood_group: formData.blood_group.trim().toUpperCase(),
    id_proof: formData.id_proof.trim(),
  };

  if (!nameRegex.test(data.full_name)) {
    event.preventDefault(); 
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
            
            console.log(formData);
            const response = await UpdateDonor(params.id,formData);
            if(response.status===200){
                navigate("/donor-list");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        
    }

    return (
      <div>
      <NavigationBar />
        <Container className="mt-4">
            <Alert variant="success">
                <h2>Edit a student</h2>
            </Alert>
            <Container className="mt-3">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Id</Form.Label>
                                <Form.Control type="text" value={formData.id} placeholder="Enter Id" name="id" onChange={handleChange} disabled />
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={formData.name} placeholder="Enter Name" name="name" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Marks</Form.Label>
                                <Form.Control type="text" value={formData.marks} placeholder="Enter Marks" name="marks" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col lg={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" value={formData.phone} placeholder="Enter Phone" name="phone" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            </Container>
        </Container>
              <Footer />
    </div>
    )
}