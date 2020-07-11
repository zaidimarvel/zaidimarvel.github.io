import * as React from "react";
import * as _ from "lodash";

import { TrayItemWidget } from "./TrayItemWidget";
import { TrayWidget } from "./TrayWidget";

import { DefaultNodeModel, DiagramModel, DiagramWidget } from "storm-react-diagrams";
import { HotspotNodeModel } from "../Models/HotspotNodeModel";
import { JsonNodeModel } from "../Models/JsonNodeModel";
import { SceneHotspotNodeModel } from "../Models/SceneHotspotNodeModel";
import { FileNodeModel } from "../Models/FileNodeModel";
import { StartNodeModel } from "../Models/StartNodeModel";



import { CustomDiagramWidget } from "./CustomDiagramWidget";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    UncontrolledAlert,
    Row,
    Label,
    Col,
    Dropdown, DropdownMenu, DropdownToggle
  } from "reactstrap";

let strModel = "";

export class BodyWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          nodes : null,
          selected_node: null,
          display_results: null,
          runningState: 'run',
          options: {
            // data:[[]],
            url: 'http://dummy.restapiexample.com/api/v1/employees',
            // minDimensions:[10,10],
        }
        }
    }
    componentWillMount() {
        let that = this
       //  this.engine.installDefaultFactories();
         this.setState({
           nodes:  [
            
           ],
           connections: [
           
           ],
           display_results: []
         
         })
         
         this.props.app.getActiveDiagram().addListener({
            nodesUpdated: function(e) {
              console.log("Node have been updated");
              // Do something here
              console.log(e);
      
             let newNode =  {
                nodeType: e.node.type,
                id: e.node.id,
                // properties: e.properties,
                // ports: JSON.parse(JSON.stringify(e.ports, that.getCircularReplacer())),
                annotation: "Plugin Initialized"
              };
              that.setState({ 
                nodes: that.state.nodes.concat(newNode)
              })
              console.log("========================");
              
              console.log(that.state);
              
            },
            linksUpdated: function(event){
                event.link.addListener({
                    selectionChanged: function(d) {
                        console.log("Link Selected");
                        
                      },
                      targetPortChanged: function(d) {
                        console.log("Target Port Changed");

                        // console.log();
                        if(Object.keys(d.port.links).length > d.port.maximumLinks){
                            event.link.remove()
                        }
                        // 
                        
                      },
                      sourcePortChanged: function(d) {
                        console.log("Source Port");
                        // e.remove()
                      },
                      entityRemoved: function(d) {
                          console.log(d);
                          
                        console.log("Link Removed");
                      }
                   
                
                });
            }
          });
        }
 
    showDiagramJSON = (model) => {
        let finalJson = {};
        finalJson.scenes = [];
        console.log("MOD",model);
        let projectNode = _.find(model.nodes,function(o) { return o.type === "Project"; });
        let sceneNode = _.filter(model.nodes,function(o) { return o.type === "ScHotspot"; });
        finalJson.config = projectNode.Config;
        for(let scene of sceneNode){
            let scObj = {};
            scObj.scene_id = scene.scene_id;
            scObj.next_scene_id = scene.next_scene_id;
            scObj.hotspots = [];
            for(let hs of scene.hotspot_ids){
                let findPort = _.find(scene.ports,function(o) { return o.id === hs.port_id; });
                let findLink = findPort.links[Object.keys(findPort.links)[0]];
                scObj.hotspots.push({
                    hotspot_id: hs.hotspot_id || "",
                    next_scene_id: findLink.targetPort.parent.scene_id
                });
            }
            finalJson.scenes.push(scObj);
        }
        console.log("FIN",finalJson);
    };

    addDiagram = (model) => {
        console.log("add",model);
        strModel = JSON.stringify(model.serializeDiagram());
    };

    applyDiagram = (engine) => {
        let tempModel = new DiagramModel();
        tempModel.deSerializeDiagram(JSON.parse(strModel), engine);
        engine.setDiagramModel(tempModel);
        console.log("apply",tempModel);
        this.forceUpdate();
    };

    render() {
        return (
            <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className=" shadow">
              <CardHeader className="bg-transparent pt-2 pb-2">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="text-uppercase text-light ls-1 mb-1">
                      My Workspace
                    </h3>
                    {/* <Button onClick={() => this.props.app.getDiagramEngine().zoomToFit()}>Zoom to fit</Button> */}
                    </div>
                    </Row>
                    </CardHeader>
                    <CardHeader className="bg-transparent pt-0 pb-0">
                <Row className="align-items-left">
                  <div className="col">
                  <TrayWidget>
                        {/* <button onClick={()=>{this.showDiagramJSON(this.props.app.getDiagramEngine().getDiagramModel())}}>Serialize</button>
                        <button onClick={()=>{this.addDiagram(this.props.app.getDiagramEngine().getDiagramModel())}}>Add</button>
                        <button onClick={()=>{this.applyDiagram(this.props.app.getDiagramEngine())}}>Apply</button> */}
                         <TrayItemWidget
                            model={{ type: "Start" }}
                            name="Start"
                            color="primary"
                            icon="file-import"
                        />
                        <TrayItemWidget model={{ type: "File" }} name="File"  icon="eye" color="primary" /> 
                        <TrayItemWidget model={{ type: "Hotspot" }} name="Hotspot Node"  icon="eye" color="primary" />
                        {/* <TrayItemWidget model={{ type: "in" }} name="Peek"  icon="eye" color="primary" />
                        <TrayItemWidget model={{ type: "Start" }} name="Start Node"  icon="eye" color="primary" />
                        <TrayItemWidget model={{ type: "out" }} name="Out Node"  icon="eye" color="primary" />
                        <TrayItemWidget model={{ type: "Scene" }} name="Scene Node"  icon="eye" color="primary" />
                        <TrayItemWidget model={{ type: "Hotspot" }} name="Hotspot Node"  icon="eye" color="primary" />
                        <TrayItemWidget model={{ type: "JsonNode" }} name="Json Node"  icon="eye" color="primary"/>
                        <TrayItemWidget model={{ type: "ScHotspot" }} name="SceneHotspot Node"  color="primary" />
                        */}
                    </TrayWidget>
                  </div>
                  </Row>
                  </CardHeader>
                    <div className="body">
                <div className="content">
                   
                    <div
                        className="diagram-layer"
                        onDrop={event => {
                            let data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));

                            let node = null;
                            switch(data.type){
                                case "Start":
                                    node = new StartNodeModel();
                                    
                                    node.addOutPort("output");
                                    node.addInPort("top").setMaximumLinks(1);
                                    node.addInPort("bottom").setMaximumLinks(1);
                                    
                                    break;
                                case "in":
                                    node = new DefaultNodeModel("END", "rgb(192,255,0)");
                                    node.addInPort("In");
                                    break;
                                case "out":
                                    node = new DefaultNodeModel("START", "rgb(0,192,255)");
                                    node.addOutPort("Out");
                                    break;
                               
                                case "Hotspot":
                                    node = new HotspotNodeModel();
                                    node.addOutPort("Out");
                                    node.addInPort("In");
                                    break;
                                case "JsonNode":
                                    node = new JsonNodeModel();
                                    node.addOutPort("Out");
                                    node.addInPort("In");
                                    break;
                                case "ScHotspot":
                                    node = new SceneHotspotNodeModel();
                                    node.addOutPort("Out");
                                    node.addInPort("In");
                                    break;
                                case "File":
                                    node = new FileNodeModel();
                                    node.addOutPort("output");
                                    break;
                                default :
                                    console.log("Error in Switch");
                                    break;

                            }
                            let points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
                            node.x = points.x;
                            node.y = points.y;
                            this.props.app
                                .getDiagramEngine()
                                .getDiagramModel()
                                .addNode(node);
                            this.forceUpdate();
                        }}
                        onDragOver={event => {
                            event.preventDefault();
                        }}
                    >
                        {/* smartRouting={true}  */}
                        <DiagramWidget className="srd-demo-canvas" diagramEngine={this.props.app.getDiagramEngine()} allowLooseLinks={false}  maxNumberPointsPerLink="0"  />
                    </div>
                </div>
            </div>
                    </Card>
                    </Col>
                    </Row>
                    </Container>
          
        );
    }
}
