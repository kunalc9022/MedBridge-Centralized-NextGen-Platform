import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const LiveOnInfo = () => {
  const stats = [
    { icon: "🏥", value: "11", label: "Hospitals Across Maharashtra" },
    { icon: "🧪", value: "50+", label: "Lab Collection Centres" },
    { icon: "👨‍⚕️", value: "2500+", label: "Clinicians" },
    { icon: "🎖️", value: "30+", label: "Years Of Experience" },
  ];

  return (
    <Container className="my-5 p-4 bg-light rounded">
      <Row>
        <Col md={6}>
          <h3 className="mb-3">Why Choose MedBridge?</h3>
          <p>
            Health Buddy is a pioneering organ donation platform committed to
            saving lives by connecting donors and recipients through a seamless,
            compassionate, and secure process. Established with the vision of
            promoting awareness and accessibility for organ donation across
            India, LiveOn has rapidly expanded its outreach. With a dedicated
            network of hospitals, volunteers, and medical experts, LiveOn
            ensures ethical, transparent, and timely organ transplants. Our
            growing presence across key regions is a testament to our mission of
            giving the gift of life — one donor at a time.
          </p>
          <Row className="mt-4">
            {stats.map((stat, index) => (
              <Col xs={6} className="mb-3" key={index}>
                <Card className="text-center shadow-sm h-100">
                  <Card.Body>
                    <div style={{ fontSize: "1.5rem" }}>{stat.icon}</div>
                    <h5 className="text-primary mt-2">{stat.value}</h5>
                    <p className="mb-0">{stat.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <img
            src="../../../public/assets/LoginPageImages/MedBridge Hospital and Surroundings.png"
            alt="MedBridge Hospital"
            className="img-fluid rounded shadow-sm"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LiveOnInfo;
