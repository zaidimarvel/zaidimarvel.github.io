import {GroupPortModel} from "./GroupPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class GroupPortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new GroupPortModel(true, Toolkit.UID(), "unknown");
    }
}
