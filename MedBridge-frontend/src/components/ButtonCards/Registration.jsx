import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./registration.css";
const RegistrationCards = () => {
  const cards = [
    {
      title: "Register As Doctor?",
      buttonText: "Register Doctor",
      icon: "🫀",
      link: "/doctor/register",
      style: {
        backgroundColor: "#FFF5EB",
        borderColor: "#FFD2A6",
      },
    },
    {
      title: "Register As Admin?",
      buttonText: "Register Admin",
      icon: "🧑‍⚕️",
      link: "/admin/register",
      style: {
        backgroundColor: "#A6F0FF",
        borderColor: "#FFD2A6",
      },
    },
    {
      title: "Register As Patient?",
      buttonText: "Register Patient",
      icon: "🧑‍⚕️",
      link: "/patientRegister",
      style: {
        backgroundColor: "#FFF5EB",
        borderColor: "#A6F0FF",
      },
    },
  ];

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        {cards.map((card, idx) => (
          <Col
            key={idx}
            xs={10}
            sm={6}
            md={5}
            lg={4}
            className="d-flex justify-content-center"
          >
            <Card
              style={{
                width: "100%",
                maxWidth: "320px",
                minHeight: "200px",
                ...card.style,
                borderRadius: "16px",
                borderWidth: "1px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              className="p-3 mb-4 hover-animate"
            >
              <Card.Body className="d-flex flex-column justify-content-between h-100">
                <Card.Title
                  className="mb-4"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    textAlign: "left",
                  }}
                >
                  {card.title}
                </Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <span style={{ fontSize: "2rem" }}>{card.icon}</span>
                  <LinkContainer to={card.link}>
                    <Button className="card btn">{card.buttonText}</Button>
                  </LinkContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RegistrationCards;
