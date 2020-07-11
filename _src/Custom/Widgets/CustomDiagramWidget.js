import * as SRD from "storm-react-diagrams";
import * as _ from "lodash";

export class CustomDiagramWidget extends SRD.DiagramWidget {
    onKeyUp(event) {
        //overriding this func
        if ([35].indexOf(event.keyCode) !== -1) {
            _.forEach(this.props.diagramEngine.getDiagramModel().getSelectedItems(), element => {
                //only delete items which are not locked
                if (!this.props.diagramEngine.isModelLocked(element)) {
                    element.remove();
                }
            });
            this.forceUpdate();
        }
    }
}
