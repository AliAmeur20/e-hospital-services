import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
  return (
    <Navbar expand="md" className='subContainer'>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img alt="eHS" src="./logo.png" height="80px" className="me-2" />
          <span className="fw-semibold text-primary">eHospitalServices</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav>
            <Nav.Link as={Link} className='fw-semibold' to="/consommableMedicalDevices" active>CM Devices</Nav.Link>
            <NavDropdown  className='fw-semibold' title="Stock" id="basic-nav-dropdown" active>
              <NavDropdown.Item className='fw-semibold' as={Link} to="/stock">MD Stock</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className='fw-semibold' as={Link} to="/replishement">Replishment</NavDropdown.Item>
              <NavDropdown.Item className='fw-semibold' as={Link} to="/consumption">Consumption</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown  className='fw-semibold' title="Orders" id="basic-nav-dropdown" active>
              <NavDropdown.Item className='fw-semibold' as={Link} to="/order">Orders</NavDropdown.Item>
              <NavDropdown.Item className='fw-semibold' as={Link} to="/ReceivedOrder">Received Orders</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} className='fw-semibold' to="/inventory" active>Inventory</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
