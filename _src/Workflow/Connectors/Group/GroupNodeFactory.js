import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { GroupNodeModel } from "./GroupNodeModel";
import { GroupNodeWidget } from "./GroupNodeWidget";


export class GroupNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Group");
    }

    generateReactWidget(diagramEngine, node) {
        return <GroupNodeWidget node={node} />;
    }

    getNewInstance() {
        return new GroupNodeModel();
    }
}


