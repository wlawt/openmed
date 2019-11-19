import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Actions
import { registerResearcher } from "../../actions/researcherActions";

class Researcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      study: "",
      research: "",
      university: "",
      researchFirm: "",
      creds: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    // New obj
    const newResearcher = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      study: this.state.study,
      research: this.state.research,
      university: this.state.university,
      researchFirm: this.state.researchFirm,
      creds: this.state.creds
    };

    // Submit
    this.props.registerResearcher(newResearcher);
  };

  render() {
    const {
      firstName,
      lastName,
      study,
      research,
      university,
      researchFirm,
      creds
    } = this.state;

    return (
      <Fragment>
        <h1 className="pt-5 mt-5">OpenMed</h1>
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

          <Form.Group className="pt-3">
            <Form.Label>Field of Study</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex. Biochemistry ..."
              name="study"
              value={study}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group className="pt-3">
            <Form.Label>Research Field</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex. Tissue Engineering to fight cancer cells ..."
              name="research"
              value={research}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group className="pt-3">
            <Form.Label>Academic Institute</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex. University of Toronto ..."
              name="university"
              value={university}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group className="pt-3">
            <Form.Label>Research Firm</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex. Sickkids ..."
              name="researchFirm"
              value={researchFirm}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Group className="pt-3">
            <Form.Label>Credentials</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex. BSc, MD., PhD. ..."
              name="creds"
              value={creds}
              onChange={this.onChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Fragment>
    );
  }
}

Researcher.propTypes = {
  registerResearcher: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { registerResearcher })(Researcher);
