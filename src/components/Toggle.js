import { useState } from 'react';

const Toggle = (props) => {
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
            <div style={showWhenVisible}>
                {props.children}
                <br></br>
                <button onClick={toggleVisibility}>{props.hideLabel}</button>
            </div>
        </div>
    );
};

export default Toggle; 