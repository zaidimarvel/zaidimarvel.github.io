import {SortPortModel} from "./SortPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class SortPortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new SortPortModel(true, Toolkit.UID(), "unknown");
    }
}
