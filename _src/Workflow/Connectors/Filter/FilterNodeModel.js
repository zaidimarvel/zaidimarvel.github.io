import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";
import FilterPortModel from './FilterPortModel'

export class FilterNodeModel extends NodeModel {
    constructor() {
        super("Filter");
        this.properties = {
            input: [],
            type: 'multiple',
            maxLinks: 1,
            name: 'Filter Widget',
                  trueData: [],
                  falseData: [],
                  message: "Filter Tool",
                  outputData: []
          }
    }
   
    addOutPort(label) {
        return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
    }
    addInPort(label) {
         
        return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
    }
    printResults(node,port){

        // console.log(node);
        // console.log(port);
        switch(port)
        {
            case 'true':
                return node.properties.trueData
            case 'false':
                return node.properties.falseData
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
