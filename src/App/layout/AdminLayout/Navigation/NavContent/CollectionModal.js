import React, { Component } from "react";
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
import Axios from "axios";

export class CollectionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      collection_name: '',
      project_id: 1,
      company_id: 1
    };
    this.handleCollectionChanged = this.handleCollectionChanged.bind(this)

  }

  handleCollectionChanged(event) {
    this.setState({collection_name: event.target.value})
  }

  onSaveCollection = () => {
    let that = this
    
    Axios.post("http://localhost:5000/save-collection", this.state)
    .then((response) => {

      that.props.onHide()
      
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
            Collection Builder
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Collection name</Form.Label>
                <Form.Control type="text" onChange={this.handleCollectionChanged}  placeholder="Collection name" />
              </Form.Group>
            </Col>
            
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button disabled={this.state.collection_name === ''} onClick={() => this.onSaveCollection()}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


