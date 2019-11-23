import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

import pfp from "../img/pfp.png";
import add from "../img/add.png";
import wallet from "../img/wallet.png";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { getPatients, downloadFile } from "../../actions/dashboardActions";

import Table from "react-bootstrap/Table";

class RProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDash: false,
      showPub: false,
      showWallet: false,
      showProfile: false
    };
  }

  componentDidMount() {
    this.props.getPatients();
  }

  onDownload = () => {
    this.props.downloadFile();
  };

  onShowID = () => {
    this.setState({ showID: !this.state.showID });
  };

  onShowPublic = () => {
    this.setState({ showPublic: !this.state.showPublic });
  };

  onShowPrivate = () => {
    this.setState({ showPrivate: !this.state.showPrivate });
  };

  onDash = () => {
    this.setState({ showDash: !this.state.showDash });
    this.setState({ showProfile: false });
    this.setState({ showWallet: false });
    this.setState({ showPub: false });
  };

  onWallet = () => {
    this.setState({ showWallet: !this.state.showWallet });
    this.setState({ showProfile: false });
    this.setState({ showPub: false });
    this.setState({ showDash: false });
  };

  onProfile = () => {
    this.setState({ showProfile: !this.state.showProfile });
    this.setState({ showPub: false });
    this.setState({ showWallet: false });
    this.setState({ showDash: false });
  };

  onPub = () => {
    this.setState({ showPub: !this.state.showPub });
    this.setState({ showProfile: false });
    this.setState({ showWallet: false });
    this.setState({ showDash: false });
  };

  render() {
    const { auth } = this.props;
    const { patients } = this.props.dashboard;
    let patientDashboard;

    if (patients === null) {
      patientDashboard = <h1>Empty!</h1>;
    } else {
      if (patients.length > 0) {
        patientDashboard = patients.map(patient => (
          <tr key={patient}>
            <td>2019/11/19</td>
            <td className={patient.id === auth.user.id ? "text-success" : ""}>
              {patient.id}
            </td>
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

    let showpub;
    if (this.state.showPub) {
      showpub = (
        <Fragment>
          <div className="mt-5 uk-card uk-card-default uk-card-body uk-animation-slide-right-small">
            <h1 className="text-center">Coming Soon!</h1>
          </div>
        </Fragment>
      );
    }

    let showdash;
    if (this.state.showDash) {
      showdash = (
        <Fragment>
          <div className="mt-5 uk-card uk-card-default uk-card-body uk-animation-slide-right-small">
            <div className="d-flex">
              <div className="mr-auto">
                <h3 className="font-weight-bold">Patient Database</h3>
              </div>
              <div>
                <h3>
                  <a
                    href="./patient.csv"
                    download
                    onClick={this.onDownload.bind(this)}
                    style={{ textDecoration: "none" }}
                  >
                    <i class="fas fa-download textgrad" />
                  </a>
                </h3>
              </div>
            </div>

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
          </div>
        </Fragment>
      );
    } else {
      showdash = <Fragment></Fragment>;
    }

    let showwallet;
    if (this.state.showWallet) {
      showwallet = (
        <Fragment>
          <div className="uk-animation-slide-right-small">
            {" "}
            <Row>
              <Col xs={6} md={4}>
                <div className="mt-4 uk-card uk-card-default uk-card-body">
                  <p
                    className="text-muted text-center fontcolor"
                    style={{ marginBottom: 0, paddingBottom: 0 }}
                  >
                    YOUR CURRENT BALANCE:
                  </p>
                  <h1
                    className="text-center fontcolor"
                    style={{ marginTop: 0, paddingTop: 0 }}
                  >
                    $2789.15
                  </h1>
                  <hr className="text-center" />
                  <p className="text-muted text-center fontcolor">
                    <i class="fas fa-exchange-alt" /> RECENT TRANSACTIONS
                  </p>
                  <p className="lead">
                    <i class="fas fa-location-arrow text-danger"></i> $100.00 to
                    a2433ebcdc05e9798583e
                  </p>
                  <p className="lead">
                    <i class="fas fa-location-arrow text-danger"></i> $245.10 to
                    e9798583e725cf16b29f1
                  </p>
                  <p className="lead">
                    <i class="fas fa-location-arrow text-danger"></i> $352.25 to
                    e2eb3d50839ec2d507bas
                  </p>
                  <p className="lead">
                    <i class="fas fa-location-arrow text-danger"></i> $425.12 to
                    cdc05e9798583e725cfwe
                  </p>
                  <hr className="text-center" />
                  <div className="text-center">
                    <Button className="grad" block>
                      VIEW ALL TRANSACTIONS
                    </Button>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={8} className="d-flex justify-content-center">
                <Image
                  src={wallet}
                  style={{ display: "inline", float: "none" }}
                  width="80%"
                  height="80%"
                />
              </Col>
            </Row>
          </div>
        </Fragment>
      );
    }

    let showprofile;
    if (this.state.showProfile) {
      showprofile = (
        <Fragment>
          <div className="mt-4 uk-animation-slide-right-small">
            <div
              className="d-flex border uk-card uk-card-default uk-card-body"
              id="wrapper"
              style={{ height: 600 }}
            >
              <div
                class="bg-white"
                id="sidebar-wrapper"
                style={{ height: 200 }}
              >
                <div class="sidebar-heading">My Profile </div>
                <div class="list-group list-group-flush">
                  <a
                    href="#"
                    class="list-group-item list-group-item-action bg-white"
                  >
                    Security
                  </a>
                  <a
                    href="#"
                    class="list-group-item list-group-item-action bg-white"
                  >
                    Payment Methods
                  </a>
                </div>
              </div>
              <div id="page-content-wrapper border">
                <div className="container-fluid ">
                  <Row>
                    <Col xs={6} md={4}>
                      <Image src={pfp} roundedCircle />
                    </Col>
                    <Col xs={12} md={8}>
                      <h4 className="font-weight-bold pt-4 mt-4">
                        Greetings, {auth.user.firstName}!
                      </h4>

                      <p className="lead">
                        Account ID:{" "}
                        <Link to="#" onClick={this.onShowID.bind(this)}>
                          asdf
                        </Link>
                      </p>

                      <p className="lead">
                        Public Key:{" "}
                        <Link to="#" onClick={this.onShowPublic.bind(this)}>
                          adf
                        </Link>
                      </p>

                      <p className="lead">
                        Private Key:{" "}
                        <Link to="#" onClick={this.onShowPrivate.bind(this)}>
                          asdf
                        </Link>
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Navbar bg="white" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Navbar.Brand
                className="ml-5 pl-5"
                style={{ fontSize: "18px" }}
                href="#"
                onClick={this.onDash.bind(this)}
              >
                <i class="fas fa-chart-line"></i> Dashboard
              </Navbar.Brand>
              <Navbar.Brand
                className="ml-3"
                style={{ fontSize: "18px" }}
                href="#home"
                onClick={this.onPub.bind(this)}
              >
                <i class="fas fa-bookmark"></i> Publication
              </Navbar.Brand>
              <Navbar.Brand
                className="ml-3"
                style={{ fontSize: "18px" }}
                href="#home"
                onClick={this.onWallet.bind(this)}
              >
                <i class="fas fa-wallet"></i> Wallet
              </Navbar.Brand>
              <Navbar.Brand
                className="ml-3"
                style={{ fontSize: "18px" }}
                href="#home"
                onClick={this.onProfile.bind(this)}
              >
                <i class="fas fa-cog"></i> Settings
              </Navbar.Brand>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container style={{ maxWidth: "1500px" }}>
          {showdash}
          {showpub}
          {showwallet}
          {showprofile}
        </Container>
      </Fragment>
    );
  }
}

RProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  getPatients: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  dashboard: state.dashboard
});

export default connect(mapStateToProps, { getPatients, downloadFile })(
  RProfile
);
