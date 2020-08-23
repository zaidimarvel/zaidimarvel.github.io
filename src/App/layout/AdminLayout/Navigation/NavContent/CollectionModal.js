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

export class CollectionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      show: false,
    };
  }

  render() {
    return (
      <Modal
        {...this.props}
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
                <Form.Label>collection name</Form.Label>
                <Form.Control type="text" placeholder="workflow name" />
              </Form.Group>
            </Col>
            
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button onClick={this.props.onHide}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
