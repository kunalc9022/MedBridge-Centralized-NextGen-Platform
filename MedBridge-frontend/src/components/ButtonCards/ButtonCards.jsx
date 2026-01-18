import React from "react";
import { Card, Button } from "react-bootstrap";

const ButtonCards = () => {
  return (
    <div className="d-flex justify-content-center">
      <Card
        fluid
        className="m-3"
        border="info"
        style={{
          width: "18rem",
          backgroundColor: "orange",
        }}
      >
        <Card.Body>
          <Card.Title
            style={{ color: "white", fontSize: "2em", textAlign: "center" }}
          >
            Register As Donor?
          </Card.Title>
          <Button
            style={{
              fontSize: "2em",
              textAlign: "center",
              color: "",
              boxShadow:
                "0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)",
            }}
            variant="outline-dark"
            className="mt-3"
            href="/register"
          >
            Register Donor
          </Button>
        </Card.Body>
      </Card>
      <Card
        className="m-3"
        border="info"
        style={{
          width: "18rem",
          backgroundColor: "orange",
        }}
      >
        <Card.Body className="justify-content-center">
          <Card.Title
            style={{ color: "White", fontSize: "2em", textAlign: "center" }}
          >
            Register As Patient?
          </Card.Title>
          <Button
            style={{
              fontSize: "2em",
              textAlign: "center",
              color: "",
              boxShadow:
                "0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)",
            }}
            variant="outline-dark"
            className="mt-3"
            href="/patientRegister"
          >
            Register Patient
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ButtonCards;
