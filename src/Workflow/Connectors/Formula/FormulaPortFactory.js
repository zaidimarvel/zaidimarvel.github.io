import {FormulaPortModel} from "./FormulaPortModel";
import {AbstractPortFactory, Toolkit} from "storm-react-diagrams";

export class FormulaPortFactory extends AbstractPortFactory {
    constructor() {
        super("unknown");
    }
    getNewInstance(initialConfig) {
        return new FormulaPortModel(true, Toolkit.UID(), "unknown");
    }
}
