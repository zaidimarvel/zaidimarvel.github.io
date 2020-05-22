import * as _ from "lodash";

import { DiagramEngine, LinkModel, DefaultPortModel, PortModel } from "storm-react-diagrams";

import { CustomLinkModel } from "./CustomLinkModel";

/**
 * Diagram Port Model
 *
 * @class ReactDatabaseDiagramPortModel
 * @extends {PortModel}
 */
export class StartPortModel extends DefaultPortModel {
  

  constructor(pos = "top") {
    super(pos);
    // this.position = pos;
    super.maximumLinks = 1;
    this.position = pos;
  }

  deSerialize(data, engine) {
    super.deSerialize(data, engine);

    this.position = data.position;
  }

  serialize() {
    return _.merge(super.serialize(), {
      in: this.in,
      label: this.label,
      position: this.position,
    });
  }

  link(port) {
    const link = this.createLinkModel();
    link.setSourcePort(this);
    link.setTargetPort(port);
    return link;
  }

  createLinkModel() {
    const link = super.createLinkModel();
    return link || new CustomLinkModel();
  }
}

export default StartPortModel;
