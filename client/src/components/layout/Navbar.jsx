import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import head from "../img/headlogo.png";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import { logoutUser, clearCurrentUser } from "../../actions/authActions";

class Header extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.clearCurrentUser();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, type } = this.props.auth;
    const authLinks = (
      <Fragment>
        {type === "RESEARCHER" ? (
          <Fragment>
            {/*             <Nav.Link href="/payment_dashboard" className="pr-3 text-white">
              Payment Dashboard
            </Nav.Link>

            <Nav.Link href="/add_publication" className="pr-3 text-white">
              Add Publication
            </Nav.Link>

            <Nav.Link href="/wallet" className="pr-3 text-white">
              Wallet
            </Nav.Link> */}
            <Link to="/profile" className="pr-3 pt-2 text-white">
              Researcher
            </Link>
            <Link
              href="#"
              onClick={this.onLogout.bind(this)}
              className="mr-5 btn btn-outline-light"
            >
              Log Out
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            {/*             <Nav.Link href="/payment_dashboard" className="pr-3 text-white">
              Payment Dashboard
            </Nav.Link>

            <Nav.Link href="/wallet" className="pr-3 text-white">
              Wallet
            </Nav.Link> */}
            {/*             <Link to="/profile" className="pr-3 pt-2 text-white">
              Patient
            </Link> */}

            <NavDropdown
              title={`Hello, ${this.props.auth.user.firstName}`}
              id="basic-nav-dropdown"
              className="pr-5 ml-5 text-white"
            >
              <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#action/3.4"
                onClick={this.onLogout.bind(this)}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Fragment>
        )}
      </Fragment>
    );

    const guestLinks = (
      <Link to="/login" className="mr-5 btn btn-outline-light">
        Login
      </Link>
    );

    return (
      <Fragment>
        <Navbar variant="dark" className="pb-3 pt-3 grad">
          <Navbar.Brand href="/" className="pl-5 ml-5">
            <img
              src={head}
              width="150"
              height="150"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav className="ml-auto">
            {/* <Link to="/publication" className="pr-3 text-white">
              Publications
            </Link> */}
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Navbar>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func,
  clearCurrentUser: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentUser })(
  Header
);
