import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useUserContext } from '../../utils/context/UserProvider'
import { Flex, Button, P } from '../Elements/Elements'
import './Nav.css'


export default function Nav() {

    const { loggedInUser, setLoggedInUser } = useUserContext()
    const { loggedIn } = loggedInUser
    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('tmpToken')
        setLoggedInUser({ isLoggedIn: false })
        history.push('/')
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
                ? <Button className='nav-login-item' onClick={handleLogout}>logout</Button>
                : <div>
                    <Button className='nav-login-item' onClick={() => history.push('/login')}>login</Button>
                    <Button className='nav-login-item' onClick={() => history.push('/signup')} >sign up</Button>
                </div>
            }
        </nav>
    )
}
