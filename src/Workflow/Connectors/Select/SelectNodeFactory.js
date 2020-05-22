import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { SelectNodeModel } from "./SelectNodeModel";
import { SelectNodeWidget } from "./SelectNodeWidget";


export class SelectNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Select");
    }

    generateReactWidget(diagramEngine, node) {
        return <SelectNodeWidget node={node} />;
    }

    getNewInstance() {
        return new SelectNodeModel();
    }
}


