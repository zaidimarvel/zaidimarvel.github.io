import * as SRD from "storm-react-diagrams";
import { FormulaNodeModel } from "../Models/FormulaNodeModel";
import { FormulaNodeWidget } from "../Widgets/FormulaNodeWidget";
import * as React from "react";

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


