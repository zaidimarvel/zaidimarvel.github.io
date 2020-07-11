import * as SRD from "storm-react-diagrams";
import * as React from "react";
import * as _ from "lodash";
import PropTypes from 'prop-types';

import {UniquePortLabel} from "./UniquePortLabelWidget";
import "./unique-node.css";

export class UniqueNodeWidget extends React.Component {
    static propTypes = {
        node: PropTypes.any,
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.headerRef =  React.createRef();
    }

    _clickHeader = () => {
        this.headerRef.current.contentEditable = true;
    };
    _blurHeader = (e) => {
        this.headerRef.current.contentEditable = false;
        this.props.node.updateName(e);
    };

    generatePort(port) {
        return <UniquePortLabel model={port} key={port.id}/>;
    }
    createMarkup() {
        return <div>
        <i className="fa fa-code-branch"  style={{
              fontSize: "1.5em"
            }}/>
            </div>;
      }

    render() {
        return (
            <div className="unique-node">
               <div className="left-port">
                {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
                </div>
                <div className="scene">
                {this.createMarkup()}
                </div>
                <div className="right-port">
                    {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
                </div>
            </div>);
    }
}
