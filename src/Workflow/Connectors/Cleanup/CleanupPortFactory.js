import {CleanupPortModel} from "./CleanupPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class CleanupPortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new CleanupPortModel(true, Toolkit.UID(), "unknown");
    }
}
