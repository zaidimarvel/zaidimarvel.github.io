import {SamplePortModel} from "./SamplePortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class SamplePortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new SamplePortModel(true, Toolkit.UID(), "unknown");
    }
}
