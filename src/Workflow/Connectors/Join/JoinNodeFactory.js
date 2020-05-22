import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { JoinNodeModel } from "./JoinNodeModel";
import { JoinNodeWidget } from "./JoinNodeWidget";


export class JoinNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Join");
    }

    generateReactWidget(diagramEngine, node) {
        return <JoinNodeWidget node={node} />;
    }

    getNewInstance() {
        return new JoinNodeModel();
    }
}


