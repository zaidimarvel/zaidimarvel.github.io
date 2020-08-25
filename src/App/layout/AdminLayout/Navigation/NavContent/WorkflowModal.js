import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "axios";
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
import {
  Toolkit,
} from "storm-react-diagrams";

import * as actionTypes from "../../../../../store/actions";


export class WorkflowModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      collections: [],
      workflow: {
        name: '',
        _id: Toolkit.UID(),
        description: "Hello world",
        col_id: 'default',
        collection_name: 'Default'
      },
      col_id: '-1',
      project_id: 1,
      company_id: 1
    };
    this.handleChangeSelectedCollection = this.handleChangeSelectedCollection.bind(this);
    this.handleChangeWorkflowName = this.handleChangeWorkflowName.bind(this);

  }

  componentWillMount() {
    this.fetchAvailableCollections()
  }

  handleChangeSelectedCollection(event) {
    // console.log(event.target.content);

    if( parseInt(event.target.value) != -1){
    this.setState({col_id: event.target.value, workflow: {...this.state.workflow, col_id: this.state.collections[parseInt(event.target.value)]._id, collection_name: this.state.collections[parseInt(event.target.value)].collection_name }})

    }

    
  }

  handleChangeWorkflowName(event) {
    console.log(event.target.value);

    this.setState({workflow: {...this.state.workflow, name: event.target.value }})
    
  }

  onSaveWorkflow = () =>  {
    let that = this
    
    Axios.post("http://localhost:5000/save-workflow", this.state.workflow)
    .then((response) => {

      that.props.onHide()
      
    })
    .catch((e) => {
      console.log(e);
    });

  }
  fetchAvailableCollections = () => {
    let that = this
    Axios.get("http://localhost:5000/get-collections")
    .then((response) => {
      console.log("========COLLECTIONS===============");
      
    console.log(response.data);

    that.setState({collections: response.data})
          
    })
    .catch((e) => {
      console.log(e);
    });
  }

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
            New workflow
          </Modal.Title>
        </Modal.Header> 
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Workflow name</Form.Label>
                <Form.Control onChange={this.handleChangeWorkflowName} type="email" placeholder="Workflow name" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Collection</Form.Label>
                <Form.Control as="select"
                        name="sheet"
                        value={ this.state.col_id }
                        onChange={this.handleChangeSelectedCollection}
                      >
                        <option value="-1">Default</option>
                        {this.state.collections.map((item, key) => (
                          <option key={key} value={key}>
                            {item.collection_name}
                          </option>
                        ))}
                    </Form.Control>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="3" />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button disabled={this.state.workflow.name === ''} onClick={() => this.onSaveWorkflow()}>Save</Button>

        </Modal.Footer>
      </Modal>
    );
  }
}


