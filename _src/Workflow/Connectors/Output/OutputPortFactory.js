import {OutputPortModel} from "./OutputPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class OutputPortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new OutputPortModel(true, Toolkit.UID(), "unknown");
    }
}
