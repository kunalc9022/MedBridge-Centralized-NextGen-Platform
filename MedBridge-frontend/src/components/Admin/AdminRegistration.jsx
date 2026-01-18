import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminRegistration = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
    bloodGroup: "",
    specialist: "",
  });

  const [errors, setErrors] = useState({});

  const [genders, setGenders] = useState([]);
  const [bloodGroup, setBloodGroup] = useState([]);
  const [specialists, setSpecialists] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (document.URL.includes("admin")) user.role = "admin";
    else if (document.URL.includes("patient")) user.role = "patient";
    else if (document.URL.includes("doctor")) user.role = "doctor";

    axios
      .get("http://localhost:8080/api/admin/gender")
      .then((res) => setGenders(res.data.genders));

    axios
      .get("http://localhost:8080/api/patient/bloodgroup/all")
      .then((res) => setBloodGroup(res.data));

    axios
      .get("http://localhost:8080/api/doctor/specialist/all")
      .then((res) => setSpecialists(res.data));
  }, []);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactPattern = /^[1-9][0-9]{9}$/; // 10 digits, cannot start with 0
    const pincodePattern = /^[0-9]{6}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    const cityPattern = /^[A-Za-z]+$/;

    if (!user.firstName.trim()) formErrors.firstName = "First name is required";
    if (!user.lastName.trim()) formErrors.lastName = "Last name is required";
    if (!emailPattern.test(user.emailId))
      formErrors.emailId = "Invalid email format";
    if (!user.password || !passwordPattern.test(user.password) || /\s/.test(user.password))
      formErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, special character, and no spaces";
    if (!contactPattern.test(user.contact))
      formErrors.contact = "Contact must be 10 digits and cannot start with 0";
    if (!user.sex) formErrors.sex = "Gender is required";
    if (!user.bloodGroup) formErrors.bloodGroup = "Blood group is required";
    if (!user.age || user.age <= 0 || user.age > 150)
      formErrors.age = "Age must be between 1 and 150";
    if (user.pincode && !pincodePattern.test(user.pincode))
      formErrors.pincode = "Pincode must be 6 digits";
    if (!user.city.trim() || !cityPattern.test(user.city))
      formErrors.city = "City must contain only letters";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const saveUser = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    fetch("http://localhost:8080/api/admin/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((result) => {
        toast.success("Registered Successfully!", {
          position: "top-center",
          autoClose: 1500,
        });
        navigate("/admin-login", { state: { role: "admin" } });
        return result.json();
      })
      .then((res) => console.log("response", res))
      .catch((error) => console.error(error));
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-lg">
            <Card.Header className="bg-primary text-white text-center">
              <h4>
                Register as{" "}
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={saveUser}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleUserInput}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleUserInput}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="emailId"
                        value={user.emailId}
                        onChange={handleUserInput}
                        isInvalid={!!errors.emailId}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.emailId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleUserInput}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="sex"
                        value={user.sex}
                        onChange={handleUserInput}
                        isInvalid={!!errors.sex}
                      >
                        <option value="">Select Gender</option>
                        {genders.map((gender, index) => (
                          <option key={index} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.sex}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Blood Group</Form.Label>
                      <Form.Select
                        name="bloodGroup"
                        value={user.bloodGroup}
                        onChange={handleUserInput}
                        isInvalid={!!errors.bloodGroup}
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroup.map((bg, index) => (
                          <option key={index} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.bloodGroup}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact</Form.Label>
                      <Form.Control
                        type="text"
                        name="contact"
                        value={user.contact}
                        onChange={handleUserInput}
                        isInvalid={!!errors.contact}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contact}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        name="age"
                        value={user.age}
                        onChange={handleUserInput}
                        isInvalid={!!errors.age}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.age}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="street"
                        value={user.street}
                        onChange={handleUserInput}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
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
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={user.pincode}
                        onChange={handleUserInput}
                        isInvalid={!!errors.pincode}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pincode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="text-center mt-3">
                  <Button variant="primary" type="submit">
                    Register User
                  </Button>
                </div>
              </Form>
              <ToastContainer />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminRegistration;

// import { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import NavigationBar from "../Navbar/NavigationBar";
// import { useNavigate } from "react-router-dom";

// const AdminRegistration = () => {
//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     emailId: "",
//     password: "",
//     contact: "",
//     street: "",
//     city: "",
//     pincode: "",
//     role: "",
//     age: "",
//     sex: "",
//     bloodGroup: "",
//     specialist: "",
//   });

//   if (document.URL.includes("admin")) user.role = "admin";
//   else if (document.URL.includes("patient")) user.role = "patient";
//   else if (document.URL.includes("doctor")) user.role = "doctor";

//   const handleUserInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const [genders, setGenders] = useState([]);
//   const [bloodGroup, setBloodGroup] = useState([]);
//   const [specialists, setSpecialists] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/admin/gender")
//       .then((res) => setGenders(res.data.genders));
//     axios
//       .get("http://localhost:8080/api/patient/bloodgroup/all")
//       .then((res) => setBloodGroup(res.data));
//     axios
//       .get("http://localhost:8080/api/doctor/specialist/all")
//       .then((res) => setSpecialists(res.data));
//   }, []);

//   const saveUser = (e) => {
//     e.preventDefault();
//     fetch("http://localhost:8080/api/admin/register", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     })
//       .then((result) => {
//         toast.success("Registered Successfully!", {
//           position: "top-center",
//           autoClose: 1500,
//         });
//         navigate("/admin-login", { state: { role: "admin" } });
//         return result.json();
//       })
//       .then((res) => console.log("response", res))
//       .catch((error) => console.error(error));
//   };

//   return (
//     <>
//       <Container className="mt-4">
//         <Row className="justify-content-center">
//           <Col md={10}>
//             <Card className="shadow-lg">
//               <Card.Header className="bg-primary text-white text-center">
//                 <h4>
//                   Register as{" "}
//                   {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//                 </h4>
//               </Card.Header>
//               <Card.Body>
//                 <Form onSubmit={saveUser}>
//                   <Row>
//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="firstName"
//                           value={user.firstName}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="lastName"
//                           value={user.lastName}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                           type="email"
//                           name="emailId"
//                           value={user.emailId}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                           type="password"
//                           name="password"
//                           value={user.password}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Gender</Form.Label>
//                         <Form.Select
//                           name="sex"
//                           onChange={handleUserInput}
//                           required
//                         >
//                           <option value="">Select Gender</option>
//                           {genders.map((gender, index) => (
//                             <option key={index} value={gender}>
//                               {gender}
//                             </option>
//                           ))}
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Blood Group</Form.Label>
//                         <Form.Select
//                           name="bloodGroup"
//                           onChange={handleUserInput}
//                           required
//                         >
//                           <option value="">Select Blood Group</option>
//                           {bloodGroup.map((bg, index) => (
//                             <option key={index} value={bg}>
//                               {bg}
//                             </option>
//                           ))}
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Contact</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="contact"
//                           value={user.contact}
//                           onChange={handleUserInput}
//                           required
//                         />
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Age</Form.Label>
//                         <Form.Control
//                           type="number"
//                           name="age"
//                           value={user.age}
//                           onChange={handleUserInput}
//                         />
//                       </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Street</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           rows={2}
//                           name="street"
//                           value={user.street}
//                           onChange={handleUserInput}
//                         />
//                       </Form.Group>
//                     </Col>

//                     <Col md={3}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>City</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="city"
//                           value={user.city}
//                           onChange={handleUserInput}
//                         />
//                       </Form.Group>
//                     </Col>

//                     <Col md={3}>
//                       <Form.Group className="mb-3">
//                         <Form.Label>Pincode</Form.Label>
//                         <Form.Control
//                           type="text"
//                           name="pincode"
//                           value={user.pincode}
//                           onChange={handleUserInput}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <div className="text-center mt-3">
//                     <Button variant="primary" type="submit">
//                       Register User
//                     </Button>
//                   </div>
//                 </Form>
//                 <ToastContainer />
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default AdminRegistration;
