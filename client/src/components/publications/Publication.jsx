import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPublications } from "../../actions/publicationActions";

import Table from "react-bootstrap/Table";

class Publication extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPublications();
  }

  render() {
    const { publications } = this.props.dashboard;
    let publicationDashboard;

    if (publications === null) {
      publicationDashboard = <h1>Empty!</h1>;
    } else {
      if (publications.length > 0) {
        publicationDashboard = publications.map(publication => (
          <tr key={publication}>
            <td>2019/11/19</td>
            <td>{publication.id}</td>
            <td>{publication.r_public_key}</td>
            <td>{publication.publication}</td>
            <td>{publication.institution}</td>
          </tr>
        ));
      } else {
        publicationDashboard = <h4>No publications!</h4>;
      }
    }

    return (
      <Fragment>
        <h1 className="pt-5 mt-">Publications</h1>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">ID</th>
              <th scope="col">Researcher Public Key</th>
              <th scope="col">Publication Title</th>
              <th scope="col">Institution</th>
            </tr>
          </thead>
          <tbody>{publicationDashboard}</tbody>
        </Table>
      </Fragment>
    );
  }
}

Publication.propTypes = {
  dashboard: PropTypes.object.isRequired,
  getPublications: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

export default connect(mapStateToProps, { getPublications })(Publication);
