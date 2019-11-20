import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { addPublication } from "../../actions/paymentActions";

class R_Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publication: "",
      institution: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const publicationData = {
      // r_key
      // p_key
      publication: this.state.publication,
      institution: this.state.institution
    };

    this.props.addPublication(publicationData, this.props.history);
  };

  render() {
    const { publication, institution } = this.state;

    return (
      <Fragment>
        <h1 className="pt-5 mt-5">Submit Publication</h1>

        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col>
              <Form.Label>Publication Title</Form.Label>
              <Form.Control
                placeholder="Ex. Curing Cancer using Stem Cells..."
                name="publication"
                value={publication}
                onChange={this.onChange}
              />
            </Col>
            <Col>
              <Form.Label>Institution</Form.Label>
              <Form.Control
                placeholder="Ex. University of Toronto"
                name="institution"
                value={institution}
                onChange={this.onChange}
              />
            </Col>
          </Row>

          <Button className="mt-3" variant="primary" type="submit">
            Add Publication
          </Button>
        </Form>
      </Fragment>
    );
  }
}

R_Form.propTypes = {
  addPublication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // TODO: add researcher + patient state
});

export default connect(mapStateToProps, { addPublication })(R_Form);
