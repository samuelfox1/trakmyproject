import React, { useState, createContext, useContext, useEffect } from 'react';
import { checkToken } from '../utils/userAPI';

export const UserContext = createContext()

export const useUserContext = () => useContext(UserContext)

const UserProvider = (props) => {

    const [user, setUser] = useState({ isLoggedIn: false })

    useEffect(() => {
        const storedToken = localStorage.getItem('tmpToken')
        if (!storedToken || user.isLoggedIn) return

        checkToken(storedToken)
            .then(({ token, user }) => {
                if (!token || !user) return
                localStorage.setItem('tmpToken', token)
                setUser({ ...user, isLoggedIn: true })
            })
            .catch(error => {
                console.log(error)
            })
    });

    return (
        <UserContext.Provider value={{ user, setUser }} {...props} />
    );
};

export default UserProvider;