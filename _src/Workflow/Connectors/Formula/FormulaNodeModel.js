import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

export class FormulaNodeModel extends NodeModel {
    constructor() {
        super("Formula");
        this.properties = {
            input: null,
            headers: [],
            type: 'multiple',
            maxLinks: 1,
            name: 'Formula Widget',
            outputData: null,
            message: "Formula Tool",
            columnFormulars: [
                {
                    column_name: 'new_col',
                    expression: '',
                    preview: '',
                },
            ]
          }
    }
   
    addOutPort(label) {
        return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
    }
    addInPort(label) {
         
        return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
    }
    printResults(node, port){

        // console.log(node);
        // console.log(port);
    
        return node.properties.outputData
    
      }

    updateName = (e) => {
         this.name = e.target.innerHTML;
         console.log(this.name);
    };

    serialize() {
        return _.merge(super.serialize(), {
            scene_name: this.name
        });
    }
    deSerialize(object, engine) {
        super.deSerialize(object, engine);
        this.name = object.scene_name;
    }
    getInPorts() {
        return _.filter(this.ports, portModel => {
            return portModel.in;
        });
    }

    getOutPorts() {
        return _.filter(this.ports, portModel => {
            return (!portModel.in && !portModel.next);
        });
    }
}
