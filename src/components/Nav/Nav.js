import React, { useState, useEffect, useCallback, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useUserData } from '../../utils/context/UserProvider'
import { UserProjectsContext } from '../../utils/context/UserProjectsContext'
import { checkToken, loginUser } from '../../utils/userAPI'
import { Flex, Button, H6, P } from '../Elements/Elements'
import { Form, Label, Password, Submit, Text } from '../Elements/FormElements'
import './Nav.css'


export default function Nav() {
    const [loginInputs, setLoginInputs] = useState({ username: 'sam0', password: 'password' })
    const { username, password } = loginInputs
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const { loggedInUser, setLoggedInUser } = useUserData()
    const { setUserProjects } = useContext(UserProjectsContext)
    const { loggedIn } = loggedInUser
    const token = localStorage.getItem('tmpToken')
    const history = useHistory()

    // setup local storage variable to avoid checking the token after a user logs in and token is updated
    const loadingKey = 'loadingUserData'
    useEffect(() => localStorage.setItem(loadingKey, false), [])
    const setLoadingStatus = (boolean) => localStorage.setItem(loadingKey, boolean)
    const checkLoadingStatus = () => localStorage.getItem(loadingKey) === 'true' ? true : false


    const handleInputChange = (e) => setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value })

    const handleinputClick = (e) => {
        const { name } = e.target
        if (name === username) setLoginInputs({ ...loginInputs, username: '' })
        if (name === password) setLoginInputs({ ...loginInputs, password: '' })
    }


    const handleLogin = (e => {
        e.preventDefault()
        if (checkLoadingStatus()) return
        setLoadingStatus(true)
        loginUser(loginInputs)
            .then(({ data, status }) => loadUserData(data, status))
            .catch(err => console.log(err))
    })

    const loadUserData = useCallback((data, status) => {
        if (status !== 200) {
            setLoadingStatus(false)
            setLoginErrorMessage('username or password is incorrect')
            return
        }
        const { user, token } = data
        localStorage.setItem('tmpToken', token)
        setLoggedInUser({ ...user, loggedIn: true })
        setUserProjects(user.projects)
        setLoginInputs({ username: 'username', password: 'password' })
        setLoadingStatus(false)
        history.push(`/user/${user.username}`)
    }, [history, setLoggedInUser, setUserProjects])

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

    const htmlNameUsername = 'username'
    const htmlNamePassword = 'password'

    return (
        <nav>
            <Flex className='nav-brand-container'>
                <Link className='nav-brand-link' to='/'>TrakMyProject</Link>

                {loggedIn
                    ? <>
                        <P>|</P>
                        <Link className='nav-brand-link' to={`/user/${loggedInUser.username}`}> {loggedInUser.username}</Link>
                    </>
                    : null
                }
            </Flex>

            {loggedIn
                ? <Button className='nav-login-item' onClick={handleLogout}>logout</Button>
                : <>
                    <Flex className='nav-login-container'>
                        <H6 className='login-error-message'>{loginErrorMessage}</H6>
                        <Form className='nav-login-container'>

                            <Flex className='nav-input-container'>
                                <Label htmlFor={htmlNameUsername} text={htmlNameUsername}></Label>
                                <Text
                                    className='nav-login-item'
                                    htmlName={htmlNameUsername}
                                    value={username}
                                    handleInputClick={handleinputClick}
                                    handleInputChange={handleInputChange}
                                />
                                <Label htmlFor={htmlNamePassword} text={htmlNamePassword}></Label>
                                <Password
                                    className='nav-login-item'
                                    htmlName={htmlNamePassword}
                                    value={password}
                                    handleInputClick={handleinputClick}
                                    handleInputChange={handleInputChange}
                                />
                            </Flex>

                            <Flex className='nav-input-container'>
                                <Submit className='nav-login-item button' handleSubmit={(e) => handleLogin(e)}>Login</Submit>
                                <Link className='nav-login-item signup' to='/signup'>Sign Up</Link>
                            </Flex>
                        </Form>
                    </Flex>
                </>
            }

        </nav>
    )
}
