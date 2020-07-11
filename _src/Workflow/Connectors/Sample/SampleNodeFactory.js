import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { SampleNodeModel } from "./SampleNodeModel";
import { SampleNodeWidget } from "./SampleNodeWidget";


export class SampleNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Sample");
    }

    generateReactWidget(diagramEngine, node) {
        return <SampleNodeWidget node={node} />;
    }

    getNewInstance() {
        return new SampleNodeModel();
    }
}


