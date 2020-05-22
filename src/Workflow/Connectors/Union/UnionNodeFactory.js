import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { UnionNodeModel } from "./UnionNodeModel";
import { UnionNodeWidget } from "./UnionNodeWidget";


export class UnionNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Union");
    }

    generateReactWidget(diagramEngine, node) {
        return <UnionNodeWidget node={node} />;
    }

    getNewInstance() {
        return new UnionNodeModel();
    }
}


