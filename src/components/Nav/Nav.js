import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDisplayContext } from '../../utils/context/DisplayProvider'
import { useUserContext } from '../../utils/context/UserProvider'
import { Flex, Button, P } from '../Elements/Elements'
import './Nav.css'


export default function Nav() {

    const { user, setUser } = useUserContext()
    const { isLoggedIn } = user
    const { setDisplay } = useDisplayContext()
    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('tmpToken')
        setUser({ isLoggedIn: false })
        history.push('/')
    }

    const handleDisplayModal = (componentName) => {
        setDisplay({ modal: true, componentName: componentName })
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
                    <Button className='nav-login-item' onClick={() => handleDisplayModal('LoginForm')}>login</Button>
                    <Button className='nav-login-item' onClick={() => handleDisplayModal('SignUpForm')} >sign-up</Button>
                </div>
            }
        </nav>
    )
}
