import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";

import '../../Sass/index.css';
import "storm-react-diagrams/dist/style.min.css";
import "../../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";



import BodyWidget from "../../Workflow/BodyWidget";

import "../../Sass/main.css";

export default () => {
   

    return (
        <Aux>
            <Row>
                <Col >
                <BodyWidget />
                </Col>
            </Row>
        </Aux>
    );

};
// class SamplePage extends Component {
//     render() {
       
//     }
// }

// export default SamplePage;