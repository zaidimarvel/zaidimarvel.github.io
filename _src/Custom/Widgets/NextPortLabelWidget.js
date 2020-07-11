import * as React from "react";
import {PortWidget,BaseWidget} from "storm-react-diagrams";

export class NextPortLabel extends BaseWidget {
    constructor(props) {
        super("srd-default-port", props);
        
    }

    getClassName() {
        return super.getClassName() + this.bem("--out");
    }

    render() {
        return (
            <div {...this.getProps()}>
                <div className="name">{this.props.model.label}</div>
                <PortWidget node={this.props.model.getParent()} name={this.props.model.name} />
            </div>
        );
    }
}
