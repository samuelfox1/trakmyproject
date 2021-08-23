import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { checkAvailableEmail, checkAvailableUsername, createUser } from '../../utils/userAPI'
import { useUserContext } from '../../utils/context/UserProvider'
import { Form, Label, Password, Text } from '../Elements/FormElements'
import { Button, Flex, H2 } from '../Elements/Elements'
import './SignUpForm.css'
import { DisplayContext, useDisplayContext } from '../../utils/context/DisplayProvider'


export default function SignUpForm() {

    const { setLoggedInUser } = useUserContext()
    const { display, setDisplay } = useDisplayContext()

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
    const [validUsername, setValidUsername] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [allowSubmit, setAllowSubmit] = useState(false)
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
        if (!allowSubmit) return
        createUser(signUpInputs)
            .then(({ data }) => {
                const { user, token } = data
                if (!localStorage.getItem(componentName)) return
                if (!user) console.log('failed to create new user')
                setLoggedInUser({ ...user, loggedIn: true })
                localStorage.setItem('tmpToken', token)
                setDisplay({ ...display, modal: false, signUpForm: false })
                history.push(`/user/${user.username}`)
            })
            .catch(err => console.log(err))
    }

    // check available username
    useEffect(() => {
        if (!username) return setUsernameClassName('')

        checkAvailableUsername(username)
            .then(usernameExists => {
                if (!localStorage.getItem(componentName)) return
                if (usernameExists) {
                    setUsernameClassName('error')
                    setValidUsername(false)
                    return
                }
                setUsernameClassName('')
                setValidUsername(true)
            })
            .catch(err => console.log(err))
    }, [username])

    // validate format & check available email
    useEffect(() => {
        const emailArr = email.split('')

        if (email.length >= 5
            && emailArr.indexOf('@') !== -1
            && emailArr.indexOf('.') !== -1) {
            checkAvailableEmail(email)
                .then(emailExists => {
                    if (!localStorage.getItem(componentName)) return
                    if (emailExists) {
                        setEmailClassName('error')
                        setValidEmail(false)
                        return
                    }
                    setValidEmail(true)
                    setEmailClassName('')
                })
                .catch(err => console.log(err))
        }
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
        validUsername && validEmail && validPassword && validateForm()
            ? setAllowSubmit(true)
            : setAllowSubmit(false)

    }, [signUpInputs, validUsername, validEmail, validPassword])

    return (
        <Form  >
            <H2>sign up</H2>
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

            {allowSubmit
                // ? <Flex className='input-signup-submit border-radius'>
                //     <Submit onClick={handleSubmit}>Submit</Submit>
                // </Flex>
                ? <Button onClick={handleSubmit}>Submit</Button>

                : null
            }
        </Form>
    )
}