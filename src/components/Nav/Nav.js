import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../../UserContext'
import { loginUser } from '../../utils/userAPI'
import { H1 } from '../Elements/Elements'
import { Form, Password, Submit, Text } from '../Elements/FormElements'
import { Flex } from '../Flex/Flex'
import './Nav.css'


export default function Nav() {
    const history = useHistory()
    const { loggedInUser, setLoggedInUser } = useContext(UserContext)
    const [loginInputs, setLoginInputs] = useState({ username: 'sam0', password: 'password' })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLoginInputs({ ...loginInputs, [name]: value })
    }
    const handleinputClick = (e) => {
        const { name } = e.target
        if (name === loginInputs.username) setLoginInputs({ ...loginInputs, username: '' })
        if (name === loginInputs.password) setLoginInputs({ ...loginInputs, password: '' })
    }

    const handleSignup = () => {
        history.push('/signup')
    }

    const handleLogin = (e) => {
        e.preventDefault()
        loginUser(loginInputs)
            .then(data => {
                if (data.status !== 200) return
                const { user, token } = data.data
                localStorage.setItem('tmpToken', JSON.stringify(token))
                setLoggedInUser({ ...user, loggedIn: true })
                setLoginInputs({ username: 'username', password: 'password' })
                history.push(`/user/${user.username}`)
            })
            .catch(err => console.log(err))
    }

    const handleLogout = () => {
        localStorage.removeItem('tmpToken')
        setLoggedInUser({ isLoggedIn: false })
        history.push('/')
    }
    return (
        <nav>
            <H1 text={loggedInUser?.loggedIn ? `Welcome, ${loggedInUser.username}` : 'trakmyproject'} />
            <Flex className='nav-button-bin'>
                {loggedInUser.loggedIn
                    ? <button onClick={handleLogout}>logout</button>
                    : <>
                        <Flex className='nav-login'>
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
                            </Form>
                        </Flex>
                        <button onClick={handleSignup}>signup</button>
                    </>
                }

            </Flex>
        </nav>
    )
}
