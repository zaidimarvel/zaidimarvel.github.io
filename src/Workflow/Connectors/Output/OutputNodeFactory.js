import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { OutputNodeModel } from "./OutputNodeModel";
import { OutputNodeWidget } from "./OutputNodeWidget";


export class OutputNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Output");
    }

    generateReactWidget(diagramEngine, node) {
        return <OutputNodeWidget node={node} />;
    }

    getNewInstance() {
        return new OutputNodeModel();
    }
}


