import {TextToColumnPortModel} from "./TextToColumnPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class TextToColumnPortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new TextToColumnPortModel(true, Toolkit.UID(), "unknown");
    }
}
