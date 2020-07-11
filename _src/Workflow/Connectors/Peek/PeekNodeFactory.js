import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { PeekNodeModel } from "./PeekNodeModel";
import { PeekNodeWidget } from "./PeekNodeWidget";


export class PeekNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Peek");
    }

    generateReactWidget(diagramEngine, node) {
        return <PeekNodeWidget node={node} />;
    }

    getNewInstance() {
        return new PeekNodeModel();
    }
}


