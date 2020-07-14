import React from 'react';
import DEMO  from './../../../../../store/constant';
import logo from './../../../../../assets/images/lg.png';
import Aux from "../../../../../hoc/_Aux";

const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <Aux>
            <div className="navbar-brand header-logo">
                 <a href={DEMO.BLANK_LINK} className="b-brand">
                    <div>
                    <img className="rounded-circle" style={{width: '40px', opacity: 1, transform: "none"}} src={logo} alt="activity-user"/>
                    </div>
                    <span className="b-title">Butterfly Analytics</span>
                 </a>
                <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span />
                </a>
            </div>
        </Aux>
    );
};

export default navLogo;
