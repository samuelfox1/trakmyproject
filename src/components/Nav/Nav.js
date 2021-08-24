import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDisplayContext } from '../../utils/context/DisplayProvider'
import { useUserContext } from '../../utils/context/UserProvider'
import { Flex, Button, P } from '../Elements/Elements'
import './Nav.css'


export default function Nav() {

    const { user, setUser } = useUserContext()
    const { isLoggedIn } = user
    const { display, setDisplay } = useDisplayContext()
    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('tmpToken')
        setUser({ isLoggedIn: false })
        history.push('/')
    }

    const handleLoginClick = () => {
        setDisplay({ ...display, modal: true, loginForm: true, signUpForm: false })
    }
    const handleSignUpClick = () => {
        setDisplay({ ...display, modal: true, signUpForm: true, loginForm: false })
    }

    return (
        <nav>
            <Flex className='nav-brand-container'>
                <Link className='nav-brand-link' to='/'>TrakMyProject</Link>
                {isLoggedIn &&
                    <>
                        <P>|</P>
                        <Link className='nav-brand-link' to={`/user/${user.username}`}> {user.username}</Link>
                    </>
                }
            </Flex>
            {isLoggedIn
                ? <Button className='nav-login-item' onClick={handleLogout}>logout</Button>
                : <div>
                    <Button className='nav-login-item' onClick={handleLoginClick}>login</Button>
                    <Button className='nav-login-item' onClick={handleSignUpClick} >sign up</Button>
                </div>
            }
        </nav>
    )
}
