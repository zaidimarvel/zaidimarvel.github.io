import React, { Component } from "react";


import {
  Row,
  Col,
  Card,
  Table,
  Tabs,
  Tab,
  Button,
  Form,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import ColumnsTable from "./ColumnsTable"
import RowsTable from "./RowsTable"

class ContentType extends React.Component {

  constructor(props) {
      super(props);
  }
  render(){
    return (
      <Aux>
        <Row>
          <Col>
            <Tabs defaultActiveKey="qt" id="uncontrolled-tab-example">
              <Tab eventKey="qt" title="Data">
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Field title</Form.Label>
                      <Form.Control type="email" placeholder="Text" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Type</Form.Label>
                      <Form.Control as="select">
                        <option>Short answer</option>
                        <option>Paragraph</option>
                        <option>RichText Editor</option>
                        <option>Short Number</option>
                        <option>Decimal Number (money)</option>
                        <option>Multiple choice</option>
                        <option>Dropdown</option>
                        <option>File Upload</option>
                        <option>Checkbox</option>
                        <option>Date</option>
                        <option>Time</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <RowsTable />
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="dt" title="Columns">
                {/* {tabContent} */}
                <ColumnsTable/>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Aux>
    );

  } 
};
// class SamplePage extends Component {
//     render() {
//     }
// }
export default ContentType;


