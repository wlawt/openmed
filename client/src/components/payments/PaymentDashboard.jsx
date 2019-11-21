import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPayments } from "../../actions/paymentActions";

import Table from "react-bootstrap/Table";

class PaymentDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getPayments();
  }

  render() {
    const { payments } = this.props.dashboard;
    let paymentDashboard;

    if (payments === null) {
      paymentDashboard = <h1>Empty!</h1>;
    } else {
      if (payments.length > 0) {
        paymentDashboard = payments.map(payment => (
          <tr key={payment}>
            <td>2019/11/19</td>
            <td>{payment._id}</td>
            <td>{payment.asset_id}</td>
            <td>{payment.p_public_key}</td>
            <td>{payment.r_public_key}</td>
            <td>{payment.fulfillment}</td>
          </tr>
        ));
      } else {
        paymentDashboard = <h4>No payments!</h4>;
      }
    }

    return (
      <Fragment>
        <h1 className="pt-5 mt-5">Payment Dashboard</h1>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">ID</th>
              <th scope="col">Asset ID</th>
              <th scope="col">Patient Public Key</th>
              <th scope="col">Researcher Public Key</th>
              <th scope="col">Fulfillment ID</th>
            </tr>
          </thead>
          <tbody>{paymentDashboard}</tbody>
        </Table>
      </Fragment>
    );
  }
}

PaymentDashboard.propTypes = {
  getPayments: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dashboard: state.dashboard,
  auth: state.auth
});

export default connect(mapStateToProps, { getPayments })(PaymentDashboard);
