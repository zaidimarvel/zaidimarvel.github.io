import React from 'react';
import { Row, Col, Card, Table, Tabs, Button, Modal } from "react-bootstrap";

const navButton = (props) => {
    let navButtons = false;
    const ButtonClass = ['label', 'pcoded-Button'];

    navButtons = (
        <Button onClick={props.onHide} className={ButtonClass.join(' ')}>
            +
        </Button>
    );
  
    return navButtons;
};

export default navButton;