import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDisplayContext } from '../../context/DisplayProvider'
import { useUserContext } from '../../context/UserProvider'
import { loginUser } from '../../utils/userAPI'
import { H1, H5 } from '../Elements/Elements'
import { Form, Label, Password, Submit, Text } from '../Elements/FormElements'
import './LoginForm.css'

export default function LoginForm() {

    const [inputs, setInputs] = useState({ username: 'sam0', password: 'password' })
    const { setUser } = useUserContext()
    const { closeModal } = useDisplayContext()
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const history = useHistory()

    const handleInputClick = (e) => {
        const { name } = e.target
        if (inputs.username === name) setInputs({ ...inputs, username: '' })
        if (inputs.password === name) setInputs({ ...inputs, password: '' })
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value })
    }

    const handleLogin = (e => {
        e.preventDefault()
        loginUser(inputs)
            .then(({ data }) => {
                const { user, token } = data
                localStorage.setItem('tmpToken', token)
                setUser({ ...user, loggedIn: true, projects: user.projects })
                closeModal()
                history.push(`/user/${user.username}`)
            })
            .catch(err => {
                setLoginErrorMessage('incorrect username || password')
                console.log(err)
            })
    })

    return (
        <Form id='login-form' className=''>
            <H1 className='reset'>Login</H1>
            <H5 className='login-error-message'>{loginErrorMessage}</H5>
            <Label htmlFor='username' text='username'></Label>
            <Text
                className={loginErrorMessage && 'border-red'}
                htmlName='username'
                value={inputs.username}
                onClick={handleInputClick}
                onChange={handleInputChange}
            />
            <Label htmlFor='password' text='password'></Label>
            <Password
                className={loginErrorMessage && 'border-red'}
                htmlName='password'
                value={inputs.password}
                onClick={handleInputClick}
                onChange={handleInputChange}
            />
            <Submit className=' button' onClick={(e) => handleLogin(e)}>Login</Submit>
        </Form>
    )
}
