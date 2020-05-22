import * as React from "react";

import { BodyWidget } from "./Workflow/BodyWidget";
import { Application } from "./Workflow/Application";
import {
    
    Container,
    
  } from "reactstrap";

import "./Sass/main.css"

export default () => {
    let app = new Application();

    return  (
        
        <div className="main-content">
      
        <div className="header bg-gradient-info pb-4 pt-5 pt-md-6">
          <Container fluid>

          </Container>
          </div>
        
          <BodyWidget app={app} />
                   
                    </div>
    )
       
                      
    
    
    // ;
};

