import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const MedBridgeFooter = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-5">
      <Container>
        <Row className="mb-4">
          <Col md={4}>
            <h5 className="mb-3">MedBridge</h5>
            <p>
              MedBridge connects patients with expert doctors and healthcare
              services. We ensure trusted, timely, and transparent care across
              India.
            </p>
          </Col>

          <Col md={4}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-white text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-white text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h5 className="mb-3">Connect with Us</h5>
            <p>Email: support@medbridge.com</p>
            <p>Phone: +91 98765 43210</p>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-white">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-white">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-white">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-white">
                <FaLinkedin />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="border-top border-light" />
        <p className="text-center mb-0">
          © {new Date().getFullYear()} MedBridge. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default MedBridgeFooter;
