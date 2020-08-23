import React from "react";
import * as _ from "lodash";
import classnames from "classnames";
import { connect } from "react-redux";

import { TrayItemWidget } from "./TrayItemWidget";
import { TrayWidget } from "./TrayWidget";
import { withRouter } from "react-router-dom";
import Aux from "../hoc/_Aux";
import workflowData from "./workflow";

import '../Sass/index.css';
import "storm-react-diagrams/dist/style.min.css";
import "../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "../Sass/main.css";

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

import { Application } from "./Application";

import {
  // Card,
  CardHeader,
  CardBody,
  Container,
  // Row,
  // Col,
  Form,
  FormGroup,
  Input,
  // Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
} from "reactstrap";

import * as actionTypes from "./../store/actions";

import { Row, Col, Card, Table, Tabs, Tab, Button } from "react-bootstrap";

let strModel = "";

export class BodyWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runningState: "run",
      activeTab: "1",
    };
    this.appEngine = new Application();
    this.updateNode = this.updateNode.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
    this.renderNode = this.renderNode.bind(this);
    this.renderDiagram = this.renderDiagram.bind(this);
    this.handleChangeSelectedSheet = this.handleChangeSelectedSheet.bind(this);
    this.handleChangeStartIndex = this.handleChangeStartIndex.bind(this);

    this.runWorkflow = this.runWorkflow.bind(this);
  }

  popStateListener = (event) => {
    console.log("I was here");
    event.preventDefault();
    this.renderDiagram();
  };

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

  renderDiagram() {

    let that = this;
    this.model = new DiagramModel();
    this.appEngine.diagramEngine.setDiagramModel(this.model);
    this.props.onLoadWorkflow(this.props.match.params.id);

    Axios.get(
      `http://localhost:5000/get-workflow?_id=${this.props.match.params.id}`
    )
      .then((response) => {
        that.props.onChangeSelectedNode(null);

        // that.setState({
        //   nodes: [],
        //   connections: [],
        //   display_results: [],
        // });

        that.props.onAddNodes([]);
        that.props.onAddLinks([]);

        that.model.addListener({
          nodesUpdated: function (e) {
            console.log("Node have been updated");
            // console.log(e);
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
              // that.setState((state, props) => ({
              //   nodes: state.nodes.concat(newNode),
              //   node: newNode,
              // }));

              // that.props.onAddNodes([])
              // that.props.onAddLinks([])

              that.props.onAddNode(newNode);
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
                  if (
                    event.link.targetPort.name == event.link.sourcePort.name
                  ) {
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

                    // that.setState({
                    //   display_results: results,
                    //   selected_node: selected_node,
                    //   // connections: Lodash.uniq(,'stamp')
                    // });

                    that.props.onChangeResults(results);
                    that.props.onChangeSelectedNode(selected_node);

                    event.link.remove();
                  } else if (event.link.targetPort.in) {
                    // console.log("Different from source");
                    let link = event.link;
                    let linksObject = link.sourcePort["links"];
                    let targetObject = link.targetPort["links"];

                    // console.log(Object.keys(targetObject));
                    // console.log(link.targetPort.parent.properties);

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
                      let tarNode = that.appEngine.diagramEngine
                        .getDiagramModel()
                        .getNode(link.targetPort.parent.id);
                      tarNode.properties.headers =
                        link.sourcePort.parent.properties.headers;

                      let data = that.props.connections.concat(newConnection);

                      // that.setState({
                      //   connections: _.uniqWith(data, _.isEqual),
                      //   // connections: Lodash.uniq(,'stamp')
                      // });

                      that.props.onAddLinks(_.uniqWith(data, _.isEqual));
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

                let data = that.props.connections.filter(
                  (link) => link.link_id != d.entity.id
                );

                // that.setState({
                //   connections: _.uniqWith(data, _.isEqual),
                //   // connections: Lodash.uniq(,'stamp')
                // });
                that.props.onAddLinks(_.uniqWith(data, _.isEqual));
               
              },
            });
          },
        });

        // console.log("Model has been updated");
        // console.log(response.data);
        let workflow = response.data;

        workflow.nodes.forEach((node) => {
          // console.log(node);
          that.renderNode(node, that);
        });
        workflow.links.forEach((link) => {
          // console.log(link);
          that.renderLinks(link, that);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  componentDidMount() {
    // window.onpopstate = this.popStateListener;
    this.renderDiagram()

    console.log("Component has mounted");
  }
  componentDidUpdate(prevProps, prevState) {
    /**
     * this is the initial render
     * without a previous prop change
     */
    //  if(prevProps == undefined) {
    //      return false
    //  }

    /**
     * new Project in town ?
     */

    if (this.props.match.params.id !== this.props.workflow_id) {
      // this.props.dispatch(fetchProject(this.props.router.params.id))
      console.log("Page has updated");
      console.log(this.props.match.params.id);
      console.log(prevProps.workflow_id);
      // this.props.onLoadWorkflow(this.props.match.params.id);
      this.renderDiagram()
      // this.forceUpdate()
      // window.location.reload(false);
      
      // 
      // console.log(prevProps);
      // console.log(prevState);
   

    }
  }

  componentWillReceiveProps(prev) {
    // if((nextProps.workflow_id !== 'test')){
    // console.log("Page has recived new props");
    // this.props.onLoadWorkflow(this.props.match.params.id);

    // }
    // console.log("this is the next prop");
    // console.log(this.props.workflow_id);
    // console.log(prev.workflow_id);
    // console.log(this.props.match.params.id);

    // if (this.props.match.params.id !== prev.workflow_id) {
    //   console.log("this is the next prop");
    //   // console.log(this.props.workflow_id);
    //   // console.log(prev.workflow_id);
    //   //  this.renderDiagram();
    //   // this.renderDiagram();
    //   // this.props.onLoadWorkflow(this.props.match.params.id);

    // }
    // if(nextProps.shouldUpdateList === true) {
    //     //dispatch action FETCH_LIST
    // }
  }
  renderLinks(link, that) {
    let newlink = null;
    let connection = link;
    if (link.source.nodeID !== "genesis") {
      let sourcePort = this.appEngine.diagramEngine
        .getDiagramModel()
        .getNode(link.source.nodeID)
        .getPort(link.source.port);

      let targetPort = this.appEngine.diagramEngine
        .getDiagramModel()
        .getNode(link.target.nodeID)
        .getPort(link.target.port);

      // console.log(targetPort.getPort('input'));

      newlink = sourcePort.link(targetPort);
      connection.link_id = newlink.id;
      // newlink.addLabel("I am Awesome!");

      if (newlink !== null) {
        that.appEngine.diagramEngine.getDiagramModel().addLink(newlink);

        that.forceUpdate();

        let data = that.props.connections.concat(connection);

        // that.setState({
        //   connections: _.uniqWith(data, _.isEqual),
        //   // connections: Lodash.uniq(,'stamp')
        // });
        // console.log("=================================================");
        // console.log("=================================================");
        // console.log("=================================================");
        // console.log(data);

        that.props.onAddLinks(_.uniqWith(data, _.isEqual));
      }
    }
  }

  renderNode(tool, vm) {
    console.log("Start processing");
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
      let that = vm;

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

            // that.setState({
            //   selected_node: selected_node,
            // });

            that.props.onChangeSelectedNode(selected_node);

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
            // that.setState({
            //   selected_node: null,
            // });
            that.props.onChangeSelectedNode(null);
          }
        },
        entityRemoved: function (e) {
          // Do something here
          console.log("nODE REMOVED");

          console.log(e);

          let data = that.props.nodes.filter((node) => node.id != e.entity.id);

          // that.setState({
          //   nodes: _.uniqWith(data, _.isEqual),
          //   // connections: Lodash.uniq(,'stamp')
          // });

          that.props.onAddNodes(_.uniqWith(data, _.isEqual));
          // that.props.onAddLinks([])

          console.log(data);
        },
      });
      // that.props.app.diagramEngine.getDiagramModel().addNode(node);
      vm.appEngine.getDiagramEngine().getDiagramModel().addNode(node);
    }
  }

  updateNode(node) {
    console.log("Sent from Child");
    console.log(this.props.selected_node);
    let currNode = this.appEngine.diagramEngine
      .getDiagramModel()
      .getNode(this.props.selected_node.id);

    let selected_node = {
      id: currNode.id,
      nodeType: currNode.type,
      properties: currNode.properties,
    };
    // this.setState({
    //   selected_node: selected_node,
    // });
    this.props.onChangeSelectedNode(selected_node);
  }

  handleChangeStartIndex(event) {
    let currNode = this.appEngine.diagramEngine
      .getDiagramModel()
      .getNode(this.props.selected_node.id);

    // currNode.properties.outputData = event.target.value.split(',')
    // currNode.properties.start_index = event.target.value
    currNode.properties.start_index = event.target.value;

    let selected_node = {
      id: currNode.id,
      nodeType: currNode.type,
      properties: currNode.properties,
    };
    // this.setState({
    //   selected_node: selected_node,
    // });
    this.props.onChangeSelectedNode(selected_node);
  }
  handleChangeSelectedSheet(event) {
    let currNode = this.appEngine.diagramEngine
      .getDiagramModel()
      .getNode(this.props.selected_node.id);

    // currNode.properties.selected_sheet = event.target.value
    currNode.properties.selected_sheet = event.target.value;

    // this.props.nodes

    let selected_node = {
      id: currNode.id,
      nodeType: currNode.type,
      properties: currNode.properties,
    };
    // this.setState({
    //   selected_node: selected_node,
    // });
    this.props.onChangeSelectedNode(selected_node);
    console.log();
  }

  saveFileConf = (e, node) => {
    e.preventDefault();

    console.log(node.properties);
    let currNode = this.appEngine.diagramEngine
      .getDiagramModel()
      .getNode(node.id);
    let that = this;

    let payload = {
      ...node.properties,
    };

    Axios.post("http://localhost:5000/inputconfigs", payload)
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
        // that.setState({
        //   selected_node: selected_node,
        // });
        that.props.onChangeSelectedNode(selected_node);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  runWorkflow = (e, action) => {
    e.preventDefault();

    // let links = Object.keys(this.appEngine.diagramEngine.getDiagramModel().links);
    let that = this;

    // console.log(this.props);
    let inputNodes = this.props.nodes.filter(
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
        let workingNode = that.appEngine.diagramEngine
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

    console.log(this.props);

    if (runWorkflow && this.props.nodes.length > 0) {
      let newNode = {
        nodeType: "Start",
        id: "genesis",
        properties: { input: [], outputData: [] },
      };
      // Toolkit.UID()
      let payloadNode = [...this.props.nodes, newNode];
      let legacyConnections = [...this.props.connections];
      let payloadConnections = legacyConnections.concat(newConns);
      let payload = {
        name: "pandas_workflow.fly",
        _id: this.props.match.params.id,
        description: "Hello world",
        links: payloadConnections,
        nodes: payloadNode,
      };

      if (action == "execute") {
        this.setState({ runningState: "running" });

        Axios.post("http://localhost:5000/execute", payload)
          .then((response) => {
            console.log(response.data);
            let payloadData = response.data;

            payloadData.forEach((node) => {
              if (node.id !== "genesis") {
                let workingNode = that.appEngine.diagramEngine
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

        this.appEngine.diagramEngine.repaintCanvas();
      }
      if (action == "save") {
        Axios.post("http://localhost:5000/save-workflow", payload)
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      console.log("Failed, MISSING REQUIRED INFO");
      this.appEngine.diagramEngine.repaintCanvas();
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
                    model={this.appEngine.diagramEngine.getDiagramModel()}
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
      // <Jexcel options={this.props.options} />);

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
      <Aux>
        <Row key={this.props.match.params.id}>
          <Col md={8} xl={8}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Workspace</Card.Title>
                <div
                  style={{
                    float: "right",
                  }}
                >
                  <Button
                    className="label theme-bg2 text-white f-12"
                    onClick={(e) => this.runWorkflow(e, "save")}
                    size="sm"
                  >
                    {this.state.runningState == "run" ? "Save" : "Saving"}
                  </Button>

                  <Button
                    className="label theme-bg text-white f-12"
                    onClick={(e) => this.runWorkflow(e, "execute")}
                    size="sm"
                  >
                    {this.state.runningState == "run" ? "Run" : "Running"}
                  </Button>
                </div>
                {/* <a href="#" className="label theme-bg text-white f-12">Approve</a></div> */}
              </Card.Header>
              <Card.Body bsPrefix="card-body pa-0">
                <Tabs defaultActiveKey="stdio" id="connectorstabs">
                  <Tab
                    eventKey="stdio"
                    style={{ padding: 0 }}
                    title="Connectors"
                  >
                    <div className="row">
                      <div className="col-12">
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
                        </TrayWidget>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="preparation" title="Pandas">
                    <div className="row">
                      <div className="col-12">
                        <TrayWidget>
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
                    </div>
                  </Tab>
                </Tabs>
                {/* <div className="col-12">
                
                </div> */}

                <div className="body">
                  <div className="content">
                    <div
                      className="diagram-layer"
                      onDrop={(event) => {
                        let data = JSON.parse(
                          event.dataTransfer.getData("storm-diagram-node")
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
                        let points = this.appEngine
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

                              // that.setState({
                              //   selected_node: selected_node,
                              // });

                              that.props.onChangeSelectedNode(selected_node);

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
                              // that.setState({
                              //   selected_node: null,
                              // });

                              that.props.onChangeSelectedNode(null);
                            }
                          },
                          entityRemoved: function (e) {
                            // Do something here
                            console.log("nODE REMOVED");

                            console.log(e);

                            let data = that.props.nodes.filter(
                              (node) => node.id != e.entity.id
                            );

                            // that.setState({
                            //   nodes: _.uniqWith(data, _.isEqual),
                            //   // connections: Lodash.uniq(,'stamp')
                            // });

                            that.props.onAddNodes(_.uniqWith(data, _.isEqual));
                            // that.props.onAddLinks([])

                            console.log(data);
                          },
                        });
                        this.appEngine
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
                        onPopState={(event) => {
                          // event.preventDefault();
                          console.log("pop stated");
                        }}
                        className="srd-demo-canvas"
                        deleteKeys={[46]}
                        diagramEngine={this.appEngine.getDiagramEngine()}
                        allowLooseLinks={false}
                        maxNumberPointsPerLink="0"
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} xl={4} className="m-b-30">
            <Tabs defaultActiveKey="config" id="uncontrolled-tab-example">
              <Tab eventKey="config" title="Configuration">
                <span className="d-block m-t-5">
                  Showing{" "}
                  <code>
                    {this.props.selected_node == null
                      ? "Workspace"
                      : this.props.selected_node.properties.name}{" "}
                  </code>{" "}
                  Properties
                </span>

                {/* {tabContent} */}
                {this.renderProperties(this.props.selected_node)}
              </Tab>
              <Tab eventKey="api" title="API">
                {/* {tabContent} */}
              </Tab>
            </Tabs>
          </Col>

          <Col md={12} xl={12}>
            <Card title="Results">
              <Card.Header>
                <Card.Title as="h5">Results Pane</Card.Title>
              </Card.Header>
              <Card.Body bsPrefix="card-body pa-0" style={{ height: "20vh" }}>
                {this.renderPreview(this.props)}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
    display_results: state.display_results,
    connections: state.connections,
    selected_node: state.selected_node,
    workflow_id: state.workflow_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNode: (node) => dispatch({ type: actionTypes.SAVE_NODE, node: node }),
    onChangeResults: (results) =>
      dispatch({ type: actionTypes.CHANGE_RESULTS, results: results }),
    onChangeSelectedNode: (selected_node) =>
      dispatch({
        type: actionTypes.CHANGE_SELECTED,
        selected_node: selected_node,
      }),
    onAddNodes: (nodes) =>
      dispatch({ type: actionTypes.ADD_NODES, nodes: nodes }),
    onAddLinks: (links) =>
      dispatch({ type: actionTypes.ADD_LINKS, links: links }),
    onLoadWorkflow: (id) =>
      dispatch({ type: actionTypes.SAVE_WORKFLOW, id: id }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BodyWidget));
