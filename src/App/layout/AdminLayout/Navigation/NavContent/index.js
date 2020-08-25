import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import windowSize from "react-window-size";

import Aux from "../../../../../hoc/_Aux";
import NavGroup from "./NavGroup";
import DEMO from "../../../../../store/constant";

import * as actionTypes from "../../../../../store/actions";
import { WorkflowModal } from "./WorkflowModal";
import ModelModel from "./ModelModel";
import { CollectionModal } from "./CollectionModal";

class NavContent extends Component {
  state = {
    scrollWidth: 0,
    prevDisable: true,
    nextDisable: false,
  };

  scrollPrevHandler = () => {
    const wrapperWidth = document.getElementById("sidenav-wrapper").clientWidth;

    let scrollWidth = this.state.scrollWidth - wrapperWidth;
    if (scrollWidth < 0) {
      this.setState({ scrollWidth: 0, prevDisable: true, nextDisable: false });
    } else {
      this.setState({ scrollWidth: scrollWidth, prevDisable: false });
    }
  };
  addNewCollection= () => {

    // e.preventDefault();
     console.log("added new COLLECTION");
 
    // this.forceUpdate();
   };

  addNewWorkflow= () => {

   // e.preventDefault();
    console.log("added new worklflow");

   // this.forceUpdate();
  };

  
  scrollNextHandler = () => {
    const wrapperWidth = document.getElementById("sidenav-wrapper").clientWidth;
    const contentWidth = document.getElementById("sidenav-horizontal")
      .clientWidth;

    let scrollWidth = this.state.scrollWidth + (wrapperWidth - 80);
    if (scrollWidth > contentWidth - wrapperWidth) {
      scrollWidth = contentWidth - wrapperWidth + 80;
      this.setState({
        scrollWidth: scrollWidth,
        prevDisable: false,
        nextDisable: true,
      });
    } else {
      this.setState({ scrollWidth: scrollWidth, prevDisable: false });
    }
  };

  render() {
    const navItems = this.props.navigation.map((item) => {
      switch (item.type) {
        case "group":
          return (
            <NavGroup layout={this.props.layout} key={item.id} group={item} />
          );
        default:
          return false;
      }
    });

    let mainContent = "";
    mainContent = (
      <div className="navbar-content datta-scroll">
        <PerfectScrollbar>
          <ul className="nav pcoded-inner-navbar">{navItems}</ul>
        </PerfectScrollbar>
      </div>
    );

    return (
      <Aux>
        {mainContent}

        <WorkflowModal show={this.props.showDialog} onSaveWorkflow={() => this.addNewWorkflow()} onHide={() => this.props.onWorkflowClose()}/>
        <ModelModel show={this.props.showModel} onHide={() => this.props.onModelDialogClose()}/>
        <CollectionModal show={this.props.showCollection}  onSaveCollection={() => this.addNewCollection()} onHide={() => this.props.onCollectionDialogClose()}/>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.layout,
    collapseMenu: state.collapseMenu,
    showDialog: state.showDialog,
    showModel: state.showModel,
    showCollection: state.showCollection
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNavContentLeave: () => dispatch({ type: actionTypes.NAV_CONTENT_LEAVE }),
    onWorkflowClose: () => dispatch({ type: actionTypes.CLOSE_WORKFLOW_DIALOG }),
    onModelDialogClose: () => dispatch({ type: actionTypes.CLOSE_MODEL_DIALOG }),
    onCollectionDialogClose: () => dispatch({ type: actionTypes.CLOSE_COLLECTION_DIALOG }),
    onGetItems: (items) =>
    dispatch({ type: actionTypes.GET_MENU_ITEMS, items: items })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(windowSize(NavContent))
);
