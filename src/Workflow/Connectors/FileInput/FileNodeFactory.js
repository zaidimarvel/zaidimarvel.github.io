import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { FileNodeModel } from "./FileNodeModel";
import { FileNodeWidget } from "./FileNodeWidget";


export class FileNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("File");
    }

    generateReactWidget(diagramEngine, node) {
        return <FileNodeWidget node={node} />;
    }

    getNewInstance() {
        return new FileNodeModel();
    }
}


