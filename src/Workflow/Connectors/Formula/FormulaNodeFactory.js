import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { FormulaNodeModel } from "./FormulaNodeModel";
import { FormulaNodeWidget } from "./FormulaNodeWidget";


export class FormulaNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Formula");
    }

    generateReactWidget(diagramEngine, node) {
        return <FormulaNodeWidget node={node} />;
    }

    getNewInstance() {
        return new FormulaNodeModel();
    }
}


