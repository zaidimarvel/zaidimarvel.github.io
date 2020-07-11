import * as SRD from "storm-react-diagrams";
import * as React from "react";
import * as _ from "lodash";
import PropTypes from 'prop-types';
import {NextPortLabel} from "./NextPortLabelWidget";

export class SceneHotspotNodeWidget extends React.Component {
    static propTypes = {
        node: PropTypes.any,
    };

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            hotspot_ids: []
        };
    }

    generatePort(port) {
        return <SRD.DefaultPortLabel model={port} key={port.id}/>;
    }
    generateNextPort = (port) => {
        return <NextPortLabel model={port} key={port.id}/>;
    };

    _addElement = () => {
        let newH = Object.assign([], this.state.hotspot_ids);
        let next_id = (newH.length>0)?newH[newH.length-1].hotspot_id+1:1;
        newH.push({hotspot_id: next_id});
        this.setState({
            hotspot_ids: newH
        });
        console.log("ADD",newH);
        this.props.node.addNextPort("Nxt");
    };

    _removeHotspot = (hotspot, hsIndex) => {
        let prevH = Object.assign([], this.state.hotspot_ids);
        prevH = _.filter(prevH, (item) => item.hotspot_id !== hotspot.hotspot_id);
        console.log("SUB",prevH);
        this.setState({hotspot_ids: prevH});
        this.props.node.removePort(this.props.node.getNextPorts()[hsIndex]);
        this.props.node.removeHsId(hotspot.hotspot_id);
    };

    _generateHotspots = ()=> {
        return this.state.hotspot_ids.map((hotspot,index)=> (
            <div className="widget-hotspot" key={hotspot.hotspot_id}>
                <button className="widget-hotspot-del" onClick={()=>{this._removeHotspot(hotspot,index)}}>-</button>
                <div className="widget-hotspot-label">HS {hotspot.hotspot_id} : </div>
                <input className="widget-hotspot-input" onBlur={(e)=>{this.props.node.updateHsId(e,hotspot.hotspot_id,this.props.node.getNextPorts()[index].id)}} defaultValue={this.props.node.hotspot_ids["hotspot_"+hotspot.hotspot_id] || ""} type="text"/>
                <div>{this.generateNextPort(this.props.node.getNextPorts()[index])}</div>
            </div>
        ));
    };

    render() {
        return (
        <div className="widget-container" style={{backgroundColor:"#7b00ff"}}>
            <div className="widget-header">
                <div className="left-port">
                    {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
                </div>
                <div className="scene">Scene</div>
                <div className="right-port">
                    {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
                </div>
            </div>
            <div className="widget-content">
                <div className="widget-id">
                    <div className="widget-id-label">Id : </div>
                    <input className="widget-id-input" onBlur={this.props.node.updateId} defaultValue={this.props.node.scene_id} type="text"/>
                </div>
                <div className="widget-next">
                    <div className="widget-next-label">Next Id : </div>
                    <input className="widget-next-input" onBlur={this.props.node.updateNextId} defaultValue={this.props.node.next_scene_id} type="text"/>
                </div>
                {this._generateHotspots()}
                <div className="widget-add"><button onClick={this._addElement}>+</button></div>
            </div>
        </div>);
    }
}
