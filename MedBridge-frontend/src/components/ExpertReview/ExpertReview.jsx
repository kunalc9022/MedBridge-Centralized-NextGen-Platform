import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const expertVideos = [
  {
    title: "Kidney Care after Transplant | Dr. Shyam Bansal",
    description: "The Precision of Hand Surgery",
    img: "./../../../public/assets/YTreview/kidney.png",
    link: "https://youtu.be/M9QJxbAaiuI?si=DEGsvAK14abqU3xV",
  },
  {
    title: "Saving Lives! One Liver Transplant at a time",
    description: "India's Famous Liver & Organ Transplant Surgeon",
    img: "./../../../public/assets/YTreview/Liver.png",
    link: "https://youtu.be/aPQaKW2kGIM?si=4vlyihWz2zMai9Ye",
  },
  {
    title: "Organ Donation by Dr.Sundar Sankaran",
    description: "Cancer Complications & Breakthrough Treatments",
    img: "./../../../public/assets/YTreview/Aster.png",
    link: "https://youtu.be/I8PFxBdsXKU?si=3fB-fP8kPz-ojjjA",
  },
  {
    title: "Health Talk: The power of Organ Donatio Dr. Abhijee…",
    description: "Expert Insights from Hand Surgeon",
    img: "./../../../public/assets/YTreview/Venkat.png",
    link: "https://youtu.be/7SM1rtWmwEY?si=2pUNWSe9uNymlutK",
  },
];

const ExpertReview = () => {
  return (
    <Container className="text-center my-5">
      <h2 className="fw-bold">Watch Expert Opinions</h2>
      <p className="text-muted mb-4">
        Expert Insights on the Latest in Healthcare
      </p>
      <Row>
        {expertVideos.map((video, index) => (
          <Col md={6} lg={3} className="mb-4" key={index}>
            <a href={video.link} target="_blank">
              <Card className="h-100 shadow-sm border-0">
                <div className="position-relative">
                  <Card.Img variant="top" src={video.img} />
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <img
                      src="./../../../public/assets/YTreview/social-06-512.webp"
                      alt="Play"
                      style={{ width: "60px" }}
                    />
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="text-truncate">
                    {video.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExpertReview;
