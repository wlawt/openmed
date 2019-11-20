import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import SelectList from "../common/SelectListGroup";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: ""
    };
  }

  onOptionChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.option === "Patient") {
      this.props.history.push("/patient");
    } else if (this.state.option === "Researcher") {
      this.props.history.push("/researcher");
    }
  };

  render() {
    const { option } = this.state;

    const choice = [
      { label: "Select ...", value: "" },
      { label: "Patient", value: "Patient" },
      { label: "Researcher", value: "Researcher" }
    ];

    return (
      <Fragment>
        <h1 className="pt-5 mt-5">Register for OpenMed</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group className="pt-3">
            <Form.Label>Step 1: User Type</Form.Label>
            <SelectList
              name="option"
              value={option}
              onChange={this.onOptionChange.bind(this)}
              options={choice}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>

        <Link to="/login" className="lead" style={{ textDecoration: "none" }}>
          Already have an account?
        </Link>
      </Fragment>
    );
  }
}

export default Register;
