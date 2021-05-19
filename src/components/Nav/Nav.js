import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { loginUser } from '../../utils/userAPI'
import { Button, H4 } from '../Elements/Elements'
import { Form, Password, Submit, Text } from '../Elements/FormElements'
import { Flex } from '../Flex/Flex'
import './Nav.css'


export default function Nav() {
    const history = useHistory()
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
    const [loginInputs, setLoginInputs] = useState({ username: 'sam0', password: 'password' })
    const [loginErrorMessage, setLoginErrorMessage] = useState('')

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

    const handleLogin = (e) => {
        e.preventDefault()
        loginUser(loginInputs)
            .then(data => {
                if (data.status !== 200) {
                    setLoginErrorMessage('username or password is incorrect')
                    return
                }
                const { user, token } = data.data
                localStorage.setItem('tmpToken', JSON.stringify(token))
                setLoggedInUser({ ...user, loggedIn: true })
                setLoginInputs({ username: 'username', password: 'password' })
                history.push(`/user/${user.username}`)
            })
            .catch(err => console.log(err))
    }

    const handleLogout = () => setLoggedInUser({ isLoggedIn: false })

    useEffect(() => {
        if (loggedInUser.loggedIn) return
        localStorage.removeItem('tmpToken')
        history.push('/')
    }, [loggedInUser.loggedIn, history])

    return (
        <nav>
            <Link className='nav-brand-link' to='/'>TrackMyProject</Link>
            <Flex className='nav-button-bin'>
                {loggedInUser.loggedIn
                    ? <>
                        <Button onClick={handleLogout}>logout</Button>
                    </>
                    : <>
                        <Flex className='nav-login-container'>
                            <Flex className='nav-login-inputs'>
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
                                    <Submit handleSubmit={handleLogin}>login</Submit>
                                    <Button onClick={(e) => handleSignup(e)}>signup</Button>
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
