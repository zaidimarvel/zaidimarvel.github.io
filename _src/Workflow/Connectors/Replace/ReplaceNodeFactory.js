import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { ReplaceNodeModel } from "./ReplaceNodeModel";
import { ReplaceNodeWidget } from "./ReplaceNodeWidget";


export class ReplaceNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Replace");
    }

    generateReactWidget(diagramEngine, node) {
        return <ReplaceNodeWidget node={node} />;
    }

    getNewInstance() {
        return new ReplaceNodeModel();
    }
}


