import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  FloatingLabel,
  Tabs,
  Tab,
} from "react-bootstrap";
import NavigationBar from "../Navbar/NavigationBar";
import { useNavigate } from "react-router-dom";

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("register");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "patient",
    age: "",
    sex: "",
    bloodGroup: "",
    specialist: "",
  });

  const [errors, setErrors] = useState({});

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [genders, setGenders] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/gender").then((res) => {
      setGenders(res.data.genders || []);
    });
    axios
      .get("/api/patient/bloodgroup/all")
      .then((res) => setBloodGroups(res.data || []));
    axios
      .get("/api/doctor/specialist/all")
      .then((res) => setSpecialists(res.data || []));
  }, []);

  // ----------------------------
  // ✅ Enhanced Validations
  const validate = () => {
    const newErrors = {};

    const namePattern = /^[A-Za-z][A-Za-z\s]*$/; // Must start with letter
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    const cityPattern = /^[A-Za-z\s]+$/;
    const contactPattern = /^[6-9]\d{9}$/; // Must start with 6-9

    if (!user.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (!namePattern.test(user.firstName)) {
      newErrors.firstName =
        "First name must start with a letter and contain only alphabets.";
    }

    if (!user.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (!namePattern.test(user.lastName)) {
      newErrors.lastName =
        "Last name must start with a letter and contain only alphabets.";
    }

    if (!user.emailId.trim()) {
      newErrors.emailId = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.emailId)) {
      newErrors.emailId = "Invalid email format.";
    }

    if (!user.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordPattern.test(user.password) || /\s/.test(user.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, special character, and no spaces.";
    }

    if (!user.contact) {
      newErrors.contact = "Contact number is required.";
    } else if (!contactPattern.test(user.contact)) {
      newErrors.contact =
        "Mobile number must be 10 digits and start with 6, 7, 8, or 9.";
    }

    if (!user.sex) newErrors.sex = "Please select gender.";
    if (!user.bloodGroup) newErrors.bloodGroup = "Please select blood group.";

    if (!user.age || user.age <= 0 || user.age > 150)
      newErrors.age = "Enter valid age (1-150).";

    if (!user.city.trim() || !cityPattern.test(user.city))
      newErrors.city = "City must contain only letters.";

    if (!user.street.trim()) newErrors.street = "Street is required.";

    if (!user.pincode) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(user.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ----------------------------
  const saveUser = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("/api/patient/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      await res.json();

      toast.success("Registered Successfully!", { position: "top-center" });
      setUser({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        contact: "",
        street: "",
        city: "",
        pincode: "",
        role: "patient",
        age: "",
        sex: "",
        bloodGroup: "",
        specialist: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    }
  };

  return (
    <>
      <Container className="my-4">
        <Card className="shadow-lg">
          <Card.Header className="bg-primary text-white text-center">
            <h4>Patient Portal</h4>
          </Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-center my-4">
              <Button
                variant="outline-success"
                size="lg"
                onClick={() => {
                  navigate("/admin-login", { state: { role: "patient" } });
                }}
              >
                Already Registered? Login
              </Button>
            </div>

            <Tabs
              id="patient-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-4 justify-content-center"
            >
              <Tab eventKey="register" title="Register">
                <Form onSubmit={saveUser}>
                  <Row className="mb-3">
                    <Col md>
                      <FloatingLabel label="First Name">
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={user.firstName}
                          onChange={handleUserInput}
                          isInvalid={!!errors.firstName}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label="Last Name">
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={user.lastName}
                          onChange={handleUserInput}
                          isInvalid={!!errors.lastName}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md>
                      <FloatingLabel label="Email">
                        <Form.Control
                          type="email"
                          name="emailId"
                          value={user.emailId}
                          onChange={handleUserInput}
                          isInvalid={!!errors.emailId}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.emailId}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label="Password">
                        <Form.Control
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleUserInput}
                          isInvalid={!!errors.password}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md>
                      <FloatingLabel label="Gender">
                        <Form.Select
                          name="sex"
                          value={user.sex}
                          onChange={handleUserInput}
                          isInvalid={!!errors.sex}
                        >
                          <option value="">Select Gender</option>
                          {genders.map((g, i) => (
                            <option key={i} value={g}>
                              {g}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.sex}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label="Blood Group">
                        <Form.Select
                          name="bloodGroup"
                          value={user.bloodGroup}
                          onChange={handleUserInput}
                          isInvalid={!!errors.bloodGroup}
                        >
                          <option value="">Select Blood Group</option>
                          {bloodGroups.map((bg, i) => (
                            <option key={i} value={bg}>
                              {bg}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.bloodGroup}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md>
                      <FloatingLabel label="Contact">
                        <Form.Control
                          type="tel"
                          name="contact"
                          value={user.contact}
                          onChange={handleUserInput}
                          isInvalid={!!errors.contact}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.contact}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label="Age">
                        <Form.Control
                          type="number"
                          name="age"
                          value={user.age}
                          onChange={handleUserInput}
                          isInvalid={!!errors.age}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.age}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md>
                      <FloatingLabel label="Street">
                        <Form.Control
                          as="textarea"
                          name="street"
                          value={user.street}
                          onChange={handleUserInput}
                          isInvalid={!!errors.street}
                          style={{ height: "80px" }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.street}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel label="City">
                        <Form.Control
                          type="text"
                          name="city"
                          value={user.city}
                          onChange={handleUserInput}
                          isInvalid={!!errors.city}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.city}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md>
                      <FloatingLabel label="Pincode">
                        <Form.Control
                          type="number"
                          name="pincode"
                          value={user.pincode}
                          onChange={handleUserInput}
                          isInvalid={!!errors.pincode}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.pincode}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <div className="text-center">
                    <Button variant="success" type="submit">
                      Register
                    </Button>
                  </div>
                </Form>
              </Tab>
            </Tabs>
            <ToastContainer />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default PatientRegistration;
