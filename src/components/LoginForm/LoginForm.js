import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDisplayContext } from '../../utils/context/DisplayProvider'
import { useUserContext } from '../../utils/context/UserProvider'
import { loginUser } from '../../utils/userAPI'
import { H1, H6 } from '../Elements/Elements'
import { Form, Label, Password, Submit, Text } from '../Elements/FormElements'
import './LoginForm.css'

export default function LoginForm() {

    const [inputs, setInputs] = useState({ username: 'sam0', password: 'password' })
    const { setUser } = useUserContext()
    const { setDisplay, getLoadingStatus, setLoadingStatus } = useDisplayContext()
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const history = useHistory()

    useEffect(() => {
        setLoginErrorMessage('testing')
    }, [])

    const handleInputClick = (e) => {
        const { name } = e.target
        if (inputs.username === name) setInputs({ ...inputs, username: '' })
        if (inputs.password === name) setInputs({ ...inputs, password: '' })
    }
    const onChange = (e) => {
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value })
    }

    const handleLogin = (e => {
        e.preventDefault()
        if (getLoadingStatus()) return
        setLoadingStatus(true)
        loginUser(inputs)
            .then(({ data }) => {
                const { user, token } = data
                localStorage.setItem('tmpToken', token)
                setUser({ ...user, loggedIn: true, projects: user.projects })
                setDisplay({ modal: false, componentName: '' })
                history.push(`/user/${user.username}`)
            })
            .catch(err => console.log(err))
    })

    return (
        <Form id='login-form' className=''>
            <H1 className='reset'>Login</H1>
            <H6 className='login-error-message'>{loginErrorMessage}</H6>
            <Label htmlFor='username' text='username'></Label>
            <Text
                className=''
                htmlName='username'
                value={inputs.username}
                onClick={handleInputClick}
                onChange={onChange}
            />
            <Label htmlFor='password' text='password'></Label>
            <Password
                className=''
                htmlName='password'
                value={inputs.password}
                onClick={handleInputClick}
                onChange={onChange}
            />
            <Submit className=' button' onClick={(e) => handleLogin(e)}>Login</Submit>
        </Form>
    )
}
