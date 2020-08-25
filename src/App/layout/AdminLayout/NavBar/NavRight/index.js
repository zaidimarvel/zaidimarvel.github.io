import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actionTypes from "../../../../../store/actions";

import Aux from "../../../../../hoc/_Aux";

class NavRight extends Component {
  state = {
    listOpen: false,
  };

  render() {
    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          <li onClick={() => this.props.onCollectionDialogClose()}>
            <i className="fa fa-plus-square"></i> Collection
          </li>
          <li onClick={() => this.props.onWorkflowClose()}>
            <i className="fa fa-plus-square"></i> Workflow
          </li>
          <li onClick={() => this.props.onModelDialogClose()}>
            <i className="fa fa-plus-square"></i> Entity
          </li>
        </ul>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    showDialog: state.showDialog,
    showModel: state.showModel,
    showCollection: state.showCollection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onWorkflowClose: () =>
      dispatch({ type: actionTypes.CLOSE_WORKFLOW_DIALOG }),
    onModelDialogClose: () =>
      dispatch({ type: actionTypes.CLOSE_MODEL_DIALOG }),
    onCollectionDialogClose: () =>
      dispatch({ type: actionTypes.CLOSE_COLLECTION_DIALOG }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavRight)
);
