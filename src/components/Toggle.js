import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Toggle = React.forwardRef((props, ref) => {
    const [ visible, setVisible ] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.showLabel}</button>
            </div>
            <div className='togglableContent' style={showWhenVisible}>
                {props.children}
                <br></br>
                <button onClick={toggleVisibility}>{props.hideLabel}</button>
            </div>
        </div>
    );
});

Toggle.propTypes = {
    showLabel: PropTypes.string.isRequired,
    hideLabel: PropTypes.string.isRequired
};

export default Toggle; 