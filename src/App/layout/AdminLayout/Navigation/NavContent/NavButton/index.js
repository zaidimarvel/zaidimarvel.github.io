import React from 'react';

const navButton = (props) => {
    let navButtons = false;
    const ButtonClass = ['label', 'pcoded-Button'];

    navButtons = (
        <span className={ButtonClass.join(' ')}>
            +
        </span>
    );
  
    return navButtons;
};

export default navButton;