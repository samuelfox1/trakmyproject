import React, { useState, createContext, useContext } from 'react';

export const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)

const UserProvider = (props) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        username: 'username-string',
    });

    return (
        <UserContext.Provider value={{ user, setUser }} {...props} />
    );
};

export default UserProvider;