import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/argon-dashboard-react.css";
import './Sass/index.css';

import Rdrag from './RDrag'
import registerServiceWorker from './registerServiceWorker';
import "storm-react-diagrams/dist/style.min.css";


ReactDOM.render(<Rdrag/>, document.getElementById('root'));
registerServiceWorker();
