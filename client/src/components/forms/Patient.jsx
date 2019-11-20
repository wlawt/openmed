import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Actions
import { registerPatient } from "../../actions/patientActions";

class Patient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      country: "",
      doctor: "",
      description: "",
      results: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newPatient = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      doctor: this.state.doctor,
      description: this.state.description,
      results: this.state.results
    };

    this.props.registerPatient(newPatient, this.props.history);
  };

  render() {
    const {
      firstName,
      lastName,
      city,
      state,
      country,
      doctor,
      description,
      results
    } = this.state;

    return (
      <Fragment>
        <h1 className="pt-5 mt-5">OpenMed Patient</h1>
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="Steve"
                name="firstName"
                value={firstName}
                onChange={this.onChange}
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="John"
                name="lastName"
                value={lastName}
                onChange={this.onChange}
              />
            </Col>
          </Row>

          <Row className="pt-4">
            <Col>
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder="Toronto"
                name="city"
                value={city}
                onChange={this.onChange}
              />
            </Col>
            <Col>
              <Form.Label>State</Form.Label>
              <Form.Control
                placeholder="Ontario"
                name="state"
                value={state}
                onChange={this.onChange}
              />
            </Col>
            <Col>
              <Form.Label>Country</Form.Label>
              <Form.Control
                placeholder="Canada"
                name="country"
                value={country}
                onChange={this.onChange}
              />
            </Col>
          </Row>

          <Row className="pt-4">
            <Col>
              <Form.Label>Doctor/Hospital</Form.Label>
              <Form.Control
                placeholder="Ex. Toronto Western Hospital"
                name="doctor"
                value={doctor}
                onChange={this.onChange}
              />
            </Col>
            <Col>
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="General examination of patient (procedure)"
                name="description"
                value={description}
                onChange={this.onChange}
              />
            </Col>
            <Col>
              <Form.Label>Results</Form.Label>
              <Form.Control
                placeholder="Hydrochlorothiazide 12.5 MG"
                name="results"
                value={results}
                onChange={this.onChange}
              />
            </Col>
          </Row>

          <Button className="mt-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Fragment>
    );
  }
}

Patient.propTypes = {
  registerPatient: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { registerPatient })(Patient);
