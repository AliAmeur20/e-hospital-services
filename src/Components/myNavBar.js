import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
  return (
    <Navbar expand="md" className='subContainer'>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img alt='eHS'src='./logo.png' height="80px" className='me-2'/>
          <span className='fw-bold text-primary'>eHospitalServices</span>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav>
            <Nav.Link as={Link} to="/consommableMedicalDevices" active>CM Devices</Nav.Link>
            <NavDropdown title="Stock" id="basic-nav-dropdown" active>
              <NavDropdown.Item as={Link} to="/stock">MD Stock</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/replishement">Replishment</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/consumption">Consumption</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/order" active>Orders</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
