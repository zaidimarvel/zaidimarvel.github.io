import {JoinPortModel} from "./JoinPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class JoinPortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new JoinPortModel(true, Toolkit.UID(), "unknown");
    }
}
