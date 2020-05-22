import { NodeModel, DefaultPortModel, Toolkit } from "storm-react-diagrams";
import FilePortModel from './FilePortModel'
import * as _ from "lodash";

export class FileNodeModel extends NodeModel {
    constructor() {
        super("File");
        this.name = "file";
        this.properties = {
            file: null,
            type: 'single',
            input: [],
            message: 'File Input',
            name: 'Input Widget',
            outputData: [],
            selected_sheet: null,
            start_index: '1',
            sheets: null,
            headers: [],
            messages: []
          }
    }
   
    addOutPort(label) {
        return this.addPort(new  FilePortModel(false, Toolkit.UID(), label));
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

    getOutPorts() {
        return _.filter(this.ports, portModel => {
            return (!portModel.in && !portModel.next);
        });
    }
}
