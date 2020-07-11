import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

export class SceneNodeModel extends NodeModel {
    constructor() {
        super("Scene");
        this.scene_id = 0;
        this.initial_yaw = 0;
        this.reset_rotation = true;
        this.pano_source = "";
    }

    updateId = (e) => {
        this.scene_id = e.target.value;
        console.log(this.scene_id);
    };
    updateSource = (e) => {
        this.pano_source = e.target.value;
        console.log(this.pano_source);
    };
    updateYaw = (e) => {
        this.initial_yaw = e.target.value;
        console.log(this.initial_yaw);
    };
    updateRotation = (e) => {
        this.reset_rotation = !!e.target.checked;
        console.log(this.reset_rotation);
    };

    serialize() {
        return _.merge(super.serialize(), {
            scene_id: this.scene_id,
            initial_yaw: this.initial_yaw,
            reset_rotation: this.reset_rotation,
            pano_source: this.pano_source,
        });
    }

    addInPort(label) {
        return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
    }
    addOutPort(label) {
        return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
    }

    getInPorts() {
        return _.filter(this.ports, portModel => {
            return portModel.in;
        });
    }
    getOutPorts() {
        return _.filter(this.ports, portModel => {
            return !portModel.in;
        });
    }
}
