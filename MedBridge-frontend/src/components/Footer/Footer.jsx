import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBInput,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import "./Footer.css";

export default function Footer() {
  const isHomePage = location.pathname === "/" || "/about";

  return (
    <MDBFooter
      className={`text-center ${isHomePage ? "" : "footer-fixed"}`}
      color="white"
      bgColor="dark"
    >
      <MDBContainer className="p-3">
        <section className="">
          <form action="">
            <MDBRow className="d-flex justify-content-center">
              <MDBCol size="auto">
                <p className="pt-2">
                  <strong>Give your Valuable Feedback</strong>
                </p>
              </MDBCol>

              <MDBCol md="5" start>
                <MDBInput
                  contrast
                  type="textArea"
                  className="mb-4"
                  placeholder="Give feedback for our Improvement"
                />
              </MDBCol>

              <MDBCol>
                <Button>Send Feedback</Button>
              </MDBCol>
            </MDBRow>
          </form>
          <h1>Our Team</h1>
        </section>

        <section className="team">
          <MDBRow className="team">
            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">Maheshwar Bagal</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">XYZ</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
              <h5 className="text-uppercase">abc</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2025 Copyright:
        <a className="text-white" href="">
          LiveOn.com
        </a>
      </div>
    </MDBFooter>
  );
}

// import "./footer.css";

// function Footer() {
//   return (
//     <div className="containerF">
//       <div className="col_mb-3">
//         <h1>
//           <i class="ri-netease-cloud-music-fill"></i> TheJam
//         </h1>
//         <p className="text-body-secondary">© The Jam 2025</p>
//       </div>
//       <div className="col_mb-3"></div>
//       <div className="col_mb-3">
//         <h3>Useful Links</h3>
//         <ul className="nav flex-column">
//           <li className="nav-item mb-2">
//             <a href="#" className="nav-link p-0 text-body-secondary">
//               Home
//             </a>
//           </li>
//           <li className="nav-item mb-2">
//             <a href="#" className="nav-link p-0 text-body-secondary">
//               About Us
//             </a>
//           </li>
//           <li className="nav-item mb-2">
//             <a href="#" className="nav-link p-0 text-body-secondary">
//               Contact Us
//             </a>
//           </li>
//         </ul>
//       </div>
//       <div className="col_mb-3">
//         <h3>Contact Us</h3>
//         <ul className="nav flex-column">
//           <li className="nav-item mb-2">
//             <i class="ri-map-pin-fill"></i>
//             <span> CDAC Kharghar, Mumbai</span>
//           </li>
//           <li className="nav-item mb-2">
//             <i class="ri-phone-line"></i>
//             <span> 0101010101</span>
//           </li>
//           <li className="nav-item mb-2">
//             <i class="ri-mail-ai-line"></i>
//             <span> team63@gmail.com</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Footer;
