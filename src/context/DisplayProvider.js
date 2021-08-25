import React, { useState, createContext, useContext } from 'react';

export const DisplayContext = createContext()

export const useDisplayContext = () => useContext(DisplayContext)

const DisplayProvider = (props) => {
    const [display, setDisplay] = useState({
        modal: false,
        componentName: ''
    });

    const displayModal = (componentName) => {
        setDisplay({ ...display, modal: true, componentName })
    }

    const closeModal = () => {
        setDisplay({ ...display, modal: false, componentName: "" })
    }

    return (
        <DisplayContext.Provider
            value={{ display, setDisplay, displayModal, closeModal }}
            {...props}
        />
    );
};

export default DisplayProvider;