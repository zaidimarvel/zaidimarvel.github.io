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

export class WorkflowModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      show: true,
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
            New workflow
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Workflow name</Form.Label>
                <Form.Control type="email" placeholder="workflow name" />
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
          <Button onClick={this.props.onHide}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
