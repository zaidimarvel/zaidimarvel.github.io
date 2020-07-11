import * as SRD from "storm-react-diagrams";
import { JsonNodeModel } from "../Models/JsonNodeModel";
import { JsonNodeWidget } from "../Widgets/JsonNodeWidget";
import * as React from "react";

export class JsonNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("JsonNode");
    }

    generateReactWidget(diagramEngine, node) {
        return <JsonNodeWidget node={node} />;
    }

    getNewInstance() {
        return new JsonNodeModel();
    }
}
