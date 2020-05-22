import * as React from "react";
import {PortWidget,BaseWidget} from "storm-react-diagrams";

export class TextToColumnPortLabel extends BaseWidget {
    constructor(props) {
        super("srd-default-port", props);
    }

    getClassName() {
        return super.getClassName() + this.bem("--out");
    }

    render() {
        return (
            <div {...this.getProps()}>
                <PortWidget className={this.props.model.label} node={this.props.model.getParent()} name={this.props.model.name} />
            </div>
        );
    }
}
