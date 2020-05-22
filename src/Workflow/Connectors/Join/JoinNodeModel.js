import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import * as _ from "lodash";
import JoinPortModel from './JoinPortModel'

export class JoinNodeModel extends NodeModel {
    constructor() {
        super("Join");
        this.properties = {
            leftInput: [],
            rightInput: [],
            type: 'multiple',
            maxLinks: 1,
            name: 'Join Widget',
                  leftData: [],
                  rightData: [],
                  innerData: [],
                  message: "Join Tool",
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
            case 'left':
                return node.properties.leftInput
            case 'right':
                return node.properties.rightInput
            case 'ljoin':
                return node.properties.leftData
            case 'ijoin':
                return node.properties.innerData
            case 'rjoin':
                return node.properties.rightData
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
