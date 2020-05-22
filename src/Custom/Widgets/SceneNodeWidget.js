import * as SRD from "storm-react-diagrams";
import * as React from "react";
import * as _ from "lodash";
import PropTypes from 'prop-types';

export class SceneNodeWidget extends React.Component{
    static propTypes = {
        node: PropTypes.any,
    };

    constructor(props,){
        super(props);
        console.log(props);
    }

    generatePort(port) {
        return <SRD.DefaultPortLabel model={port} key={port.id} />;
    }

    render(){
        return (<div className="widget-div" style={{ backgroundColor: "#FFF" }}>
                    <div className="widget-label">Scene :</div>
                    <div className="widget-content">
                        <div>
                            <label>scene_id : </label>
                            <input onBlur={this.props.node.updateId} type="text"/>
                        </div>
                        <div>
                            <label>pano_source : </label>
                            <input onBlur={this.props.node.updateSource} type="text"/>
                        </div>
                        <div>
                            <label>initial_yaw : </label>
                            <input onBlur={this.props.node.updateYaw} type="number"/>
                        </div>
                        <div>
                            <label>reset_rotation : </label>
                            <input onChange={this.props.node.updateRotation} type="checkbox"/>
                        </div>
                    </div>
                    <div className="widget-port">
                        <div className="left-port">
                            {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
                        </div>
                        <div className="right-port">
                            {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
                        </div>
                    </div>
                 </div>);
    }
}
