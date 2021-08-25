import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDisplayContext } from '../../context/DisplayProvider'
import { useUserContext } from '../../context/UserProvider'
import { Flex, Button, P } from '../Elements/Elements'
import './Nav.css'


export default function Nav() {

    const { user, setUser } = useUserContext()
    const { displayModal } = useDisplayContext()
    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('tmpToken')
        setUser({ isLoggedIn: false })
        history.push('/')
    }

    return (
        <nav>
            <Flex className='nav-brand-container'>
                <Link className='nav-brand-link' to='/'>TrakMyProject</Link>
                {user?.isLoggedIn &&
                    <>
                        <P>|</P>
                        <Link className='nav-brand-link' to={`/user/${user.username}`}> {user.username}</Link>
                    </>
                }
            </Flex>
            {user?.isLoggedIn
                ? <Button className='nav-login-item' onClick={handleLogout}>logout</Button>
                : <div>
                    <Button className='nav-login-item' onClick={() => displayModal('LoginForm')}>login</Button>
                    <Button className='nav-login-item' onClick={() => displayModal('SignUpForm')} >sign-up</Button>
                </div>
            }
        </nav>
    )
}
