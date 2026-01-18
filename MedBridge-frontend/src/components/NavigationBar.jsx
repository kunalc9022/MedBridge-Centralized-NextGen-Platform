import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export function NavigationBar() {
    return (
        <Navbar></Navbar>
        // <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        //     <Container>
        //         <Navbar.Brand href="#home">LiveOn</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="me-auto">
        //                 <LinkContainer to="/">
        //                     <Nav.Link>Home</Nav.Link>
        //                 </LinkContainer>

        //                 <LinkContainer to="/register-patient">
        //                     <Nav.Link>Register Patient</Nav.Link>
        //                 </LinkContainer>
        //                 <LinkContainer to="/register-donor">
        //                     <Nav.Link>Register Donor</Nav.Link>
        //                 </LinkContainer>
        //                 <LinkContainer to="/donor-list/:organ">
        //                     <Nav.Link>Donor List</Nav.Link>
        //                 </LinkContainer>
        //                 <LinkContainer to="/patient-list/:organ">
        //                     <Nav.Link>Patient List</Nav.Link>
        //                 </LinkContainer>

        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
    )
}