import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { checkAvailableEmail, checkAvailableUsername, createUser } from '../../utils/userAPI'
import { useUserData } from '../../utils/context/UserProvider'
import { Form, Label, Password, Submit, Text } from '../Elements/FormElements'
import { Flex, H2 } from '../Elements/Elements'
import './SignUpForm.css'


export const SignUpForm = () => {

    const { setLoggedInUser } = useUserData()

    const componentName = 'signUpForm'
    const inputClassName = "input-signup border-radius"
    const htmlNameUsername = 'username'
    const htmlNameFirstName = 'firstName'
    const htmlNameLastName = 'lastName'
    const htmlNameEmail = 'email'
    const htmlNamePassword = 'password'
    const htmlNameConfirmPassword = 'confirmPassword'
    const minPasswordLength = 8

    const [confirmPasswordClassName, setConfirmPasswordClassName] = useState('')
    const [usernameClassName, setUsernameClassName] = useState('')
    const [passwordClassName, setPasswordClassName] = useState('')
    const [emailClassName, setEmailClassName] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [allowSubmit, setAllowSubmit] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [signUpInputs, setSignUpInputs] = useState({
        username: '',
        password: 'password',
        confirmPassword: 'password',
        firstName: '',
        lastName: '',
        email: ''
    })
    const { username, password, confirmPassword, firstName, lastName, email } = signUpInputs
    const history = useHistory()

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
            .then(({ data }) => {
                const { user, token } = data
                if (!localStorage.getItem(componentName)) return
                if (!user) console.log('failed to create new user')
                setLoggedInUser({ ...user, loggedIn: true })
                localStorage.setItem('tmpToken', token)
                history.push(`/user/${user.username}`)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (!username) return setUsernameClassName('')

        checkAvailableUsername(username)
            .then(response => {
                console.log(response)
                if (!localStorage.getItem(componentName)) return
                response
                    ? setUsernameClassName('valid')
                    : setUsernameClassName('error')
            })
            .catch(err => console.log(err))
    }, [username])

    //validate email
    useEffect(() => {
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

    }, [email])

    //validate password
    useEffect(() => {
        password.length >= minPasswordLength
            ? setPasswordClassName('valid')
            : setPasswordClassName('error')

        if (password === confirmPassword && password.length >= minPasswordLength) {
            setValidPassword(true)
            setConfirmPasswordClassName('valid')
        } else {
            setValidPassword(false)
            setConfirmPasswordClassName('error')
        }
    }, [password, confirmPassword])

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
        <Flex className="signup-container border-red">
            <H2>sign up</H2>
            <Form  >
                <Flex className={inputClassName}>
                    <Label htmlFor={htmlNameFirstName} text='First Name:' />
                    <Text htmlName={htmlNameFirstName} value={firstName} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={inputClassName}>
                    <Label htmlFor={htmlNameLastName} text='Last Name:' />
                    <Text htmlName={htmlNameLastName} value={lastName} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={`${inputClassName} ${emailClassName}`}>
                    <Label htmlFor={htmlNameEmail} text='Email:' />
                    <Text htmlName={htmlNameEmail} value={email.trim()} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={`${inputClassName} ${usernameClassName}`}>
                    <Label htmlFor={htmlNameUsername} text='Username:' />
                    <Text htmlName={htmlNameUsername} value={username} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={`${inputClassName} ${passwordClassName}`}>
                    <Label htmlFor={htmlNamePassword} text='Password:' />
                    <Password htmlName={htmlNamePassword} value={password.trim()} handleInputChange={handleInputChange} />
                </Flex>
                <Flex className={`${inputClassName} ${confirmPasswordClassName}`}>
                    <Label htmlFor={htmlNameConfirmPassword} text='Confrim PW:' />
                    <Password htmlName={htmlNameConfirmPassword} value={confirmPassword.trim()} handleInputChange={handleInputChange} />
                </Flex>

                <Submit handleSubmit={handleSubmit}>Submit</Submit>
                {allowSubmit
                    ? <Flex className='input-signup-submit border-radius'>
                        <Submit handleSubmit={handleSubmit}>Submit</Submit>
                    </Flex>
                    : null
                }
            </Form>
        </Flex>
    )
}