import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Axios from "axios";
import * as actionTypes from "../../../../../store/actions";
import {
  Row,
  Col,
  Card,
  Table,
  Tabs,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import NavIcon from "./NavIcon";

class ModelModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      title: '',
      project_id: 1,
      company_id: 1
    };

    this.handleEntityChanged = this.handleEntityChanged.bind(this)

  }

  handleEntityChanged(event) {
    this.setState({title: event.target.value})
  }
  addNewEntity= () => {

    let items = this.props.menuitems
    let that = this
    
    Axios.post("http://localhost:5000/save-entity", this.state)
    .then((response) => {
      items.items[2].children[0].children.push({
        id: that.state.title.replace(" ","_"),
        title: that.state.title,
        type: "item",
        url: "/models/"+ that.state.title.replace(" ","_"),
        icon: "fa fa-table",
      })
      that.props.onGetItems(items);
      this.props.onHide()
    })
    .catch((e) => {
      console.log(e);
    });

    
    // this.forceUpdate();
   };
  
  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <NavIcon items={{ icon: "fa fa-code-branch" }} />
            New Entity
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Enter entity title</Form.Label>
                <Form.Control onChange={this.handleEntityChanged} type="text" placeholder="Entity title" />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button className="btn btn-success btn-glow-success btn-gl" disabled={this.state.title === ''} onClick={() => this.addNewEntity()}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentEntity: state.currentEntity,
    menuitems: state.menuitems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetItems: (items) =>
    dispatch({ type: actionTypes.GET_MENU_ITEMS, items: items })
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModelModel)
);
