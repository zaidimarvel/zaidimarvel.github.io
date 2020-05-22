import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { CleanupNodeModel } from "./CleanupNodeModel";
import { CleanupNodeWidget } from "./CleanupNodeWidget";


export class CleanupNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Cleanup");
    }

    generateReactWidget(diagramEngine, node) {
        return <CleanupNodeWidget node={node} />;
    }

    getNewInstance() {
        return new CleanupNodeModel();
    }
}


