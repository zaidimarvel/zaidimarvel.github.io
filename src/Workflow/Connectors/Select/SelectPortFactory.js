import {SelectPortModel} from "./SelectPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class SelectPortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new SelectPortModel(true, Toolkit.UID(), "unknown");
    }
}
