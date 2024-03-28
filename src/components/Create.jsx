import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './style.css'; // Import the CSS file

const Create = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <input type="text" value={text} onChange={handleChange} />
            <button onClick={handleOpen}>Open Popup</button>
            <Popup open={isOpen} onClose={handleClose} position="right center">
                <div className='content'>{text}</div>
            </Popup>
            {isOpen && <div className="backdrop"></div>}
        </div>
    );
};

export default Create;