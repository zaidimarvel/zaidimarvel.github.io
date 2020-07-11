import * as SRD from "storm-react-diagrams";
import * as React from "react";
import * as _ from "lodash";
import PropTypes from 'prop-types';

export class HotspotNodeWidget extends React.Component {
    static propTypes = {
        node: PropTypes.any,
    };

    constructor(props) {
        super(props);
        console.log(props);
    }

    generatePort(port) {
        return <SRD.DefaultPortLabel model={port} key={port.id} />;
    }

    render() {
        return (<div className="widget-div" style={{ backgroundColor: "#AAA" }}>
                    <div className="widget-label">Hotspot :</div>
                    <div className="widget-content">
                        <div>
                            <label>hotspot_id : </label>
                            <input onBlur={this.props.node.updateHotspotId} type="text"/>
                        </div>
                        <div>
                            <label>next_scene_id : </label>
                            <input onBlur={this.props.node.updateNextId} type="text"/>
                        </div>
                        <div>
                            <label>img_source : </label>
                            <input onBlur={this.props.node.updateImgSource} type="text"/>
                        </div>
                        <div>
                            <label>Width : </label>
                            <input onBlur={this.props.node.updatehwidth} type="number"/>
                        </div>
                        <div>
                            <label>Height : </label>
                            <input onBlur={this.props.node.updatehheight} type="number"/>
                        </div>
                        <div>
                            <label>dormant : </label>
                            <input onChange={this.props.node.updateDormant} type="checkbox"/>
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
