import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  loginResearcher,
  setAccountID,
  set_pkey,
  set_type
} from "../../actions/authActions";

class RLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      private_key: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/researcher_profile");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/researcher_profile");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const loginData = {
      id: this.state.id,
      private_key: this.state.private_key
    };

    this.props.setAccountID(loginData.id);
    this.props.set_pkey(loginData.private_key);
    this.props.set_type("RESEARCHER");

    this.props.loginResearcher(loginData);
  };

  render() {
    const { id, private_key } = this.state;

    return (
      <Fragment>
        <h1 className="pt-5 mt-5">Researcher - Login</h1>

        <Form onSubmit={this.onSubmit}>
          <Form.Group className="pt-3">
            <Form.Label>Enter ID</Form.Label>
            <Form.Control
              placeholder="Ex. 1234kjngilsdh89"
              name="id"
              value={id}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group className="pt-3">
            <Form.Label>Enter Private Key</Form.Label>
            <Form.Control
              placeholder="Ex. aknvasdufh$9809gs8adfa9"
              name="private_key"
              value={private_key}
              onChange={this.onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <Link
          to="/register"
          className="lead"
          style={{ textDecoration: "none" }}
        >
          Don't have an account?
        </Link>
        <br />
        <Link to="/login" className="lead" style={{ textDecoration: "none" }}>
          Not a reseracher? Login as a patient.
        </Link>
      </Fragment>
    );
  }
}

RLogin.propTypes = {
  auth: PropTypes.object.isRequired,
  loginResearcher: PropTypes.func.isRequired,
  setAccountID: PropTypes.func.isRequired,
  set_pkey: PropTypes.func.isRequired,
  set_type: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  loginResearcher,
  setAccountID,
  set_pkey,
  set_type
})(RLogin);
