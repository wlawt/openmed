import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPatients } from "../../actions/dashboardActions";

import Table from "react-bootstrap/Table";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getPatients();
  }

  render() {
    const { patients } = this.props.dashboard;
    let patientDashboard;

    if (patients === null) {
      patientDashboard = <h1>Empty!</h1>;
    } else {
      if (patients.length > 0) {
        patientDashboard = patients.map(patient => (
          <tr key={patient}>
            <td>2019/11/19</td>
            <td>{patient.id}</td>
            <td>{patient.firstName}</td>
            <td>{patient.lastName}</td>
            <td>{patient.city}</td>
            <td>{patient.state}</td>
            <td>{patient.country}</td>
            <td>{patient.public_key}</td>
            <td>{patient.fulfillment}</td>
          </tr>
        ));
      } else {
        patientDashboard = <h4>No patients!</h4>;
      }
    }

    return (
      <Fragment>
        <h1 className="pt-5 mt-5">Dashboard</h1>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Country</th>
              <th scope="col">Public Key</th>
              <th scope="col">Fulfillment</th>
            </tr>
          </thead>
          <tbody>{patientDashboard}</tbody>
        </Table>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  getPatients: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

export default connect(mapStateToProps, { getPatients })(Dashboard);
