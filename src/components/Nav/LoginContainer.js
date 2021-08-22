import React, { useEffect, useState } from 'react'
import { loginUser } from '../../utils/userAPI'
import { Flex, H6 } from '../Elements/Elements'
import { Form, Label, Password, Submit, Text } from '../Elements/FormElements'

export default function LoginContainer({ getLoadingStatus, setLoadingStatus, loadUserData }) {

    const [loginInputs, setLoginInputs] = useState({ username: 'sam0', password: 'password' })
    const { username, password } = loginInputs
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    useEffect(() => {
        setLoginErrorMessage('testing')
    })

    const handleInputClick = (e) => {
        const { name } = e.target
        if (name === username) setLoginInputs({ ...loginInputs, username: '' })
        if (name === password) setLoginInputs({ ...loginInputs, password: '' })
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLoginInputs({ ...loginInputs, [name]: value })
    }

    const handleLogin = (e => {
        e.preventDefault()
        if (getLoadingStatus()) return
        setLoadingStatus(true)
        loginUser(loginInputs)
            .then(({ data, status }) => loadUserData(data, status))
            .catch(err => console.log(err))
    })


    const htmlNameUsername = 'username'
    const htmlNamePassword = 'password'

    return (
        <Flex className=''>
            <H6 className='login-error-message'>{loginErrorMessage}</H6>
            <Form className=''>

                <Label htmlFor={htmlNameUsername} text={htmlNameUsername}></Label>
                <Text
                    className=''
                    htmlName={htmlNameUsername}
                    value={username}
                    handleInputClick={handleInputClick}
                    handleInputChange={handleInputChange}
                />
                <Label htmlFor={htmlNamePassword} text={htmlNamePassword}></Label>
                <Password
                    className=''
                    htmlName={htmlNamePassword}
                    value={password}
                    handleInputClick={handleInputClick}
                    handleInputChange={handleInputChange}
                />
                <Submit className=' button' handleSubmit={(e) => handleLogin(e)}>Login</Submit>


            </Form>
        </Flex>
    )
}
