import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Container, Nav } from "react-bootstrap";

export default props => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Frog game</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>Profile</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}