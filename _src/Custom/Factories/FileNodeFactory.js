import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { FileNodeModel } from "../Models/FileNodeModel";
import { FileNodeWidget } from "../Widgets/FileNodeWidget";


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


