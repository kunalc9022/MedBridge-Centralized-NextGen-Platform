import React from "react";
import { Carousel, Container } from "react-bootstrap";
const Corosel = () => {
  return (
    <div>
      <Container className="mt-5 w-100">
        <Carousel className="carousel-custom w-100" interval={3000}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/assets/doctor.png"
              alt="Doctor"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/assets/hostipal.png"
              alt="Hospital"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/assets/img4.png"
              alt="Image 4"
            />
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default Corosel;
