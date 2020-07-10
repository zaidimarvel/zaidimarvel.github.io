import React from "react";
import * as _ from "lodash";
import classnames from "classnames";

import { TrayItemWidget } from "./TrayItemWidget";
import { TrayWidget } from "./TrayWidget";

import workflowData from "./workflow";

import {
  DefaultNodeModel,
  DiagramModel,
  DiagramWidget,
  Toolkit,
} from "storm-react-diagrams";
import { FileNodeModel } from "./Connectors/FileInput/FileNodeModel";
import { FilterNodeModel } from "./Connectors/Filter/FilterNodeModel";
import { FormulaNodeModel } from "./Connectors/Formula/FormulaNodeModel";
import { UnionNodeModel } from "./Connectors/Union/UnionNodeModel";
import { UniqueNodeModel } from "./Connectors/Unique/UniqueNodeModel";
import { PeekNodeModel } from "./Connectors/Peek/PeekNodeModel";
import { SelectNodeModel } from "./Connectors/Select/SelectNodeModel";
import { CleanupNodeModel } from "./Connectors/Cleanup/CleanupNodeModel";
import { GroupNodeModel } from "./Connectors/Group/GroupNodeModel";
import { OutputNodeModel } from "./Connectors/Output/OutputNodeModel";
import { SortNodeModel } from "./Connectors/Sort/SortNodeModel";
import { SampleNodeModel } from "./Connectors/Sample/SampleNodeModel";
import { ReplaceNodeModel } from "./Connectors/Replace/ReplaceNodeModel";
import { JoinNodeModel } from "./Connectors/Join/JoinNodeModel";
import { TextToColumnNodeModel } from "./Connectors/TextToColumn/TextToColumnNodeModel";

//View components
import { FormulaComponent } from "./Connectors/Formula/FormulaComponent";

import Axios from "axios";

import FilePondComp from "./FilePondComp";
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

let strModel = "";

