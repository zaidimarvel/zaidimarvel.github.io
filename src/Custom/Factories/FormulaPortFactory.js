import {FormularPortModel} from "../Ports/FormularPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class FormularPortFactory extends AbstractPortFactory {
    constructor() {
        super("Formula");
    }
    getNewInstance(initialConfig) {
        return new FormularPortModel(true, Toolkit.UID(), "unknown");
    }
}
