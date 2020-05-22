import {PeekPortModel} from "./PeekPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class PeekPortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new PeekPortModel(true, Toolkit.UID(), "unknown");
    }
}