export class BodyWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      selected_node: null,
      runningState: "run",
      display_results: [],
      connections: [],
      activeTab: "1",
    };
    this.updateNode = this.updateNode.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
    this.renderNode = this.renderNode.bind(this);
    this.handleChangeSelectedSheet = this.handleChangeSelectedSheet.bind(this);
    this.handleChangeStartIndex = this.handleChangeStartIndex.bind(this);

    this.runWorkflow = this.runWorkflow.bind(this);
  }

  getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  componentWillMount() {
    let that = this;
    this.model = new DiagramModel();

    this.setState({
      nodes: [],
      connections: [],
      display_results: [],
    });


    this.model.addListener({
      nodesUpdated: function (e) {
        console.log("Node have been updated");
        // Do something here

        console.log(e);
        if (e.isCreated) {
          let newNode = {
            nodeType: e.node.type,
            id: e.node.id,
            properties: e.node.properties,
            ports: JSON.parse(
              JSON.stringify(e.node.ports, that.getCircularReplacer())
            ),
            annotation: "Plugin Initialized",
          };
          that.setState((state, props) => ({
            nodes: state.nodes.concat(newNode),
            node: newNode,
          }));
        }
      },
      linksUpdated: function (event) {
        event.link.addListener({
          selectionChanged: function (d) {
            // console.log("Link Selected");
          },
          targetPortChanged: function (d) {
            console.log("Target Port Changed");
            console.log(event.link.targetPort);

            if (event.link.targetPort) {
              if (event.link.targetPort.name == event.link.sourcePort.name) {
                console.log("Same as source");
                let results = event.link.sourcePort.parent.printResults(
                  event.link.sourcePort.parent,
                  event.link.sourcePort.label
                );
                let selected_node = {
                  id: event.link.sourcePort.parent.id,
                  nodeType: event.link.sourcePort.parent.type,
                  properties: event.link.sourcePort.parent.properties,
                };

                that.setState({
                  display_results: results,
                  selected_node: selected_node,
                  // connections: Lodash.uniq(,'stamp')
                });

                event.link.remove();
              } else if (event.link.targetPort.in) {
                // console.log("Different from source");
                let link = event.link;
                let linksObject = link.sourcePort["links"];
                let targetObject = link.targetPort["links"];

                console.log(Object.keys(targetObject));
                console.log(link.targetPort.parent.properties);

                if (
                  Object.keys(targetObject).length >
                  link.targetPort.parent.properties.maxLinks
                ) {
                  event.link.remove();
                } else {
                  // console.log(d);
                  let newConnection = {
                    stamp:
                      link.sourcePort.parent.id +
                      "" +
                      link.targetPort.parent.id,
                    link_id: link.id,
                    source: {
                      nodeType: link.sourcePort.parent.type,
                      port: link.sourcePort.label,
                      links: Object.keys(linksObject),
                      nodeID: link.sourcePort.parent.id,
                      properties: link.sourcePort.parent.properties,
                    },
                    target: {
                      nodeType: link.targetPort.parent.type,
                      port: link.targetPort.label,
                      nodeID: link.targetPort.parent.id,
                      properties: link.targetPort.parent.properties,
                    },
                  };
                  let tarNode = that.props.app.diagramEngine
                    .getDiagramModel()
                    .getNode(link.targetPort.parent.id);
                  tarNode.properties.headers =
                    link.sourcePort.parent.properties.headers;

                  let data = that.state.connections.concat(newConnection);

                  that.setState({
                    connections: _.uniqWith(data, _.isEqual),
                    // connections: Lodash.uniq(,'stamp')
                  });
                }
              } else {
                console.log("Dont resort to here");
                event.link.remove();
              }
            }
          },
          sourcePortChanged: function (d) {
            // console.log("Source Port");
            // e.remove()
          },
          entityRemoved: function (d) {
            console.log(d.entity);

            let data = that.state.connections.filter(
              (link) => link.link_id != d.entity.id
            );

            that.setState({
              connections: _.uniqWith(data, _.isEqual),
              // connections: Lodash.uniq(,'stamp')
            });
            console.log(data);

            console.log("Link Removed");
          },
        });
      },
    });

    this.props.app.diagramEngine.setDiagramModel(this.model);


  }
  componentDidMount() {

    let that = this

    Axios.get("http://127.0.0.1:5000/get-workflow?_id=93232fb5-7fd7-4952-8fff-ec1c051e2997")
        .then((response) => {
          console.log(response.data);
          let workflow = response.data

          workflow.nodes.forEach((node) => {
            // console.log(node);
            that.renderNode(node);
          });
          workflow.links.forEach((link) => {
            console.log(link);
            that.renderLinks(link, that);
          });
        })
        .catch((e) => {
          console.log(e);
        });

   
    // console.log("here here");
  }
  renderLinks(link,that) {
    let newlink = null;
    let connection = link;
    if (link.source.nodeID !== "genesis") {
      let sourcePort = this.props.app.diagramEngine
        .getDiagramModel()
        .getNode(link.source.nodeID)
        .getPort(link.source.port);

      let targetPort = this.props.app.diagramEngine
        .getDiagramModel()
        .getNode(link.target.nodeID)
        .getPort(link.target.port);

      // console.log(targetPort.getPort('input'));

      newlink = sourcePort.link(targetPort);
      connection.link_id = newlink.id;
      // newlink.addLabel("I am Awesome!");

      if (newlink !== null) {

        that.props.app.diagramEngine.getDiagramModel().addLink(newlink);

        let data = that.state.connections.concat(connection);

        that.setState({
          connections: _.uniqWith(data, _.isEqual),
          // connections: Lodash.uniq(,'stamp')
        });
      }
    }
  }

  renderNode(tool) {
    // console.log(type);
    let node = null;
    switch (tool.nodeType) {
      case "File":
        node = new FileNodeModel();
        node.addOutPort("output");
        break;
      case "Filter":
        node = new FilterNodeModel();
        node.addInPort("input");
        node.addOutPort("true");
        node.addOutPort("false");
        break;
      case "Join":
        node = new JoinNodeModel();
        // node.addInPort("input");
        node.addInPort("left");
        node.addInPort("right");

        node.addOutPort("ljoin");
        node.addOutPort("ijoin");
        node.addOutPort("rjoin");
        break;
      case "Formula":
        node = new FormulaNodeModel();
        node.addInPort("input");
        node.addOutPort("output");
        break;
      case "Union":
        node = new UnionNodeModel();
        node.addInPort("input");
        node.addOutPort("output");
        break;
      case "Select":
        node = new SelectNodeModel();
        node.addInPort("input");
        node.addOutPort("output");
        break;
      case "Sort":
        node = new SortNodeModel();
        node.addInPort("input");
        node.addOutPort("output");
        break;
      case "Replace":
        node = new ReplaceNodeModel();
        node.addInPort("input");
        node.addOutPort("output");
        break;
      case "TextToColumn":
        node = new TextToColumnNodeModel();
        node.addInPort("input");
        node.addOutPort("output");
        break;

      case "Cleanup":
        node = new CleanupNodeModel();
        node.addInPort("input");
        node.addOutPort("output");
        break;
      case "Group":
        node = new GroupNodeModel();
        node.addInPort("input");
        node.addOutPort("output");
        break;
      case "Sample":
        node = new SampleNodeModel();
        node.addInPort("input");
        node.addOutPort("output");

        break;
      case "Unique":
        node = new UniqueNodeModel();
        node.addInPort("input");
        node.addOutPort("unique");
        node.addOutPort("duplicate");
        break;
      case "Peek":
        node = new PeekNodeModel();
        node.addInPort("input");
        break;
      case "Output":
        node = new OutputNodeModel();
        node.addInPort("input");
        break;
    }
    // let points = this.props.app
    //   .getDiagramEngine()
    //   .getRelativeMousePoint(event);
    if (node != null) {
      node.id = tool.id;
      node.x = tool.properties.x;
      node.y = tool.properties.y;

      node.properties = tool.properties;
      let that = this;

      node.addListener({
        selectionChanged: function (e) {
          console.log(node);

          // Do something here
          if (e.isSelected) {
            let selected_node = {
              id: e.entity.id,
              nodeType: e.entity.type,
              properties: e.entity.properties,
            };

            e.entity.properties.x = e.entity.x;
            e.entity.properties.y = e.entity.y;

            that.setState({
              selected_node: selected_node,
            });

            // switch(e.entity.type){
            //     case "Formula":
            //         break
            //     case "Filter":
            //         break
            //     case "File":
            //         break
            //     case "Union":
            //         break
            // }
          } else {
            that.setState({
              selected_node: null,
            });
          }
        },
        entityRemoved: function (e) {
          // Do something here
          console.log("nODE REMOVED");

          console.log(e);

          let data = that.state.nodes.filter((node) => node.id != e.entity.id);

          that.setState({
            nodes: _.uniqWith(data, _.isEqual),
            // connections: Lodash.uniq(,'stamp')
          });

          console.log(data);
        },
      });

      this.props.app.getDiagramEngine().getDiagramModel().addNode(node);
    }
  }

  updateNode(node) {
    console.log("Sent from Child");
    console.log(this.state.selected_node);
    let currNode = this.props.app.diagramEngine
      .getDiagramModel()
      .getNode(this.state.selected_node.id);

    let selected_node = {
      id: currNode.id,
      nodeType: currNode.type,
      properties: currNode.properties,
    };
    this.setState({
      selected_node: selected_node,
    });
  }

  handleChangeStartIndex(event) {
    let currNode = this.props.app.diagramEngine
      .getDiagramModel()
      .getNode(this.state.selected_node.id);

    // currNode.properties.outputData = event.target.value.split(',')
    // currNode.properties.start_index = event.target.value
    currNode.properties.start_index = event.target.value;

    let selected_node = {
      id: currNode.id,
      nodeType: currNode.type,
      properties: currNode.properties,
    };
    this.setState({
      selected_node: selected_node,
    });
  }
  handleChangeSelectedSheet(event) {
    let currNode = this.props.app.diagramEngine
      .getDiagramModel()
      .getNode(this.state.selected_node.id);

    // currNode.properties.selected_sheet = event.target.value
    currNode.properties.selected_sheet = event.target.value;

    // this.state.nodes

    let selected_node = {
      id: currNode.id,
      nodeType: currNode.type,
      properties: currNode.properties,
    };
    this.setState({
      selected_node: selected_node,
    });
    console.log();
  }

  saveFileConf = (e, node) => {
    e.preventDefault();

    console.log(node.properties);
    let currNode = this.props.app.diagramEngine
      .getDiagramModel()
      .getNode(node.id);
    let that = this;

    let payload = {
      ...node.properties,
    };

    Axios.post("http://127.0.0.1:5000/inputconfigs", payload)
      .then((response) => {
        console.log(response.data);

        currNode.properties.headers = response.data.columns;
        currNode.properties.sample = response.data.preview_data;
        currNode.properties.outputData = response.data.preview_data;
        currNode.properties.message = currNode.properties.file;

        // let otherNodes = that.state.nodes.filter((node) =>  node.id != currNode.id)
        // let newNode =  {
        //   nodeType: currNode.type,
        //   id:  currNode.type,
        //   properties: currNode.properties,
        //   ports: JSON.parse(JSON.stringify(currNode.ports, that.getCircularReplacer())),
        //   annotation: "Plugin Initialized"
        // };

        // console.log('other Nodes');
        // console.log();

        // that.setState({
        //   nodes: otherNodes.concat(newNode)
        // })

        let selected_node = {
          id: currNode.id,
          nodeType: currNode.type,
          properties: currNode.properties,
        };
        that.setState({
          selected_node: selected_node,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  runWorkflow = (e, action) => {
    e.preventDefault();

    // let links = Object.keys(this.props.app.diagramEngine.getDiagramModel().links);
    let that = this;

    // console.log(this.state);
    let inputNodes = this.state.nodes.filter(
      (node) => node.properties.type == "single"
    );
    let cnt = 1;
    let newConns = [];
    let runWorkflow = true;

    inputNodes.forEach((node) => {
      let newConnection = {
        stamp: "genesis" + "" + node.id,
        link_id: "link" + cnt++,
        source: {
          nodeType: "Start",
          port: "output",
          nodeID: "genesis",
          properties: { input: [], outputData: [] },
        },
        target: {
          nodeType: node.type,
          port: "input",
          nodeID: node.id,
          properties: node.properties,
        },
      };

      if (node.nodeType == "File") {
        let workingNode = that.props.app.diagramEngine
          .getDiagramModel()
          .getNode(node.id);

        if (node.properties.file == null) {
          runWorkflow = false;
          workingNode.properties.message = "Missing input File";
          workingNode.properties.messages = ["Missing input File"];
          console.log("AHA");
        } else {
          workingNode.properties.message = "Its Okey Dokey";
          workingNode.properties.messages = [];
        }
      }

      newConns.push(newConnection);
      // let data = that.state.connections.concat(newConnection);
    });

    if (runWorkflow && this.state.nodes.length > 0) {
      let newNode = {
        nodeType: "Start",
        id: "genesis",
        properties: { input: [], outputData: [] },
      };
      let payloadNode = [...this.state.nodes, newNode];
      let legacyConnections = [...this.state.connections];
      let payloadConnections = legacyConnections.concat(newConns);
      let payload = {
        name: "pandas_workflow.fly",
        _id: "93232fb5-7fd7-4952-8fff-ec1c051e2997",
        description: "Hello world",
        links: payloadConnections,
        nodes: payloadNode,
      };

      if (action == "execute") {
        this.setState({ runningState: "running" });

        Axios.post("http://127.0.0.1:5000/execute", payload)
          .then((response) => {
            console.log(response.data);
            let payloadData = response.data;

            payloadData.forEach((node) => {
              if (node.id !== "genesis") {
                let workingNode = that.props.app.diagramEngine
                  .getDiagramModel()
                  .getNode(node.id);
                workingNode.properties = node.properties;
              }
            });
            that.setState({ runningState: "run" });
          })
          .catch((e) => {
            console.log(e);
          });

        this.props.app.diagramEngine.repaintCanvas();
      }
      if (action == "save") {
        Axios.post("http://127.0.0.1:5000/save-workflow", payload)
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      console.log("Failed, MISSING REQUIRED INFO");
      this.props.app.diagramEngine.repaintCanvas();
    }
  };

  InputFileWidget(node) {
    return (
      <div className="modal-body">
        <div className="text-left">
          {/* <i className="ni ni-bell-55 ni-3x" /> */}
          {/* <i className={ "fas fa-upload" } /> */}
          <h6 className="heading mt-1">Select Excel File</h6>
          <Form>
            <Row>
              <Col md="12">
                <FormGroup>
                  <FilePondComp
                    node={node}
                    model={this.props.app.diagramEngine.getDiagramModel()}
                    updateNode={this.updateNode}
                    file_name={node.properties.file}
                  />

                  {node.properties.sheets == null ? (
                    ""
                  ) : (
                    <div>
                      <h6 className="heading mt-2">Select Sheet</h6>
                      <Input
                        type="select"
                        name="sheet"
                        value={
                          node.properties.selected_sheet == null ||
                          node.properties.selected_sheet == ""
                            ? "Default"
                            : node.properties.selected_sheet
                        }
                        onChange={this.handleChangeSelectedSheet}
                      >
                        <option value="Default">Default</option>
                        {node.properties.sheets.map((item, key) => (
                          <option key={key} value={item}>
                            {item}
                          </option>
                        ))}
                      </Input>

                      <h6 className="heading mt-2">Header Row</h6>
                      <Input
                        type="number"
                        value={node.properties.start_index}
                        onChange={this.handleChangeStartIndex}
                      />
                    </div>
                  )}

                  {/*  */}
                </FormGroup>
              </Col>
            </Row>
          </Form>
          {node.properties.selected_sheet == null ||
          node.properties.start_index == null ? (
            ""
          ) : (
            <Button
              aria-pressed={true}
              className="active"
              color="secondary"
              href="#pablo"
              onClick={(e) => this.saveFileConf(e, node)}
              role="button"
              size="lg"
            >
              Save
            </Button>
          )}
          <p>{node.properties.headers.join(",")}</p>
          <p>{/* <span id="coderea">{ JSON.stringify(node) }</span> */}</p>
        </div>
      </div>
    );
  }

  renderProperties(node) {
    if (node) {
      switch (node.nodeType) {
        case "File":
          return this.InputFileWidget(node);
        case "Formula":
          return <FormulaComponent node={node} />;
      }
    } else {
      return <p>Workflow</p>;
    }
  }
  renderPreview(state) {
    let res = state.display_results;

    if (res == null || res == []) {
      return (
        <Table hover className="align-items-center text-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">No results to display</th>
            </tr>
          </thead>
          {/* <tbody>{previewValues}</tbody> */}
        </Table>
      );
    } else {
      // return (
      // <Jexcel options={this.state.options} />);

      const previewValues = res.map((res, i) => {
        const items = [];

        for (var key in res) {
          if (res.hasOwnProperty(key)) {
            items.push(<td key={key}>{JSON.stringify(res[key])}</td>);
          }
        }

        return <tr key={i}>{items}</tr>;
      });
      // console.log("selected node render");
      // console.log(state);

      if (state.display_results.length > 0) {
        let items = [];
        let objKeys = Object.keys(state.display_results[0]);
        objKeys.forEach((el, i) => {
          items.push(<th key={i}>{el}</th>);
        });

        return (
          <Table hover className="align-items-center text-center" responsive>
            <thead className="thead-light">
              <tr>{items}</tr>
            </thead>
            <tbody>{previewValues}</tbody>
          </Table>
        );
      } else {
        return (
          <Table hover className="align-items-center text-center" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">No results to display</th>
              </tr>
            </thead>
            {/* <tbody>{previewValues}</tbody> */}
          </Table>
        );
      }

      // console.log(state.selected_node);
    }
  }
  toggleWorkflow(workflow) {
    if (this.state.activeTab !== workflow)
      this.setState({ activeTab: workflow });
  }

  render() {
    return (
      <Container className="mt--5" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className=" shadow">
              <Nav className="" tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.toggleWorkflow("1");
                    }}
                  >
                    Pandas Workflow.fly*
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2",
                    })}
                    onClick={() => {
                      this.toggleWorkflow("2");
                    }}
                  >
                    Workflow2.fly
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col className="mb-5 mb-xl-0 pr-md-0" xl="8">
                      <Card>
                        <CardHeader className="bg-transparent pt-2 pb-2">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="text-uppercase text-light ls-1 mb-1">
                                My Workspace
                              </h3>
                              {/* <Button onClick={() => this.props.app.getDiagramEngine().zoomToFit()}>Zoom to fit</Button> */}
                            </div>
                            <div className="col">
                              <Button
                                className="float-right"
                                color="danger"
                                onClick={(e) => this.runWorkflow(e, "save")}
                                size="sm"
                              >
                                Save
                              </Button>
                            </div>
                            <div className="col">
                              <Button
                                className="float-right"
                                color={
                                  this.state.runningState == "run"
                                    ? "success"
                                    : "danger"
                                }
                                onClick={(e) => this.runWorkflow(e, "execute")}
                                size="sm"
                              >
                                {this.state.runningState == "run"
                                  ? "Run"
                                  : "Running"}
                              </Button>
                            </div>
                          </Row>
                        </CardHeader>
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
                              <div
                                className="diagram-layer"
                                onDrop={(event) => {
                                  let data = JSON.parse(
                                    event.dataTransfer.getData(
                                      "storm-diagram-node"
                                    )
                                  );

                                  let node = null;
                                  switch (data.type) {
                                    case "File":
                                      node = new FileNodeModel();
                                      node.addOutPort("output");
                                      break;
                                    case "Filter":
                                      node = new FilterNodeModel();
                                      node.addInPort("input");
                                      node.addOutPort("true");
                                      node.addOutPort("false");
                                      break;
                                    case "Join":
                                      node = new JoinNodeModel();
                                      // node.addInPort("input");
                                      node.addInPort("left");
                                      node.addInPort("right");

                                      node.addOutPort("ljoin");
                                      node.addOutPort("ijoin");
                                      node.addOutPort("rjoin");
                                      break;
                                    case "Formula":
                                      node = new FormulaNodeModel();
                                      node.addInPort("input");
                                      node.addOutPort("output");
                                      break;
                                    case "Union":
                                      node = new UnionNodeModel();
                                      node.addInPort("input");
                                      node.addOutPort("output");
                                      break;
                                    case "Select":
                                      node = new SelectNodeModel();
                                      node.addInPort("input");
                                      node.addOutPort("output");
                                      break;
                                    case "Sort":
                                      node = new SortNodeModel();
                                      node.addInPort("input");
                                      node.addOutPort("output");
                                      break;
                                    case "Replace":
                                      node = new ReplaceNodeModel();
                                      node.addInPort("input");
                                      node.addOutPort("output");
                                      break;
                                    case "TextToColumn":
                                      node = new TextToColumnNodeModel();
                                      node.addInPort("input");
                                      node.addOutPort("output");
                                      break;

                                    case "Cleanup":
                                      node = new CleanupNodeModel();
                                      node.addInPort("input");
                                      node.addOutPort("output");
                                      break;
                                    case "Group":
                                      node = new GroupNodeModel();
                                      node.addInPort("input");
                                      node.addOutPort("output");
                                      break;
                                    case "Sample":
                                      node = new SampleNodeModel();
                                      node.addInPort("input");
                                      node.addOutPort("output");
                                      break;
                                    case "Unique":
                                      node = new UniqueNodeModel();
                                      node.addInPort("input");
                                      node.addOutPort("unique");
                                      node.addOutPort("duplicate");
                                      break;
                                    case "Peek":
                                      node = new PeekNodeModel();
                                      node.addInPort("input");
                                      break;
                                    case "Output":
                                      node = new OutputNodeModel();
                                      node.addInPort("input");
                                      break;
                                  }
                                  let points = this.props.app
                                    .getDiagramEngine()
                                    .getRelativeMousePoint(event);
                                  node.x = points.x;
                                  node.y = points.y;

                                  node.properties.x = points.x;
                                  node.properties.y = points.y;

                                  let that = this;

                                  node.addListener({
                                    selectionChanged: function (e) {
                                      // Do something here
                                      if (e.isSelected) {
                                        let selected_node = {
                                          id: e.entity.id,
                                          nodeType: e.entity.type,
                                          properties: e.entity.properties,
                                        };

                                        e.entity.properties.x = e.entity.x;
                                        e.entity.properties.y = e.entity.y;
                                        
                                        that.setState({
                                          selected_node: selected_node,
                                        });

                                        // switch(e.entity.type){
                                        //     case "Formula":
                                        //         break
                                        //     case "Filter":
                                        //         break
                                        //     case "File":
                                        //         break
                                        //     case "Union":
                                        //         break
                                        // }
                                      } else {
                                        that.setState({
                                          selected_node: null,
                                        });
                                      }
                                    },
                                    entityRemoved: function (e) {
                                      // Do something here
                                      console.log("nODE REMOVED");

                                      console.log(e);

                                      let data = that.state.nodes.filter(
                                        (node) => node.id != e.entity.id
                                      );

                                      that.setState({
                                        nodes: _.uniqWith(data, _.isEqual),
                                        // connections: Lodash.uniq(,'stamp')
                                      });

                                      console.log(data);
                                    },
                                  });
                                  this.props.app
                                    .getDiagramEngine()
                                    .getDiagramModel()
                                    .addNode(node);
                                  this.forceUpdate();
                                }}
                                onDragOver={(event) => {

                                  event.preventDefault();
                                }}
                              >
                                {/* smartRouting={true}  */}
                                <DiagramWidget
                                  className="srd-demo-canvas"
                                  deleteKeys={[46]}
                                  diagramEngine={this.props.app.getDiagramEngine()}
                                  allowLooseLinks={false}
                                  maxNumberPointsPerLink="0"
                                />
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xl="4" className=" pl-md-0">
                      <Card
                        style={{
                          height: "100%",
                        }}
                      >
                        <CardHeader className="bg-transparent">
                          <Row className="align-items-center">
                            <div className="col">
                              {/* <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6> */}
                              <h2 className="mb-0">
                                {this.state.selected_node == null
                                  ? "Workspace"
                                  : this.state.selected_node.properties
                                      .name}{" "}
                                - Properties
                              </h2>
                            </div>
                          </Row>
                        </CardHeader>
                        <CardBody>
                          {/* Chart */}
                          {/* <span id="coderea">{ JSON.stringify(this.state.selected_node) }</span> */}
                          {this.renderProperties(this.state.selected_node)}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                      <Card className="shadow">
                        <CardHeader className="border-0">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="mb-0">Results </h3>
                            </div>
                            <div className="col text-right">
                              {/* <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button> */}
                            </div>
                          </Row>
                        </CardHeader>

                        {this.renderPreview(this.state)}
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <Card body>
                        <CardTitle>Second Workflow</CardTitle>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
