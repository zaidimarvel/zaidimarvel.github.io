import * as SRD from "storm-react-diagrams";
import * as React from "react";
import * as _ from "lodash";
import PropTypes from 'prop-types';

import {StartPortLabel} from "../Ports/StartPortLabelWidget";
import "../NodeStyles/file-node.css";

export class StartNodeWidget extends React.Component {
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
        return <SRD.DefaultPortLabel model={port} key={port.id} />;
    }

    generateStartPort(port) {
        // return <SRD.DefaultPortLabel model={port} key={port.id} />;
        return <StartPortLabel model={port} key={port.id}/>;
    }
 
  
    createMarkup() {
        return <div>
        <i className="fas fa-play-circle"  style={{
              fontSize: "2.3em"
            }}/>
            </div>;
      }

    render() {
        
        return (
            <div className="file-node">
                <div className="left-port">
                {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
                </div>
                {/* onClick={()=>{this._clickHeader()}} onBlur={(e)=>{this._blurHeader(e)}} ref={this.headerRef}  */}
                <div contentEditable={false} className="scene">
                {this.createMarkup()}
                </div>
                <div className="right-port">
                    {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
                </div>
            <p className="label--desc">Label here tue the eh tetetetet </p>

            </div>
           
            );
    }
}
