import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Helpers
import SelectList from "../common/SelectListGroup";

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

  onUniChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onResearchChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCredChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
    this.props.registerResearcher(newResearcher, this.props.history);
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

    const uni = [
      { label: "Ex. University of Toronto", value: "" },
      { label: "Algoma University", value: "Algoma University" },
      { label: "Brock University", value: "Brock University" },
      { label: "Carleton University", value: "Carleton University" },
      { label: "University of Guelph", value: "University of Guelph" },
      { label: "Lakehead University", value: "Lakehead University" },
      { label: "Laurentian University", value: "Laurentian University" },
      { label: "McMaster University", value: "McMaster University" },
      { label: "Nipissing University", value: "Nipissing University" },
      { label: "OCAD University", value: "OCAD University" },
      { label: "Ontario Tech University", value: "Ontario Tech University" },
      { label: "University of Ottawa", value: "University of Ottawa" },
      { label: "Queen's University", value: "Queen's University" },
      { label: "Ryerson University", value: "Ryerson University" },
      { label: "University of Toronto", value: "University of Toronto" },
      { label: "Trent University", value: "Trent University" },
      { label: "University of Waterloo", value: "University of Waterloo" },
      { label: "Western University", value: "Western University" },
      {
        label: "Wilfrid Laurier University",
        value: "Wilfrid Laurier University"
      },
      { label: "University of Windsor", value: "University of Windsor" },
      { label: "York University", value: "York University" }
    ];

    const med = [
      { label: "Ex. Mount Sinai Hospital", value: "" },
      { label: "Toronto Western Hospital", value: "Toronto Western Hospital" },
      { label: "Toronto General Hospital", value: "Toronto General Hospital" },
      {
        label: "St. Joseph's Health Ceneter",
        value: "St. Joseph's Health Ceneter"
      },
      { label: "Mount Sinai Hospital", value: "Mount Sinai Hospital" },
      {
        label: "The Hospital for Sick Children",
        value: "The Hospital for Sick Children"
      },
      {
        label: "Princess Margaret Hospital",
        value: "Princess Margaret Hospital"
      },
      {
        label: "CAMH - College Street Site",
        value: "CAMH - College Street Site"
      }
    ];

    const degree = [
      { label: "Highest level of education", value: "" },
      { label: "Bachelor Degree", value: "Bachelor Degree" },
      { label: "Master's Degree", value: "Master's Degree" },
      {
        label: "Doctor of Philosophy (PhD)",
        value: "Doctor of Philosophy (PhD)"
      },
      { label: "Doctor of Medicine (MD)", value: "Doctor of Medicine (MD)" }
    ];

    return (
      <Fragment>
        <h1 className="pt-5 mt-5">OpenMed Researcher</h1>
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
            <SelectList
              name="university"
              value={university}
              onChange={this.onUniChange.bind(this)}
              options={uni}
            />
          </Form.Group>

          <Form.Group className="pt-3">
            <Form.Label>Research Firm</Form.Label>

            <SelectList
              name="researchFirm"
              value={researchFirm}
              onChange={this.onResearchChange.bind(this)}
              options={med}
            />
          </Form.Group>

          <Form.Group className="pt-3">
            <Form.Label>Credentials</Form.Label>
            <SelectList
              name="creds"
              value={creds}
              onChange={this.onCredChange.bind(this)}
              options={degree}
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
