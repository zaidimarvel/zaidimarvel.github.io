import {StartPortModel} from "../Ports/StartPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class StartPortFactory extends AbstractPortFactory {
    constructor() {
        super("Start");
    }
    getNewInstance(initialConfig) {
        return new StartPortModel(true, Toolkit.UID(), "unknown");
    }
}
