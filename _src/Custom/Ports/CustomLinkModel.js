import * as _ from "lodash";

import { DefaultLinkModel } from "storm-react-diagrams";

/**
 *
 *
 * @class ReactDatabaseDiagramLinkModel
 * @extends {DefaultLinkModel}
 */
export class CustomLinkModel extends DefaultLinkModel {
  constructor(type) {
    super(type);
    this.width = 4;
  }
}

export default CustomLinkModel;
