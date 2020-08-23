import React, {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Aux from "../../../../../../hoc/_Aux";
import NavCollapse from "./../NavCollapse";
import NavItem from "./../NavItem";


import * as actionTypes from "../../../../../../store/actions";

class navGroup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let navItems = "";
    if (this.props.group.children) {
      const groups = this.props.group.children;
      navItems = Object.keys(groups).map((item) => {
        item = groups[item];
        switch (item.type) {
          case "collapse":
            return <NavCollapse key={item.id} collapse={item} type="main" />;
          case "item":
            return <NavItem layout={this.props.layout} key={item.id} item={item} />;
          default:
            return false;
        }
      });
    }

    return (
      <Aux>
        <li key={this.props.group.id} className="nav-item pcoded-menu-caption">
          <label>{this.props.group.title}</label>
        </li>
        {navItems}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
    return {
     
      showDialog: state.showDialog
    };
  };

const mapDispatchToProps = (dispatch) => {
  return {
    onWorkflowClose: () =>
      dispatch({ type: actionTypes.CLOSE_WORKFLOW_DIALOG }),
  };
};

export default withRouter(
  connect(mapStateToProps,mapDispatchToProps)(navGroup)
);
