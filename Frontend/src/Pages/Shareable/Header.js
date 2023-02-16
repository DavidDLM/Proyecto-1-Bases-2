import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import { COUNTER_CONTEXT } from "../../App";
import "./Header.css";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(COUNTER_CONTEXT);

  return (
    <div>
      <Navbar className="custom-nav" fixed="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={HashLink} to="/">
            <div className="d-flex align-items-center justify-content-center">
              <div className="logo-div"></div>
              <h4 className="brand-name">UTube</h4>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end bg-light"
          >
            <Nav.Link className="text-center nav-btn" as={HashLink} to="/">
              Home
            </Nav.Link>
            {userInfo.role === "admin" ? (
              <Nav.Link
                className="text-center nav-btn"
                as={HashLink}
                to="/addDocument"
              >
                Add Document
              </Nav.Link>
            ) : (
              ""
            )}
            {userInfo.email ? (
              <Nav.Link className="text-center nav-btn" as={HashLink} to="/">
                {userInfo.name}
              </Nav.Link>
            ) : (
              <Nav.Link
                className="text-center nav-btn"
                as={HashLink}
                to="/login"
              >
                Login
              </Nav.Link>
            )}
            {userInfo.email ? (
              <Nav.Link
                className="text-center nav-btn"
                as={HashLink}
                to="/"
                onClick={() => {
                  setUserInfo({});
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link
                className="text-center nav-btn"
                as={HashLink}
                to="/register"
              >
                Register
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
