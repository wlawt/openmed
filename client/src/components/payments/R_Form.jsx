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
      publication: this.state.publication,
      institution: this.state.institution,
      pid: "5dd4bc43064a3a29e4887bb8",
      pkey: "Dy8SP9LJAZcbfmQ3yi76ofhTagVvBuDz4swU5up5LxWm",
      rid: this.props.auth.accId,
      rkey: this.props.auth.acc_pkey
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
  addPublication: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // TODO: add researcher + patient state
  auth: state.auth
});

export default connect(mapStateToProps, { addPublication })(R_Form);
