import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";

export class PeekNodeModel extends NodeModel {
    constructor() {
        super("Peek");
        this.name = "";
        this.properties = {
            input: [],
            name: 'Peek Widget',
            type: 'multiple',
            maxLinks: 1,
            outputData: [],
            message: "Peek Tool"
        }
    }
   
    addOutPort(label) {
        return this.addPort(new DefaultPortModel(false, label, label));
    }
    addInPort(label) {
         
        return this.addPort(new DefaultPortModel(true, label, label));
    }
    printResults(node, port){

        // console.log(node);
        // console.log(port);
    
        // return node.properties.outputData
        switch(port){
            case 'input':
              return node.properties.input == null ? []: node.properties.input
            case 'output':
              return node.properties.outputData == null ? []: node.properties.outputData
          }
    
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
