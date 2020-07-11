import React from "react";
import ReactDOM from "react-dom";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Button,
  } from "reactstrap";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-funky.css';

const code = `IF [a] is less than [two] 
THEN 1+([a]*-3) 
ELSEIF [a] is greater than [two] 
THEN boil 
ELSE nadanada 
ENDIF
`;

export class FormulaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // Set initial files, type 'local' means this is a file
        // that has already been uploaded to the server (see docs)
        node: null,
        code
      };
  }

  componentDidMount = function() {
   
  };
 
  render() {
    return (
        <div className="modal-body">
      <div className="text-left">
        <h6 className="heading mt-1">Formula Tool Configs</h6>
        <Editor
        value={this.state.code}
        onValueChange={code => this.setState({ code })}
        highlight={code => highlight(code, languages.sql)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
        <Form>
          <Row>
            <Col md="12">
              <FormGroup>
              </FormGroup>
            </Col>
          </Row>
        </Form>
         <p>
         {/* {node.properties.headers.join(',')} */}
        </p>
       <p>
       <span id="coderea">{ JSON.stringify(this.props.node) }</span>
       </p>
        
      </div>
    </div>
      );
  }
}
