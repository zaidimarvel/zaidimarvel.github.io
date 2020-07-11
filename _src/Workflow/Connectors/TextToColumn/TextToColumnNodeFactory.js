import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { TextToColumnNodeModel } from "./TextToColumnNodeModel";
import { TextToColumnNodeWidget } from "./TextToColumnNodeWidget";


export class TextToColumnNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("TextToColumn");
    }

    generateReactWidget(diagramEngine, node) {
        return <TextToColumnNodeWidget node={node} />;
    }

    getNewInstance() {
        return new TextToColumnNodeModel();
    }
}


