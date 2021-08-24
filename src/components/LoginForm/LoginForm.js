import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDisplayContext } from '../../utils/context/DisplayProvider'
import { useUserContext } from '../../utils/context/UserProvider'
import { loginUser } from '../../utils/userAPI'
import { H1, H6 } from '../Elements/Elements'
import { Form, Label, Password, Submit, Text } from '../Elements/FormElements'
import './LoginForm.css'

export default function LoginForm() {

    const [loginInputs, setLoginInputs] = useState({ username: 'sam0', password: 'password' })
    const { username, password } = loginInputs
    const { setUser } = useUserContext()
    const { getLoadingStatus, setLoadingStatus } = useDisplayContext()
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const history = useHistory()

    useEffect(() => {
        setLoginErrorMessage('testing')
    }, [])

    const handleInputClick = (e) => {
        const { name } = e.target
        if (name === username) setLoginInputs({ ...loginInputs, username: '' })
        if (name === password) setLoginInputs({ ...loginInputs, password: '' })
    }
    const onChange = (e) => {
        const { name, value } = e.target
        setLoginInputs({ ...loginInputs, [name]: value })
    }

    const handleLogin = (e => {
        e.preventDefault()
        if (getLoadingStatus()) return
        setLoadingStatus(true)
        loginUser(loginInputs)
            .then(({ data }) => {
                const { user, token } = data
                localStorage.setItem('tmpToken', token)
                setUser({ ...user, loggedIn: true, projects: user.projects })
                history.push(`/user/${user.username}`)
            })
            .catch(err => console.log(err))
    })


    const htmlNameUsername = 'username'
    const htmlNamePassword = 'password'

    return (
        <Form id='login-form' className=''>
            <H1 className='reset'>Login</H1>
            <H6 className='login-error-message'>{loginErrorMessage}</H6>
            <Label htmlFor={htmlNameUsername} text={htmlNameUsername}></Label>
            <Text
                className=''
                htmlName={htmlNameUsername}
                value={username}
                onClick={handleInputClick}
                onChange={onChange}
            />
            <Label htmlFor={htmlNamePassword} text={htmlNamePassword}></Label>
            <Password
                className=''
                htmlName={htmlNamePassword}
                value={password}
                onClick={handleInputClick}
                onChange={onChange}
            />
            <Submit className=' button' onClick={(e) => handleLogin(e)}>Login</Submit>


        </Form>
    )
}
