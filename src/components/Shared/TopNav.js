import React from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const TopNav = () => {
  return (
    <Navbar bg="light" expand={false}>
      <Container fluid>
        <Link to="/">
          <h4 className="text-dark text-decoration-underline">Yooda Hostel</h4>
        </Link>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Yooda Hostel
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/students">Students</NavLink>
              <NavLink to="/serve-foods">Serve Foods</NavLink>
              <NavLink to="/served">Served Foods</NavLink>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default TopNav;
