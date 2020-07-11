import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";


export class StartNodeModel extends NodeModel {
    constructor() {
        super("Start");
        this.name = "";

        
    }
    addInPort(label) {
         
        return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
    }
    addOutPort(label) {
        return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
    }

    updateName = (e) => {
         this.name = e.target.innerHTML;
         console.log(this.name);
    };

    serialize() {
        return _.merge(super.serialize(), {
            scene_name: this.name
        });
    }
    deSerialize(object, engine) {
        super.deSerialize(object, engine);
        this.name = object.scene_name;
    }

    getInPorts() {
        return _.filter(this.ports, portModel => {
            return portModel.in;
        });
    }
    getOutPorts() {
        
        return _.filter(this.ports, portModel => {
            return (!portModel.in && !portModel.next);
        });
    }
}
