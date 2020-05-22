import {UnionPortModel} from "./UnionPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class UnionPortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new UnionPortModel(true, Toolkit.UID(), "unknown");
    }
}
