import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  FloatingLabel,
} from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorRegister = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "doctor",
    age: "",
    sex: "",
    specialist: "",
    experience: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [genders, setGenders] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:8080/api/admin/gender");
    return response.data;
  };

  const retrieveAllSpecialist = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/doctor/specialist/all"
    );
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const allGenders = await retrieveAllGenders();
      const allSpecialists = await retrieveAllSpecialist();
      if (allGenders) setGenders(allGenders.genders);
      if (allSpecialists) setSpecialists(allSpecialists);
    };
    fetchData();
  }, []);

 const validateForm = () => {
  const nameRegex = /^[A-Za-z][A-Za-z\s]*$/; // Must start with letter
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/; // Must start 6-9
  const pincodeRegex = /^[0-9]{6}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const cityRegex = /^[A-Za-z\s]+$/;

  // Name validation
  if (!user.firstName.trim() || !nameRegex.test(user.firstName)) {
    toast.error("First name must start with a letter and contain only alphabets");
    return false;
  }
  if (!user.lastName.trim() || !nameRegex.test(user.lastName)) {
    toast.error("Last name must start with a letter and contain only alphabets");
    return false;
  }

  if (!emailRegex.test(user.emailId)) {
    toast.error("Invalid email format");
    return false;
  }

  if (
    !user.password ||
    !passwordRegex.test(user.password) ||
    /\s/.test(user.password)
  ) {
    toast.error(
      "Password must be at least 8 characters, include uppercase, lowercase, number, special character, and no spaces"
    );
    return false;
  }

  if (!phoneRegex.test(user.contact)) {
    toast.error("Contact must be 10 digits and start with 6, 7, 8, or 9");
    return false;
  }

  if (!user.city.trim() || !cityRegex.test(user.city)) {
    toast.error("City must contain only letters");
    return false;
  }

  // Age validation (28 to 100)
  if (!user.age || user.age < 28 || user.age > 100) {
    toast.error("Doctor age must be between 28 and 100");
    return false;
  }

  if (!user.sex) {
    toast.error("Please select a gender");
    return false;
  }

  if (!user.specialist) {
    toast.error("Please select a specialist field");
    return false;
  }

  if (!pincodeRegex.test(user.pincode)) {
    toast.error("Invalid pincode");
    return false;
  }

  // Experience validation
  if (!user.experience || user.experience < 0) {
    toast.error("Experience is required");
    return false;
  }

  if (user.experience > user.age - 28) {
    toast.error("Experience not valid");
    return false;
  }

  // Image validation
  if (!selectedImage) {
    toast.error("Profile image is required");
    return false;
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(selectedImage.type)) {
    toast.error("Only JPG, JPEG, or PNG images are allowed");
    return false;
  }

  if (selectedImage.size > 2 * 1024 * 1024) {
    toast.error("Image size must be less than 2MB");
    return false;
  }

  return true;
};


  const saveUser = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append(
      "doctor",
      new Blob([JSON.stringify(user)], { type: "application/json" })
    );
    formData.append("image", selectedImage);

    axios
      .post("http://localhost:8080/api/doctor/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Doctor Registered Successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/admin-login", { state: { role: "doctor" } });
      })
      .catch(() => {
        toast.error("Registration failed. Try again.");
      });
  };

  return (
    <div className="py-5" style={{ backgroundColor: "#f4f8fb" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow rounded-4">
              <Card.Header className="bg-primary text-white text-center rounded-top-4">
                <h4 className="mb-0">Doctor Registration</h4>
              </Card.Header>
              <div className="d-flex justify-content-center mb-3 mt-4">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() =>
                    navigate("/admin-login", { state: { role: "doctor" } })
                  }
                >
                  Already Registered? Login
                </Button>
              </div>
              <Card.Body className="p-4">
                <Form className="row g-3" onSubmit={saveUser}>
                  {[
                    { label: "First Name", name: "firstName" },
                    { label: "Last Name", name: "lastName" },
                    { label: "Email ID", name: "emailId", type: "email" },
                    { label: "Password", name: "password", type: "password" },
                    { label: "Contact No", name: "contact", type: "number" },
                    { label: "Age", name: "age", type: "number" },
                    {
                      label: "Experience (years)",
                      name: "experience",
                      type: "number",
                    },
                    { label: "City", name: "city" },
                    { label: "Pincode", name: "pincode", type: "number" },
                  ].map(({ label, name, type = "text" }) => (
                    <Col md={6} key={name}>
                      <FloatingLabel label={label}>
                        <Form.Control
                          type={type}
                          name={name}
                          value={user[name]}
                          onChange={handleUserInput}
                          placeholder={label}
                        />
                      </FloatingLabel>
                    </Col>
                  ))}

                  <Col md={6}>
                    <FloatingLabel label="Gender">
                      <Form.Select name="sex" onChange={handleUserInput}>
                        <option value="">Select Gender</option>
                        {genders.map((gender, idx) => (
                          <option key={idx} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>

                  <Col md={6}>
                    <FloatingLabel label="Specialist">
                      <Form.Select name="specialist" onChange={handleUserInput}>
                        <option value="">Select Specialist</option>
                        {specialists.map((s, idx) => (
                          <option key={idx} value={s}>
                            {s}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>

                  <Col md={6}>
                    <FloatingLabel label="Street Address">
                      <Form.Control
                        as="textarea"
                        name="street"
                        value={user.street}
                        onChange={handleUserInput}
                        style={{ height: "70px" }}
                        placeholder="Street"
                      />
                    </FloatingLabel>
                  </Col>

                  <Col md={12}>
                    <Form.Label>
                      <b>Upload Profile Image</b>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                  </Col>

                  <Col md={12} className="text-center mt-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="px-4"
                    >
                      Register Doctor
                    </Button>
                  </Col>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default DoctorRegister;

