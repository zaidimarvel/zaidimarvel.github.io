import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

export class HotspotNodeModel extends NodeModel {
    constructor() {
        super("Hotspot");
        this.hotspot_id = "";
        this.next_scene_id = "";
        this.img_source = "";
        this.hwidth = 0;
        this.hheight = 0;
        this.dormant = false;
    }

    updateHotspotId = (e) => {
        this.hotspot_id = e.target.value;
        console.log(this.hotspot_id);
    };
    updateNextId = (e) => {
        this.next_scene_id = e.target.value;
        console.log(this.next_scene_id);
    };
    updateImgSource = (e) => {
        this.img_source = e.target.value;
        console.log(this.img_source);
    };
    updatehwidth = (e) => {
        this.hwidth = e.target.value;
        console.log(this.hwidth);
    };
    updatehheight = (e) => {
        this.hheight = e.target.value;
        console.log(this.hheight);
    };
    updateDormant = (e) => {
        this.dormant = !!e.target.checked;
        console.log(this.dormant);
    };

    serialize() {
        return _.merge(super.serialize(), {
            next_scene_id: this.next_scene_id,
            hotspot_id: this.hotspot_id,
            img_source: this.img_source,
            width: this.hwidth,
            height: this.hheight,
            dormant: this.dormant,
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
