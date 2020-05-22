import * as SRD from "storm-react-diagrams";
import * as React from "react";
import { SceneHotspotNodeModel } from "../Models/SceneHotspotNodeModel";
import { SceneHotspotNodeWidget } from "../Widgets/SceneHotspotNodeWidget";

export class SceneHotspotNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("ScHotspot");
    }

    generateReactWidget(diagramEngine, node) {
        return <SceneHotspotNodeWidget node={node} />;
    }

    getNewInstance() {
        return new SceneHotspotNodeModel();
    }
}
