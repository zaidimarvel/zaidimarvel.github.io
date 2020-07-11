import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { SortNodeModel } from "./SortNodeModel";
import { SortNodeWidget } from "./SortNodeWidget";


export class SortNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Sort");
    }

    generateReactWidget(diagramEngine, node) {
        return <SortNodeWidget node={node} />;
    }

    getNewInstance() {
        return new SortNodeModel();
    }
}


