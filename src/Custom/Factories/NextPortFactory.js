import {NextPortModel} from "../Models/NextPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class NextPortFactory extends AbstractPortFactory {
    constructor() {
        super("Next");
    }
    getNewInstance(initialConfig) {
        return new NextPortModel(true, Toolkit.UID(), "unknown");
    }
}
