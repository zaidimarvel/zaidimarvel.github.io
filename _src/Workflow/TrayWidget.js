import * as React from "react";

export class TrayWidget extends React.Component {
    render() {
        return <div className="tray">{this.props.children}</div>;
    }
}
