import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

export class JsonNodeModel extends NodeModel {
    constructor() {
        super("JsonNode");
        this.Json = "";
    }

    updateJson = (e) => {
        let jObj = JSON.parse(e.target.value);
        let pretty = JSON.stringify(jObj);
        this.Json = pretty;
        console.log(this.Json);
    };

    serialize() {
        return _.merge(super.serialize(), {
            Json: this.Json,
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
