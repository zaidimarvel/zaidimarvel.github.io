import * as SRD from "storm-react-diagrams";
import * as React from "react";
import { Scene2NodeModel } from "../Models/Scene2NodeModel";
import { Scene2NodeWidget } from "../Widgets/Scene2NodeWidget";

export class Scene2NodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Scene2");
    }

    generateReactWidget(diagramEngine, node) {
        return <Scene2NodeWidget node={node} />;
    }

    getNewInstance() {
        return new Scene2NodeModel();
    }
}
