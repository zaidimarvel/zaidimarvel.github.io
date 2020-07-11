import * as SRD from "storm-react-diagrams";
import React from 'react';
import { SceneNodeFactory } from "./Custom/Factories/SceneNodeFactory";
import { SceneNodeModel } from "./Custom/Models/SceneNodeModel";
import { HotspotNodeFactory } from "./Custom/Factories/HotspotNodeFactory";
import { HotspotNodeModel } from "./Custom/Models/HotspotNodeModel";
import { CustomDiagramWidget } from "./Custom/Widgets/CustomDiagramWidget";

let engine = new SRD.DiagramEngine();
engine.installDefaultFactories();

// 1) Register custom node
engine.registerNodeFactory(new SceneNodeFactory());
engine.registerNodeFactory(new HotspotNodeFactory());

// 2) setup the diagram model
let model = new SRD.DiagramModel();

// 3) create a default node
let node1 = new SRD.DefaultNodeModel("START", "rgb(0,192,255)");
node1.addOutPort("Out");
node1.setPosition(100, 100);

// 4) create custom node
let node2 = new SceneNodeModel();
node2.addOutPort("Out");
node2.addInPort("In");
node2.setPosition(400, 100);

let node3 = new HotspotNodeModel();
var port1 =  node3.addOutPort("Out");
node3.addInPort("In");
node3.setPosition(100, 400);

let node4 = new SRD.DefaultNodeModel("END", "rgb(192,255,0)");
var port2 =  node4.addInPort("In");
node4.setPosition(600, 400);
// Const pathfinding = engine.getLinkFactories().getFactory<SRD.PathFindingLinkFactory>(PathFindingLinkFactory.NAME);
var link1 = port1.link(port2);
link1.addLabel('Hello World!');

// 6) add the models to the root graph
model.addAll(node1, node2, node3, node4, link1);

// 7) load model into engine
engine.setDiagramModel(model);

console.log(JSON.stringify(model.serializeDiagram()));

export default function SimpleDiagramWidget() {
    return <CustomDiagramWidget diagramEngine={engine} smartRouting={true}   maxNumberPointsPerLink="0" className='srd-demo-canvas'/>;
}
