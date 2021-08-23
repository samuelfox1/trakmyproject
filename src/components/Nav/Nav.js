import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDisplayContext } from '../../utils/context/DisplayProvider'
import { useUserContext } from '../../utils/context/UserProvider'
import { Flex, Button, P } from '../Elements/Elements'
import './Nav.css'


export default function Nav() {

    const { loggedInUser, setLoggedInUser } = useUserContext()
    const { loggedIn } = loggedInUser
    const { display, setDisplay } = useDisplayContext()
    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('tmpToken')
        setLoggedInUser({ isLoggedIn: false })
        history.push('/')
    }

    const handleLoginClick = () => {
        setDisplay({ ...display, modal: true, login: true, signUp: false })
    }
    const handleSignUpClick = () => {
        setDisplay({ ...display, modal: true, signUp: true, login: false })
    }

    return (
        <nav>
            <Flex className='nav-brand-container'>
                <Link className='nav-brand-link' to='/'>TrakMyProject</Link>
                {loggedIn &&
                    <>
                        <P>|</P>
                        <Link className='nav-brand-link' to={`/user/${loggedInUser.username}`}> {loggedInUser.username}</Link>
                    </>
                }
            </Flex>
            {loggedIn
                ? <Button className='nav-button' onClick={handleLogout}>logout</Button>
                : <div>
                    <Button className='nav-button' onClick={handleLoginClick}>login</Button>
                    <Button className='nav-button' onClick={handleSignUpClick} >sign up</Button>
                </div>
            }
        </nav>
    )
}
