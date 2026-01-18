import React, { useEffect, useRef } from "react";
import NavigationBar from "../Navbar/NavigationBar";
import { Button, Container, Image } from "react-bootstrap";
import "./Home.css";
import Marquee from "react-fast-marquee";

import DisplayCards from "../Displaycards/DisplayCards";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrganInfo from "../organ-Info/OrganInfo";
import Footer from "../Footer/Footer";
import ButtonCards from "../ButtonCards/ButtonCards";
import LiveOnInfo from "../LiveOnInfo/LiveOnInfo";
import ExpertReview from "../ExpertReview/ExpertReview";
import RegistrationCards from "../ButtonCards/Registration";
import { Link, useNavigate } from "react-router-dom";
import MedBridgeFooter from "../Footer/MedBridgeFooter";

const Home = () => {
  const hasShownToast = useRef(false);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!hasShownToast.current && !token) {
      hasShownToast.current = true;
      setTimeout(() => {
        toast.success(
          "Welcome to MedBridge, Hope you will find MedBridge HelpFull!"
        );
      }, 100);
    }
  }, []);

  const BookAppointment = () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (token && role === "patient") {
      navigate("/patient-dashboard");
    } else {
      navigate("/admin-login", { state: { role: "patient" } });
    }
  };

  return (
    <div className="home">
      <video
        src="/assets/homeVIdeo.mp4"
        loop
        autoPlay
        muted
        playsInline
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "100vh",
          objectFit: "cover",
        }}
      ></video>
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "2vw 4vw", // Responsive padding
          maxWidth: "90%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "12px",
          color: "white",
          fontSize: "clamp(1.2rem, 4vw, 2.5rem)", // Responsive font size
          fontWeight: "bold",
          textAlign: "center",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          background:
            "radial-gradient(circle, rgba(10, 39, 52, 1) 45%, rgba(27, 49, 49, 1) 100%)",
        }}
      >
        Welcome to MedBridge
      </div>
      <Button
        onClick={BookAppointment}
        style={{
          position: "absolute",
          top: "85%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "2vw 4vw", // Responsive padding
          maxWidth: "90%",

          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "12px",
          color: "white",
          fontSize: "clamp(1.2rem, 4vw, 2.5rem)", // Responsive font size
          fontWeight: "bold",
          textAlign: "center",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        Book Appointment
      </Button>

      <Marquee className="bg-dark text-white py-2 fs-5 mt-3" speed={100}>
        Your Journey to Wellness Starts Here, "Restore, Renew, Recover"
      </Marquee>
      <RegistrationCards></RegistrationCards>
      {/* <ButtonCards /> */}
      <OrganInfo />
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      {/* <Corosel /> */}
      <LiveOnInfo />
      <ExpertReview />
      <DisplayCards />
    </div>
  );
};

export default Home;

//  return (
//     <div className="d-flex flex-column min-vh-100 w-100">
//       {/* Hero Section */}
//       <div className="position-relative w-100" style={{ overflow: "hidden" }}>
//         <video
//           src="/assets/homeVIdeo.mp4"
//           loop
//           autoPlay
//           muted
//           playsInline
//           style={{
//             width: "100%",
//             height: "100vh",
//             objectFit: "cover",
//           }}
//         ></video>

//         {/* Overlay Heading */}
//         <div
//           className="position-absolute top-50 start-50 translate-middle text-white text-center p-4"
//           style={{
//             backgroundColor: "rgba(10, 39, 52, 0.7)",
//             borderRadius: "12px",
//             fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
//             fontWeight: "bold",
//             width: "90%",
//             maxWidth: "600px",
//           }}
//         >
//           Welcome to MedBridge
//         </div>
//         <div
//           className="position-absolute top-80 start-50 translate-middle text-white text-center p-4"
//           style={{
//             backgroundColor: "rgba(10, 39, 52, 0.7)",
//             borderRadius: "12px",
//             fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
//             fontWeight: "bold",
//             width: "90%",
//             maxWidth: "600px",
//           }}
//         >
//           <Button
//             onClick={() => navigate("/patientRegister")}
//             className="w-100 py-2 fs-5"
//             style={{
//               backgroundColor: "#1b3131",
//               border: "none",
//               borderRadius: "12px",
//             }}
//           >
//             Book Appointment
//           </Button>
//         </div>

//         {/* Book Appointment Button */}
//         <div
//           className="position-absolute top-75 start-50 translate-middle text-center"
//           style={{ width: "100%", maxWidth: "300px" }}
//         >
//           <Button
//             onClick={() => navigate("/patientRegister")}
//             className="w-100 py-2 fs-5"
//             style={{
//               backgroundColor: "#1b3131",
//               border: "none",
//               borderRadius: "12px",
//             }}
//           >
//             Book Appointment
//           </Button>
//         </div>
//       </div>

//       {/* Marquee */}
//       <Marquee className="bg-dark text-white py-2 fs-5" speed={100}>
//         Your Journey to Wellness Starts Here, "Restore, Renew, Recover"
//       </Marquee>

//       {/* Page Content */}
//       <div className="flex-grow-1">
//         <div className="container-fluid px-3 px-md-5">
//           <RegistrationCards />
//           <OrganInfo />
//           <LiveOnInfo />
//           <ExpertReview />
//           <DisplayCards />
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} />
//     </div>
//   );
