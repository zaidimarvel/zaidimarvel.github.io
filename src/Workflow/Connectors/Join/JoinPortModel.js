import * as _ from "lodash";
import { PortModel, DefaultLinkModel, DefaultPortModel } from "storm-react-diagrams";

export class JoinPortModel extends PortModel {
    constructor(props){
        super(props);
    }

    link(port) {
        let link = this.createLinkModel();
        link.setSourcePort(this);
        link.setTargetPort(port);
        return link;
    }

    canLinkToPort(port) {
        if (port instanceof DefaultPortModel) {
            return this.next === port.in;
        }
        return true;
    }

    createLinkModel() {
        let link = super.createLinkModel();
        return link || new DefaultLinkModel();
    }
}

export default JoinPortModel
