import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Wallet extends Component {
  render() {
    const { accId, acc_pkey, type } = this.props.auth;

    console.log(type);

    return (
      <Fragment>
        <h1 className="mt-5 pt-5">Wallet</h1>

        {type === "RESEARCHER" ? (
          <Fragment>
            <p className="lead">{type} Wallet</p>
            <p className="lead">ID: {accId}</p>
            <p className="lead">Private Key: {acc_pkey}</p>
          </Fragment>
        ) : (
          <Fragment>
            <p className="lead">{type} Wallet</p>
            <p className="lead">ID: {accId}</p>
            <p className="lead">Private Key: {acc_pkey}</p>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Wallet.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Wallet);
