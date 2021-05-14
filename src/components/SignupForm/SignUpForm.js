import React, { useState, useEffect } from 'react'
import { Form } from '../Form/Form'
import { Flex } from '../Flex/Flex'
import { Label } from '../Form/Label'
import { Password } from '../Form/Password'
import { Submit } from '../Form/Submit'
import { Text } from '../Form/Text'
import './SignUpForm.css'
import { checkAvailableEmail, checkAvailableUsername, createUser } from '../../utils/userAPI'

export const SignUpForm = ({ loggedInUser, setLoggedInUser }) => {
    const componentName = 'signUpForm'
    const inputClassName = "input-signup"
    const nameUsername = 'username'
    const nameFirstName = 'firstName'
    const nameLastName = 'lastName'
    const nameEmail = 'email'
    const namePassword = 'password'
    const nameConfirmPassword = 'confirmPassword'
    const minPasswordLength = 8

    const [validEmail, setValidEmail] = useState(false)
    const [usernameClassName, setUsernameClassName] = useState('')
    const [passwordClassName, setPasswordClassName] = useState('')
    const [confirmPasswordClassName, setConfirmPasswordClassName] = useState('')
    const [emailClassName, setEmailClassName] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [allowSubmit, setAllowSubmit] = useState(false)
    const [signUpInputs, setSignUpInputs] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    useEffect(() => {
        localStorage.setItem(componentName, 'ready')
        return () => localStorage.removeItem(componentName)
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSignUpInputs({ ...signUpInputs, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(signUpInputs)
            .then(newUser => {
                if (!localStorage.getItem(componentName)) return
                if (!newUser) console.log('failed to create new user')
                setLoggedInUser(newUser.user)
                localStorage.setItem('token', newUser.token)
                window.location.href = '/'

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const username = signUpInputs.username
        if (!username) {
            setUsernameClassName('')
            return
        }

        checkAvailableUsername(username)
            .then(response => {
                if (!localStorage.getItem(componentName)) return
                console.log(response)
                response
                    ? setUsernameClassName('valid')
                    : setUsernameClassName('error')
            })
            .catch(err => console.log(err))
    }, [signUpInputs.username])

    //validate email
    useEffect(() => {
        const email = signUpInputs.email
        const emailArr = email.split('')

        if (email.length >= 5
            && emailArr.indexOf('@') !== -1
            && emailArr.indexOf('.') !== -1) {
            checkAvailableEmail(email)
                .then(newEmail => {
                    if (!localStorage.getItem(componentName)) return
                    if (!newEmail) {
                        setValidEmail(false)
                        setEmailClassName('error')
                        return
                    }
                    setValidEmail(true)
                    setEmailClassName('')
                })
                .catch(err => console.log(err))
        }
        // ? setValidEmail(true) && setEmailClassName('valid')
        // : setValidEmail(false) && setEmailClassName('error')

    }, [signUpInputs.email])

    //validate password
    useEffect(() => {
        const password = signUpInputs.password
        const confirmed = signUpInputs.confirmPassword

        password.length >= minPasswordLength
            ? setPasswordClassName('valid')
            : setPasswordClassName('error')

        if (password === confirmed && password.length >= minPasswordLength) {
            setValidPassword(true)
            setConfirmPasswordClassName('valid')
        } else {
            setValidPassword(false)
            setConfirmPasswordClassName('error')
        }

    }, [signUpInputs.password, signUpInputs.confirmPassword])

    //validateForm
    useEffect(() => {
        const validateForm = () => {
            let key
            for (key in signUpInputs) {
                if (!signUpInputs[key]) return false
                signUpInputs[key] = signUpInputs[key].trim()
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
                <Flex className={`${inputClassName} ${emailClassName}`}>
                    <Label htmlFor={nameEmail} text='Email:' />
                    <Text htmlName={nameEmail} value={signUpInputs.email.trim()} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={`${inputClassName} ${usernameClassName}`}>
                    <Label htmlFor={nameUsername} text='Username:' />
                    <Text htmlName={nameUsername} value={signUpInputs.username} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={`${inputClassName} ${passwordClassName}`}>
                    <Label htmlFor={namePassword} text='Password:' />
                    <Password htmlName={namePassword} value={signUpInputs.password.trim()} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={`${inputClassName} ${confirmPasswordClassName}`}>
                    <Label htmlFor={nameConfirmPassword} text='Confrim PW:' />
                    <Password htmlName={nameConfirmPassword} value={signUpInputs.confirmPassword.trim()} handleInputChange={handleInputChange} />
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