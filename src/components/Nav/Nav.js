import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { checkToken, loginUser } from '../../utils/userAPI'
import { Button, H4 } from '../Elements/Elements'
import { Form, Password, Submit, Text } from '../Elements/FormElements'
import { Flex } from '../Flex/Flex'
import './Nav.css'


export default function Nav() {
    const [loginInputs, setLoginInputs] = useState({ username: 'sam0', password: 'password' })
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
    const { loggedIn } = loggedInUser
    const token = localStorage.getItem('tmpToken')
    const history = useHistory()


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLoginInputs({ ...loginInputs, [name]: value })
    }
    const handleinputClick = (e) => {
        const { name } = e.target
        if (name === loginInputs.username) setLoginInputs({ ...loginInputs, username: '' })
        if (name === loginInputs.password) setLoginInputs({ ...loginInputs, password: '' })
    }

    const handleSignup = (e) => {
        e.preventDefault()
        history.push('/signup')
    }

    // setup local storage variable to avoid checking the token after a user logs in and token is updated
    const loadingKey = 'loadingUserData'
    useEffect(() => localStorage.setItem(loadingKey, false), [])
    const setLoadingStatus = (boolean) => localStorage.setItem(loadingKey, boolean)
    const checkLoadingStatus = () => localStorage.getItem(loadingKey) === 'true' ? true : false

    const handleLogin = (e => {
        e.preventDefault()
        if (checkLoadingStatus()) return
        setLoadingStatus(true)
        loginUser(loginInputs)
            .then(({ data, status }) => loadUserData(data, status))
            .catch(err => console.log(err))
    })

    const loadUserData = useCallback((data, status) => {
        if (status !== 200) return setLoginErrorMessage('username or password is incorrect')
        const { user, token } = data
        localStorage.setItem('tmpToken', token)
        setLoggedInUser({ ...user, loggedIn: true })
        setLoginInputs({ username: 'username', password: 'password' })
        setLoadingStatus(false)
        history.push(`/user/${user.username}`)

    }, [history, setLoggedInUser])

    const isTokenExpired = useCallback(() => {
        if (!token || checkLoadingStatus()) return
        setLoadingStatus(true)
        checkToken(token)
            .then(({ data, status }) => loadUserData(data, status))
            .catch()
    }, [token, loadUserData])

    useEffect(() => {
        isTokenExpired()
    }, [token, isTokenExpired])

    const handleLogout = () => {
        localStorage.removeItem('tmpToken')
        setLoggedInUser({ isLoggedIn: false })
        history.push('/')
    }


    return (
        <nav>
            <Link className='nav-brand-link' to='/'>TrackMyProject</Link>
            <Flex className='nav-button-bin'>
                {loggedIn
                    ? <>
                        <Button onClick={handleLogout}>logout</Button>
                    </>
                    : <>
                        <Flex className='nav-login-container'>
                            <Flex className='nav-login-input-container'>
                                <Form>
                                    <Text
                                        htmlName='username'
                                        value={loginInputs.username}
                                        handleInputClick={handleinputClick}
                                        handleInputChange={handleInputChange}
                                    />
                                    <Password
                                        htmlName='password'
                                        value={loginInputs.password.trim()}
                                        handleInputClick={handleinputClick}
                                        handleInputChange={handleInputChange}
                                    />
                                    <Submit className='nav-login-submit' handleSubmit={handleLogin}>Login</Submit>
                                    <Button onClick={(e) => handleSignup(e)}>Sign Up</Button>
                                </Form>
                            </Flex>
                            <H4 className='login-error-message'>{loginErrorMessage}</H4>
                        </Flex>
                    </>
                }

            </Flex>
        </nav>
    )
}
