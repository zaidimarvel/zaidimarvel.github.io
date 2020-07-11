import React from "react";
import * as _ from "lodash";
import classnames from "classnames";

import { TrayItemWidget } from "./TrayItemWidget";
import { TrayWidget } from "./TrayWidget";
import { Application } from "./Application";
import workflowData from "./workflow"

import {
    DefaultNodeModel,
    DiagramModel,
    DiagramWidget,
  } from "storm-react-diagrams";

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
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
} from "reactstrap";

export class Module extends React.Component {
  constructor(props) {
    super(props);

    this.app = new Application();
  }

  render() {
    return (
      <Container className="mt--5" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0 pr-md-0" xl="8">
            <Card>
              <CardHeader className="bg-transparent pt-0 pb-0">
                <Row className="align-items-left">
                  <div className="col">
                    <TrayWidget>
                      <TrayItemWidget
                        model={{ type: "File" }}
                        name="Input"
                        icon="file-alt"
                        color="#009688"
                      />
                      <TrayItemWidget
                        model={{ type: "Output" }}
                        name="Output"
                        icon="file-export"
                        color="#009688"
                      />
                      <TrayItemWidget
                        model={{ type: "Filter" }}
                        name="Filter"
                        icon="filter"
                        color="linear-gradient(to right, #de6262, #ffb88c"
                      />
                      <TrayItemWidget
                        model={{ type: "Formula" }}
                        name="Formula"
                        icon="square-root-alt"
                        color="#02aab0"
                      />
                      <TrayItemWidget
                        model={{ type: "Union" }}
                        name="Union"
                        icon="layer-group"
                        color="#7b4397"
                      />
                      <TrayItemWidget
                        model={{ type: "Unique" }}
                        name="Unique"
                        icon="code-branch"
                        color="#7b4397"
                      />
                      <TrayItemWidget
                        model={{ type: "Peek" }}
                        name="Peek"
                        icon="eye"
                        color="#7b4397"
                      />
                      <TrayItemWidget
                        model={{ type: "Select" }}
                        name="Select"
                        icon="tasks"
                        color="#7b4397"
                      />
                      <TrayItemWidget
                        model={{ type: "Sort" }}
                        name="Sort"
                        icon="sort"
                        color="#7b4397"
                      />
                      <TrayItemWidget
                        model={{ type: "Cleanup" }}
                        name="Cleanup"
                        icon="broom"
                        color="#7b4397"
                      />
                      <TrayItemWidget
                        model={{ type: "Group" }}
                        name="GroupBy"
                        icon="object-group"
                        color="#7b4397"
                      />
                      <TrayItemWidget
                        model={{ type: "Sample" }}
                        name="Sample"
                        icon="vials"
                        color="#7b4397"
                      />
                      <TrayItemWidget
                        model={{ type: "Replace" }}
                        name="Replace"
                        icon="search"
                        color="#7b4397"
                      />
                      <TrayItemWidget
                        model={{ type: "TextToColumn" }}
                        name="TextToColumn"
                        icon="columns"
                        color="#7b4397"
                      />
                      <TrayItemWidget
                        model={{ type: "Join" }}
                        name="Join"
                        icon="columns"
                        color="#7b4397"
                      />
                    </TrayWidget>
                  </div>
                </Row>
              </CardHeader>
              <CardBody
                className="p--1"
                style={{ padding: "0.5em", borderRadius: "20px" }}
              >
                <div className="body">
                  <div className="content">
                    <div className="diagram-layer">
                            <DiagramWidget
                                  className="srd-demo-canvas"
                                  deleteKeys={[46]}
                                  diagramEngine={this.app.getDiagramEngine()}
                                  allowLooseLinks={false}
                                  maxNumberPointsPerLink="0"
                                />


                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>{" "}
      </Container>
    );
  }
}
