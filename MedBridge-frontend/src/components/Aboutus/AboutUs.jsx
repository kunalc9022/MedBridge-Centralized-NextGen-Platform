import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "./Aboutus.css";
import NavigationBar from "../Navbar/NavigationBar";
import Footer from "../Footer/Footer";

const teamMembers = [
  {
    name: "",
    role: "",
    image: "",
  },
  {
    name: "Maheshwar Bagal",
    role: "CDAC KHARGHAR",
    image: "./../../../public/assets/LoginPageImages/maheshvar.png",
  },
  {
    name: "",
    role: "",
    image: "",
  },
  {
    name: "",
    role: "",
    image: "",
  },
  {
    name: "",
    role: "",
    image: "",
  },
];

const AboutUs = () => {
  return (
    <div>
      <Container fluid className="py-5">
        <h2 className="text-center mb-4 about-title">
          About <span className="text-primary">MedBridge</span>
        </h2>

        <section
          className="text-center mx-auto mb-5"
          style={{ maxWidth: "100%" }}
        >
          <h3 className="mission-title">Our Mission</h3>
          <p className="mission-text">
            <strong>MedBridge</strong> was born from a vision to revolutionize
            the way we connect donors with those in urgent need. We believe that
            every second counts in saving a life, and technology should never be
            the barrier. Our mission is to empower communities with a digital
            platform that ensures transparency, security, and rapid access to
            life-saving organ donations. With compassion at our core and
            innovation in our hands, we are committed to making donation a
            seamless, humane, and impactful process — because every life
            deserves a second chance.
          </p>
        </section>

        <section className="text-center">
          <h3 className="team-title">Meet Our Team</h3>
          <Row className="justify-content-center">
            {teamMembers.map((member, idx) => (
              <Col
                md={4}
                sm={6}
                xs={12}
                key={idx}
                className="mb-4 d-flex justify-content-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card
                    className="team-card shadow-lg"
                    style={{ width: "18rem", minHeight: "320px" }}
                  >
                    <Card.Img variant="top" src={member.image} />
                    <Card.Body>
                      <Card.Title>{member.name}</Card.Title>
                      <Card.Text>{member.role}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </section>

        <footer className="feedback-section text-center py-5">
          <h3 className="feedback-title">Feedback</h3>
          <form>
            <textarea
              className="feedback-textarea"
              placeholder="Share your feedback here..."
              rows="4"
            />
            <br />
            <button type="submit" className="btn btn-primary mt-3">
              Submit Feedback
            </button>
          </form>
        </footer>
      </Container>
    </div>
  );
};

export default AboutUs;
