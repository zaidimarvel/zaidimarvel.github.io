import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";
import UniquePortModel from './UniquePortModel'

export class UniqueNodeModel extends NodeModel {
    constructor() {
        super("Unique");
        this.properties = {
            input: [],
            maxLinks: 1,
            type: 'multiple',
            name: 'Unique Widget',
            outputData: [],
            message: "Unique Tool",
            duplicateData: [],
            uniqueData: []
          }
    }
   
    addOutPort(label) {
        return this.addPort(new DefaultPortModel(false,label, label));
    }
    addInPort(label) {
         
        return this.addPort(new DefaultPortModel(true,label, label));
    }
    printResults(node,port){

        // console.log(node);
        // console.log(port);
        switch(port)
        {
            case 'unique':
                return node.properties.uniqueData
            case 'duplicate':
                return node.properties.duplicateData
        }
        
        return node.properties.input
        
    
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
