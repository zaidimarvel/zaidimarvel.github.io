import {ReplacePortModel} from "./ReplacePortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class ReplacePortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new ReplacePortModel(true, Toolkit.UID(), "unknown");
    }
}
