import * as SRD from "storm-react-diagrams";
import * as React from "react";
import * as _ from "lodash";
import PropTypes from 'prop-types';

export class JsonNodeWidget extends React.Component {
    static propTypes = {
        node: PropTypes.any,
    };

    constructor(props,) {
        super(props);
        this.textRef = React.createRef();
        console.log(props);
    }

    generatePort(port) {
        return <SRD.DefaultPortLabel model={port} key={port.id}/>;
    }

    toggleTextArea() {
        let textNode = this.textRef.current;
        if(textNode.style.display === "none")
            textNode.style.display = "block";
        else
            textNode.style.display = "none";
    }

    render() {
        return (
            <div className="widget-div" style={{ backgroundColor: "#ff5d5d" }}>
                <div className="widget-label">JSON : </div>
                <button onClick={this.toggleTextArea.bind(this)}>Toggle</button>
                <textarea ref={this.textRef} onBlur={this.props.node.updateJson} rows="3" style={{ display:"none" }} />
                <div className="widget-port">
                    <div className="left-port">
                        {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
                    </div>
                    <div className="right-port">
                        {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
                    </div>
                </div>
            </div>
        );
    }

}
