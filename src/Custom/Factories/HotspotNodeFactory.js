import * as SRD from "storm-react-diagrams";
import * as React from "react";
import { HotspotNodeWidget } from "../Widgets/HotspotNodeWidget";
import { HotspotNodeModel } from "../Models/HotspotNodeModel";

export class HotspotNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Hotspot");
    }

    generateReactWidget(diagramEngine, node) {
        return <HotspotNodeWidget node={node} />;
    }

    getNewInstance() {
        return new HotspotNodeModel();
    }
}
