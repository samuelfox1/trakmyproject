import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { SignUpForm } from '../components/SignupForm/SignUpForm'

export default function SignUp() {
    const username = 'samfox1'
    const history = useHistory()
    const { pathname } = history.location

    const handleBack = () => {
        history.goBack()
    }

    return (
        <>
            <SignUpForm />
            <button onClick={handleBack} >Back</button>
        </>
    )
}
