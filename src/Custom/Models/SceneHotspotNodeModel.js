import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import { NextPortModel } from "./NextPortModel";
import * as _ from "lodash";

export class SceneHotspotNodeModel extends NodeModel {
    constructor() {
        super("ScHotspot");
        this.hotspot_ids = [];
        this.scene_id = "";
        this.next_scene_id = "";
    }

    updateId = (e) => {
        this.scene_id = e.target.value;
        console.log("id",this.scene_id);
    };
    updateNextId = (e) => {
        this.next_scene_id = e.target.value;
        console.log("next id",this.next_scene_id);
    };
    removeHsId = (id) => {
        this.hotspot_ids = _.filter(this.hotspot_ids,function(o) { return o.id !== id; });
        console.log("hsId",this.hotspot_ids);
    };
    updateHsId = (e,id,portId) => {
        console.log(e.target.value,id,portId);
        this.hotspot_ids.push({
           id: id,
           hotspot_id: e.target.value,
           port_id: portId
        });
        console.log("hsId",this.hotspot_ids);
    };

    serialize() {
        return _.merge(super.serialize(), {
            scene_id: this.scene_id,
            next_scene_id: this.next_scene_id,
            hotspot_ids: this.hotspot_ids
        });
    }
    deSerialize(object, engine) {
        super.deSerialize(object, engine);
        this.scene_id = object.scene_id;
        this.next_scene_id = object.next_scene_id;
        this.hotspot_ids = object.hotspot_ids;
    }

    addInPort(label) {
        return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
    }
    addOutPort(label) {
        return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
    }
    addNextPort(label) {
        return this.addPort(new NextPortModel(true, Toolkit.UID(), label));
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
    getNextPorts() {
        return _.filter(this.ports, portModel => {
            return portModel.next;
        });
    }
}
