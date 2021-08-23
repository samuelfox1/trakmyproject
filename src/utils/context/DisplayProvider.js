import React, { useState, createContext, useContext } from 'react';

export const DisplayContext = createContext()

export const useDisplayContext = () => useContext(DisplayContext)

const DisplayProvider = (props) => {
    const [display, setDisplay] = useState({
        modal: false,
        loginForm: false,
        signUpForm: false,
        pageNotFound: true,
    });

    const setLoadingStatus = (loadingKey, boolean) => {
        localStorage.setItem(loadingKey, boolean)
    }
    const getLoadingStatus = (loadingKey) => localStorage.getItem(loadingKey) === 'true' ? true : false

    return (
        <DisplayContext.Provider
            value={{ display, setDisplay, getLoadingStatus, setLoadingStatus }}
            {...props}
        />
    );
};

export default DisplayProvider;