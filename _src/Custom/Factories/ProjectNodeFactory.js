import * as SRD from "storm-react-diagrams";
import * as React from "react";
import { ProjectNodeModel } from "../Models/ProjectNodeModel";
import { ProjectNodeWidget } from "../Widgets/ProjectNodeWidget";

export class ProjectNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("Project");
    }

    generateReactWidget(diagramEngine, node) {
        return <ProjectNodeWidget node={node} />;
    }

    getNewInstance() {
        return new ProjectNodeModel();
    }
}
