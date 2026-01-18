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
    axios.get("http://localhost:8080/api/admin/gender").then((res) => {
      setGenders(res.data.genders || []);
    });
    axios
      .get("http://localhost:8080/api/patient/bloodgroup/all")
      .then((res) => setBloodGroups(res.data || []));
    axios
      .get("http://localhost:8080/api/doctor/specialist/all")
      .then((res) => setSpecialists(res.data || []));
  }, []);

  // ----------------------------
  // ✅ Basic Validations
  const validate = () => {
    const newErrors = {};

    if (!user.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!user.lastName.trim()) newErrors.lastName = "Last name is required.";

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    const cityPattern = /^[A-Za-z]+$/;
    const contactPattern = /^[1-9][0-9]{9}$/;

    if (!user.emailId.trim()) {
      newErrors.emailId = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.emailId)) {
      newErrors.emailId = "Invalid email format.";
    }

    if (!user.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordPattern.test(user.password) || /\s/.test(user.password)) {
      newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, special character, and no spaces.";
    }

    if (!user.contact) {
      newErrors.contact = "Contact number is required.";
    } else if (!contactPattern.test(user.contact)) {
      newErrors.contact = "Contact must be 10 digits and cannot start with 0.";
    }

    if (!user.sex) newErrors.sex = "Please select gender.";
    if (!user.bloodGroup) newErrors.bloodGroup = "Please select blood group.";

    if (!user.age || user.age <= 0 || user.age > 150)
      newErrors.age = "Enter valid age (1-150).";

    if (!user.city.trim() || !cityPattern.test(user.city)) newErrors.city = "City must contain only letters.";
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
      const res = await fetch("http://localhost:8080/api/patient/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

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

// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import {
//   Form,
//   Button,
//   Card,
//   Container,
//   Row,
//   Col,
//   FloatingLabel,
//   Tabs,
//   Tab,
// } from "react-bootstrap";
// import NavigationBar from "../Navbar/NavigationBar";
// import { useNavigate } from "react-router-dom";

// const PatientRegistration = () => {
//   const navigate = useNavigate();

//   const [key, setKey] = useState("register");

//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     emailId: "",
//     password: "",
//     contact: "",
//     street: "",
//     city: "",
//     pincode: "",
//     role: "patient",
//     age: "",
//     sex: "",
//     bloodGroup: "",
//     specialist: "",
//   });

//   const handleUserInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const [genders, setGenders] = useState([]);
//   const [bloodGroups, setBloodGroups] = useState([]);
//   const [specialists, setSpecialists] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/admin/gender").then((res) => {
//       setGenders(res.data.genders || []);
//     });
//     axios
//       .get("http://localhost:8080/api/patient/bloodgroup/all")
//       .then((res) => setBloodGroups(res.data || []));
//     axios
//       .get("http://localhost:8080/api/doctor/specialist/all")
//       .then((res) => setSpecialists(res.data || []));
//   }, []);

//   const saveUser = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:8080/api/patient/register", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });
//       const data = await res.json();
//       toast.success("Registered Successfully!", { position: "top-center" });
//     } catch (error) {
//       console.error(error);
//       toast.error("Registration Failed");
//     }
//   };

//   const loginUser = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:8080/api/user/login", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           emailId: user.emailId,
//           password: user.password,
//           role: "patient",
//         }),
//       });

//       const data = await res.json();

//       if (data.jwtToken) {
//         sessionStorage.setItem("jwt-token", data.jwtToken);
//         sessionStorage.setItem("active-patient", JSON.stringify(data));
//         toast.success("Login Successful!", { position: "top-center" });
//         setTimeout(() => {
//           navigate("/patient-dashboard"); // change to your actual dashboard path
//         }, 1000);
//       } else {
//         toast.error(data.responseMessage || "Login Failed");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Login Failed");
//     }
//   };

//   return (
//     <>
//       <Container className="my-4">
//         <Card className="shadow-lg">
//           <Card.Header className="bg-primary text-white text-center">
//             <h4>Patient Portal</h4>
//           </Card.Header>
//           <Card.Body>
//             <div className="d-flex justify-content-center my-4">
//               <Button
//                 variant="outline-success"
//                 size="lg"
//                 onClick={() => {
//                   navigate("/admin-login", { state: { role: "patient" } });
//                 }}
//               >
//                 Already Registered? Login
//               </Button>
//             </div>

//             <Tabs
//               id="patient-tabs"
//               activeKey={key}
//               onSelect={(k) => setKey(k)}
//               className="mb-4 justify-content-center"
//             >
//               <Tab eventKey="register" title="Register">
//                 <Form onSubmit={saveUser}>
//                   <Row className="mb-3">
//                     <Col md>
//                       <FloatingLabel label="First Name">
//                         <Form.Control
//                           type="text"
//                           name="firstName"
//                           value={user.firstName}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </FloatingLabel>
//                     </Col>
//                     <Col md>
//                       <FloatingLabel label="Last Name">
//                         <Form.Control
//                           type="text"
//                           name="lastName"
//                           value={user.lastName}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </FloatingLabel>
//                     </Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md>
//                       <FloatingLabel label="Email">
//                         <Form.Control
//                           type="email"
//                           name="emailId"
//                           value={user.emailId}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </FloatingLabel>
//                     </Col>
//                     <Col md>
//                       <FloatingLabel label="Password">
//                         <Form.Control
//                           type="password"
//                           name="password"
//                           value={user.password}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </FloatingLabel>
//                     </Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md>
//                       <FloatingLabel label="Gender">
//                         <Form.Select
//                           name="sex"
//                           value={user.sex}
//                           onChange={handleUserInput}
//                         >
//                           <option value="">Select Gender</option>
//                           {genders.map((g, i) => (
//                             <option key={i} value={g}>
//                               {g}
//                             </option>
//                           ))}
//                         </Form.Select>
//                       </FloatingLabel>
//                     </Col>
//                     <Col md>
//                       <FloatingLabel label="Blood Group">
//                         <Form.Select
//                           name="bloodGroup"
//                           value={user.bloodGroup}
//                           onChange={handleUserInput}
//                         >
//                           <option value="">Select Blood Group</option>
//                           {bloodGroups.map((bg, i) => (
//                             <option key={i} value={bg}>
//                               {bg}
//                             </option>
//                           ))}
//                         </Form.Select>
//                       </FloatingLabel>
//                     </Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md>
//                       <FloatingLabel label="Contact">
//                         <Form.Control
//                           type="tel"
//                           name="contact"
//                           value={user.contact}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </FloatingLabel>
//                     </Col>
//                     <Col md>
//                       <FloatingLabel label="Age">
//                         <Form.Control
//                           type="number"
//                           name="age"
//                           value={user.age}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </FloatingLabel>
//                     </Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md>
//                       <FloatingLabel label="Street">
//                         <Form.Control
//                           as="textarea"
//                           name="street"
//                           value={user.street}
//                           onChange={handleUserInput}
//                           style={{ height: "80px" }}
//                         />
//                       </FloatingLabel>
//                     </Col>
//                     <Col md>
//                       <FloatingLabel label="City">
//                         <Form.Control
//                           type="text"
//                           name="city"
//                           value={user.city}
//                           onChange={handleUserInput}
//                         />
//                       </FloatingLabel>
//                     </Col>
//                   </Row>

//                   <Row className="mb-3">
//                     <Col md>
//                       <FloatingLabel label="Pincode">
//                         <Form.Control
//                           type="number"
//                           name="pincode"
//                           value={user.pincode}
//                           onChange={handleUserInput}
//                         />
//                       </FloatingLabel>
//                     </Col>
//                   </Row>

//                   <div className="text-center">
//                     <Button variant="success" type="submit">
//                       Register
//                     </Button>
//                   </div>
//                 </Form>
//               </Tab>

//               {/* <Tab eventKey="login" title="Already Registered? Login">
//                 <Form onSubmit={loginUser}>
//                   <Row className="mb-3">
//                     <Col md>
//                       <FloatingLabel label="Email">
//                         <Form.Control
//                           type="email"
//                           name="emailId"
//                           value={user.emailId}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </FloatingLabel>
//                     </Col>
//                   </Row>
//                   <Row className="mb-4">
//                     <Col md>
//                       <FloatingLabel label="Password">
//                         <Form.Control
//                           type="password"
//                           name="password"
//                           value={user.password}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </FloatingLabel>
//                     </Col>
//                   </Row>
//                   <div className="text-center">
//                     <Button variant="primary" type="submit">
//                       Login
//                     </Button>
//                   </div>
//                 </Form>
//               </Tab> */}
//             </Tabs>
//             <ToastContainer />
//           </Card.Body>
//         </Card>
//       </Container>
//     </>
//   );
// };

// export default PatientRegistration;
