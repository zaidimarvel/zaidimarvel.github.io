import {FilterPortModel} from "./FilterPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class FilterPortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new FilterPortModel(true, Toolkit.UID(), "unknown");
    }
}
