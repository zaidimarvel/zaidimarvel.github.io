import * as React from "react";
import * as SRD from "storm-react-diagrams";
import { FilterNodeModel } from "./FilterNodeModel";
import { FilterNodeWidget } from "./FilterNodeWidget";


export class FilterNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Filter");
    }

    generateReactWidget(diagramEngine, node) {
        return <FilterNodeWidget node={node} />;
    }

    getNewInstance() {
        return new FilterNodeModel();
    }
}


