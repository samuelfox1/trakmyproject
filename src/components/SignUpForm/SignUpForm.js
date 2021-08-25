import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { checkAvailableEmail, checkAvailableUsername, createUser } from '../../utils/userAPI'
import { useUserContext } from '../../context/UserProvider'
import { Form, Label, Password, Text } from '../Elements/FormElements'
import { Button, Flex, H2 } from '../Elements/Elements'
import './SignUpForm.css'
import { useDisplayContext } from '../../context/DisplayProvider'


export default function SignUpForm() {

    const { setUser } = useUserContext()
    const { closeModal } = useDisplayContext()
    const [confirmPasswordClassName, setConfirmPasswordClassName] = useState('')
    const [usernameClassName, setUsernameClassName] = useState('')
    const [passwordClassName, setPasswordClassName] = useState('')
    const [emailClassName, setEmailClassName] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [allowSubmit, setAllowSubmit] = useState(false)
    const [inputs, setInputs] = useState({
        username: '',
        password: 'password',
        confirmPassword: 'password',
        firstName: '',
        lastName: '',
        email: ''
    })
    const history = useHistory()

    const inputClassName = "input-signup border-radius"
    const minPasswordLength = 8

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!allowSubmit) return
        createUser(inputs)
            .then(({ user, token }) => {
                localStorage.setItem('tmpToken', token)
                setUser({ ...user, loggedIn: true })
                closeModal()
                history.push(`/user/${user.username}`)
            })
            .catch(err => {
                console.log(err)
                closeModal()
            })
    }

    // check available username
    useEffect(() => {
        if (!inputs.username) return setUsernameClassName('')

        checkAvailableUsername(inputs.username)
            .then(usernameExists => {
                if (usernameExists) {
                    setUsernameClassName('error')
                    setValidUsername(false)
                    return
                }
                setUsernameClassName('')
                setValidUsername(true)
            })
            .catch(err => console.log(err))
    }, [inputs.username])

    // validate format & check available email
    useEffect(() => {
        const emailArr = inputs.email.split('')

        if (inputs.email.length >= 5
            && emailArr.indexOf('@') !== -1
            && emailArr.indexOf('.') !== -1) {
            checkAvailableEmail(inputs.email)
                .then(emailExists => {
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
    }, [inputs.email])

    //validate password
    useEffect(() => {
        inputs.password.length >= minPasswordLength
            ? setPasswordClassName('valid')
            : setPasswordClassName('error')

        if (inputs.password === inputs.confirmPassword && inputs.password.length >= minPasswordLength) {
            setValidPassword(true)
            setConfirmPasswordClassName('valid')
        } else {
            setValidPassword(false)
            setConfirmPasswordClassName('error')
        }
    }, [inputs.password, inputs.confirmPassword])

    //validateForm
    useEffect(() => {
        const validateForm = () => {
            let key
            for (key in inputs) {
                if (!inputs[key]) return false
                inputs[key] = inputs[key].trim()
            }
            return true
        }
        validUsername && validEmail && validPassword && validateForm()
            ? setAllowSubmit(true)
            : setAllowSubmit(false)

    }, [inputs, validUsername, validEmail, validPassword])

    return (
        <Form  >
            <H2>sign up</H2>
            <Flex className={inputClassName}>
                <Label htmlFor='firstName' text='First Name:' />
                <Text htmlName='firstName' value={inputs.firstName} onChange={handleInputChange} />
            </Flex>
            <Flex className={inputClassName}>
                <Label htmlFor='lastName' text='Last Name:' />
                <Text htmlName='lastName' value={inputs.lastName} onChange={handleInputChange} />
            </Flex>
            <Flex className={`${inputClassName} ${emailClassName}`}>
                <Label htmlFor='email' text='Email:' />
                <Text htmlName='email' value={inputs.email.trim()} onChange={handleInputChange} />
            </Flex>
            <Flex className={`${inputClassName} ${usernameClassName}`}>
                <Label htmlFor='username' text='Username:' />
                <Text htmlName='username' value={inputs.username} onChange={handleInputChange} />
            </Flex>
            <Flex className={`${inputClassName} ${passwordClassName}`}>
                <Label htmlFor='password' text='Password:' />
                <Password htmlName='password' value={inputs.password.trim()} onChange={handleInputChange} />
            </Flex>
            <Flex className={`${inputClassName} ${confirmPasswordClassName}`}>
                <Label htmlFor='confirmPassword' text='Confrim PW:' />
                <Password htmlName='confirmPassword' value={inputs.confirmPassword.trim()} onChange={handleInputChange} />
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