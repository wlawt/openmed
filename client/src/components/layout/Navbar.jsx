import React, { Component, Fragment } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

class Header extends Component {
  render() {
    return (
      <Fragment>
        <Navbar bg="primary" variant="dark" className="pb-3 pt-3">
          <Navbar.Brand href="/" className="pl-5">
            OpenMed
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/researcher" className="pr-3 text-white">
              Researcher
            </Nav.Link>
            <Nav.Link href="/patient" className="pr-3 text-white">
              Patient
            </Nav.Link>
            <a href="" className="mr-5 btn btn-outline-light">
              Log Out
            </a>
          </Nav>
        </Navbar>
      </Fragment>
    );
  }
}

export default Header;
