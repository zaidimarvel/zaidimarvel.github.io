import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { UniqueNodeModel } from "./UniqueNodeModel";
import { UniqueNodeWidget } from "./UniqueNodeWidget";


export class UniqueNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Unique");
    }

    generateReactWidget(diagramEngine, node) {
        return <UniqueNodeWidget node={node} />;
    }

    getNewInstance() {
        return new UniqueNodeModel();
    }
}


