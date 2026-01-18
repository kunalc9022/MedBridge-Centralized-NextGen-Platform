import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const CardComponent = () => {
  return (
    <Container className="mt-5">
      {/* Heading */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-center text-primary">Patients Review</h2>
        </Col>
      </Row>

      {/* Cards */}
      <Row className="g-4 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100">
            <Card.Img
              style={{ height: 350, objectFit: "" }}
              variant="top"
              src="/assets/download (2).png"
            />
            <Card.Body>
              <Card.Title>Ravi Kumar</Card.Title>
              <Card.Text>
                "Thanks to LiveOn, I received a kidney transplant just in time.
                I'm living a healthy life today because of a donor's kindness."
              </Card.Text>
              <small className="text-muted">— Chennai, India</small>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <Card className="h-100">
            <Card.Img
              style={{ height: 350, objectFit: "" }}
              variant="top"
              src="/assets/card2.png"
            />
            <Card.Body>
              <Card.Title>Ritik Singh</Card.Title>
              <Card.Text>
                "I am very thankful to LiveOn, I received a liver transplant
                just in time. I'm living a healthy life today because of a
                donor's kindness."
              </Card.Text>
              <small className="text-muted">— Mumbai, India</small>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <Card className="h-100">
            <Card.Img
              style={{ height: 350, objectFit: "" }}
              variant="top"
              src="/assets/card3.png"
            />
            <Card.Body>
              <Card.Title>Sahil Rane</Card.Title>
              <Card.Text>
                "Great thanks to LiveOn, I received an eye transplant just in
                time. I'm living a healthy life today because of a donor's
                kindness."
              </Card.Text>
              <small className="text-muted">— Pune, India</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CardComponent;
