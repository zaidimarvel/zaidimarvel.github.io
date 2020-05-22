import * as _ from "lodash";
import { PortModel, DefaultLinkModel, DefaultPortModel } from "storm-react-diagrams";

export class FilePortModel extends PortModel {
    constructor(isInput, name, label){
        super(isInput, name, label)
        this.isInput = isInput;
        this.name = name;
        this.label = label
    }

    link(port) {
        let link = this.createLinkModel();
        link.setSourcePort(this);
        link.setTargetPort(port);
        return link;
    }

    canLinkToPort(port) {

        
        if (port instanceof DefaultPortModel) {
            return port.in;
        }
        return true;
    }

    createLinkModel() {
        let link = super.createLinkModel();
        return link || new DefaultLinkModel();
    }
}

export default FilePortModel