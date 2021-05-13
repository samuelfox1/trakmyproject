import React, { useState, useEffect } from 'react'
import { Form } from '../Form/Form'
import { Flex } from '../Flex/Flex'
import { Label } from '../Form/Label'
import { Password } from '../Form/Password'
import { Submit } from '../Form/Submit'
import { Text } from '../Form/Text'
import './SignUpForm.css'

export const SignUpForm = () => {
    const [allowSubmit, setAllowSubmit] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [signUpInputs, setSignUpInputs] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: ''

    })

    const inputClassName = "input-signup"
    const nameUsername = 'username'
    const nameFirstName = 'firstName'
    const nameLastName = 'lastName'
    const nameEmail = 'email'
    const namePassword = 'password'
    const nameConfirmPassword = 'confirmPassword'
    const minPasswordLength = 8

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSignUpInputs({ ...signUpInputs, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(signUpInputs)
    }

    useEffect(() => {
        //axios request to see check available username

    }, [signUpInputs.username])

    //validate email
    useEffect(() => {
        const email = signUpInputs.email
        const emailArr = email.split('')

        email.length >= 5
            && emailArr.indexOf('@') !== -1
            && emailArr.indexOf('.') !== -1
            ? setValidEmail(true)
            : setValidEmail(false)
    }, [signUpInputs.email])

    //validate password
    useEffect(() => {
        signUpInputs.password === signUpInputs.confirmPassword
            && signUpInputs.password.length >= minPasswordLength
            ? setValidPassword(true)
            : setValidPassword(false)
    }, [signUpInputs.password, signUpInputs.confirmPassword])

    //validateForm
    useEffect(() => {
        const validateForm = () => {
            let key
            for (key in signUpInputs) {
                if (!signUpInputs[key]) return false
            }
            return true
        }
        validEmail && validPassword && validateForm()
            ? setAllowSubmit(true)
            : setAllowSubmit(false)

    }, [signUpInputs, validEmail, validPassword])

    return (
        <Flex className="login-container">
            <Form  >
                <Flex className={inputClassName}>
                    <Label htmlFor={nameFirstName} text='First Name:' />
                    <Text htmlName={nameFirstName} value={signUpInputs.firstName} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={inputClassName}>
                    <Label htmlFor={nameLastName} text='Last Name:' />
                    <Text htmlName={nameLastName} value={signUpInputs.lastName} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={inputClassName}>
                    <Label htmlFor={nameEmail} text='Email:' />
                    <Text htmlName={nameEmail} value={signUpInputs.email} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={inputClassName}>
                    <Label htmlFor={nameUsername} text='Username:' />
                    <Text htmlName={nameUsername} value={signUpInputs.username} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={inputClassName}>
                    <Label htmlFor={namePassword} text='Password:' />
                    <Password htmlName={namePassword} value={signUpInputs.password} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={inputClassName}>
                    <Label htmlFor={nameConfirmPassword} text='Confrim PW:' />
                    <Password htmlName={nameConfirmPassword} value={signUpInputs.confirmPassword} handleInputChange={handleInputChange} />
                </Flex>

                {allowSubmit
                    ? <Flex className='input-signup-submit'>
                        <Submit handleSubmit={handleSubmit}>Submit</Submit>
                    </Flex>
                    : null
                }
            </Form>
        </Flex>
    )
}