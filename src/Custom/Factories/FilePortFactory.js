import {FilePortModel} from "../Ports/FilePortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class FilePortFactory extends AbstractPortFactory {
    constructor() {
        super("File");
    }
    getNewInstance(initialConfig) {
        return new FilePortModel(true, Toolkit.UID(), "unknown");
    }
}
