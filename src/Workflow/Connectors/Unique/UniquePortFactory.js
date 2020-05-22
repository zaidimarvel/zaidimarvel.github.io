import {UniquePortModel} from "./UniquePortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class UniquePortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new UniquePortModel(true, Toolkit.UID(), "unknown");
    }
}
