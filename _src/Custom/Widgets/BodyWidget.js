import * as React from "react";
import * as _ from "lodash";

import { TrayItemWidget } from "./TrayItemWidget";
import { TrayWidget } from "./TrayWidget";

import { DefaultNodeModel, DiagramModel, DiagramWidget } from "storm-react-diagrams";
import { FileNodeModel } from "../Models/FileNodeModel";
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
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
                       
                        <TrayItemWidget model={{ type: "File" }} name="File"  icon="eye" color="primary" /> 
                       
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
                               
                                case "File":
                                    node = new FileNodeModel();
                                    node.addOutPort("output");
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
