import {FilePortModel} from "./FilePortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class FilePortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new FilePortModel(true, Toolkit.UID(), "unknown");
    }
}
