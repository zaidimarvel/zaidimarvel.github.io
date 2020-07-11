import * as React from "react";
import "./tray.css";

export class TrayItemWidget extends React.Component {
    render() {
        return (
            <div style={{
                float: "left",
                textAlign: "center",
                padding: '7px'
                
              }}>
            <div
            style={{
                background: this.props.color
            }}
               
                draggable={true}
                onDragStart={event => {
                    event.dataTransfer.setData("storm-diagram-node", JSON.stringify(this.props.model));
                }}
                className={ "tray-item icon icon-shape text-white rounded-circle shadow" }
            >
                <i className={ "fa fa-" + this.props.icon } />
                {/* {this.props.name} */}
            </div>
            <p className="ls-1 mb-1"> {this.props.name}</p>
            </div>
        );
    }
}
