import * as SRD from "storm-react-diagrams";
import {FileNodeFactory} from "../Workflow/Connectors/FileInput/FileNodeFactory";
import {FilePortFactory} from "../Workflow/Connectors/FileInput/FilePortFactory";

import {FilterNodeFactory} from "../Workflow/Connectors/Filter/FilterNodeFactory";
import {FilterPortFactory} from "../Workflow/Connectors/Filter/FilterPortFactory";

import {FormulaNodeFactory} from "../Workflow/Connectors/Formula/FormulaNodeFactory";
import {FormulaPortFactory} from "../Workflow/Connectors/Formula/FormulaPortFactory";

import {UnionNodeFactory} from "../Workflow/Connectors/Union/UnionNodeFactory";
import {UnionPortFactory} from "../Workflow/Connectors/Union/UnionPortFactory";

import {UniqueNodeFactory} from "../Workflow/Connectors/Unique/UniqueNodeFactory";
import {UniquePortFactory} from "../Workflow/Connectors/Unique/UniquePortFactory";

import {PeekNodeFactory} from "../Workflow/Connectors/Peek/PeekNodeFactory";
import {PeekPortFactory} from "../Workflow/Connectors/Peek/PeekPortFactory";


import {SelectNodeFactory} from "../Workflow/Connectors/Select/SelectNodeFactory";
import {SelectPortFactory} from "../Workflow/Connectors/Select/SelectPortFactory";

import {CleanupNodeFactory} from "../Workflow/Connectors/Cleanup/CleanupNodeFactory";
import {CleanupPortFactory} from "../Workflow/Connectors/Cleanup/CleanupPortFactory";

import {GroupNodeFactory} from "../Workflow/Connectors/Group/GroupNodeFactory";
import {GroupPortFactory} from "../Workflow/Connectors/Group/GroupPortFactory";

import {OutputNodeFactory} from "../Workflow/Connectors/Output/OutputNodeFactory";
import {OutputPortFactory} from "../Workflow/Connectors/Output/OutputPortFactory";

import {SortNodeFactory} from "../Workflow/Connectors/Sort/SortNodeFactory";
import {SortPortFactory} from "../Workflow/Connectors/Sort/SortPortFactory";

import {SampleNodeFactory} from "../Workflow/Connectors/Sample/SampleNodeFactory";
import {SamplePortFactory} from "../Workflow/Connectors/Sample/SamplePortFactory";

import {ReplaceNodeFactory} from "../Workflow/Connectors/Replace/ReplaceNodeFactory";
import {ReplacePortFactory} from "../Workflow/Connectors/Replace/ReplacePortFactory";

import {TextToColumnNodeFactory} from "../Workflow/Connectors/TextToColumn/TextToColumnNodeFactory";
import {TextToColumnPortFactory} from "../Workflow/Connectors/TextToColumn/TextToColumnPortFactory";

import {JoinNodeFactory} from "../Workflow/Connectors/Join/JoinNodeFactory";
import {JoinPortFactory} from "../Workflow/Connectors/Join/JoinPortFactory";

export class Application {
    constructor() {
        this.diagramEngine = new SRD.DiagramEngine();
        this.diagramEngine.installDefaultFactories();
        this.diagramEngine.registerNodeFactory(new FileNodeFactory());
        this.diagramEngine.registerNodeFactory(new FilePortFactory());
        this.diagramEngine.registerNodeFactory(new FilterNodeFactory());
        this.diagramEngine.registerNodeFactory(new FilterPortFactory());

        this.diagramEngine.registerNodeFactory(new FormulaNodeFactory());
        this.diagramEngine.registerNodeFactory(new FormulaPortFactory());

        this.diagramEngine.registerNodeFactory(new UnionNodeFactory());
        this.diagramEngine.registerNodeFactory(new UnionPortFactory());

        this.diagramEngine.registerNodeFactory(new UniqueNodeFactory());
        this.diagramEngine.registerNodeFactory(new UniquePortFactory());

        this.diagramEngine.registerNodeFactory(new PeekNodeFactory());
        this.diagramEngine.registerNodeFactory(new PeekPortFactory());

        this.diagramEngine.registerNodeFactory(new SelectNodeFactory());
        this.diagramEngine.registerNodeFactory(new SelectPortFactory());

        this.diagramEngine.registerNodeFactory(new CleanupNodeFactory());
        this.diagramEngine.registerNodeFactory(new CleanupPortFactory());


        this.diagramEngine.registerNodeFactory(new GroupNodeFactory());
        this.diagramEngine.registerNodeFactory(new GroupPortFactory());

        this.diagramEngine.registerNodeFactory(new OutputNodeFactory());
        this.diagramEngine.registerNodeFactory(new OutputPortFactory());

        this.diagramEngine.registerNodeFactory(new SortNodeFactory());
        this.diagramEngine.registerNodeFactory(new SortPortFactory());

        this.diagramEngine.registerNodeFactory(new SampleNodeFactory());
        this.diagramEngine.registerNodeFactory(new SamplePortFactory());

        this.diagramEngine.registerNodeFactory(new ReplaceNodeFactory());
        this.diagramEngine.registerNodeFactory(new ReplacePortFactory());

        this.diagramEngine.registerNodeFactory(new TextToColumnNodeFactory());
        this.diagramEngine.registerNodeFactory(new TextToColumnPortFactory());

        this.diagramEngine.registerNodeFactory(new JoinNodeFactory());
        this.diagramEngine.registerNodeFactory(new JoinPortFactory());

        

        // this.newModel();
    }
    newModel() {
       
        //initial map model
        // let node1 = new ProjectNodeModel();
        // node1.setPosition(80,80);
        // this.activeModel.addAll(node1);
    }
    getActiveDiagram() {
        return this.activeModel;
    }

    getDiagramEngine() {
        return this.diagramEngine;
    }
}
