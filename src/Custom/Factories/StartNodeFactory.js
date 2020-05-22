import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { StartNodeModel } from "../Models/StartNodeModel";
import { StartNodeWidget } from "../Widgets/StartNodeWidget";

export class StartNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Start");
    }

    generateReactWidget(diagramEngine, node) {
        return <StartNodeWidget node={node} />;
    }

    getNewInstance() {
        return new StartNodeModel();
    }
}
