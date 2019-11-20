import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { logoutUser, clearCurrentUser } from "../../actions/authActions";

class Header extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.clearCurrentUser();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <Fragment>
        <Nav.Link href="/researcher" className="pr-3 text-white">
          Researcher
        </Nav.Link>
        <Nav.Link href="/patient" className="pr-3 text-white">
          Patient
        </Nav.Link>
        <a href="" className="mr-5 btn btn-outline-light">
          Log Out
        </a>
      </Fragment>
    );

    const guestLinks = (
      <a
        href="/login"
        onClick={this.onLogout.bind(this)}
        className="mr-5 btn btn-outline-light"
      >
        Login
      </a>
    );

    return (
      <Fragment>
        <Navbar bg="primary" variant="dark" className="pb-3 pt-3">
          <Navbar.Brand href="/" className="pl-5">
            OpenMed
          </Navbar.Brand>
          <Nav className="ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Navbar>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentUser })(
  Header
);
