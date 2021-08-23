import React, { useEffect, useState } from 'react'
import { useDisplayContext } from '../../utils/context/DisplayProvider'
import { Flex, Header, Image, P, Span } from '../../components/Elements/Elements'
import Modal from '../../components/Modal/Modal'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import './Landing.css'

export default function Landing() {
    const [modal, setModal] = useState()

    const { display } = useDisplayContext()

    const displayLoginForm = () => setModal(<Modal><LoginForm /></Modal>)
    const displaySignUpForm = () => setModal(<Modal><SignUpForm /></Modal>)

    useEffect(() => {
        if (display?.login) return displayLoginForm()
        if (display?.signUp) return displaySignUpForm()
        setModal(null)
    }, [display?.login, display?.signUp])

    return (
        <>

            {display?.modal ? modal : null}

            <Flex className='landing-container border-red'>
                <Header className="App-header">
                    <P>Keep up to date with<br />
                        <Span className="emphasize"> what</Span><br />
                        your building and<br />
                        <Span className="emphasize"> how</Span><br />
                        you're building it.</P>
                </Header>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Circle-icons-roadblock.svg/600px-Circle-icons-roadblock.svg.png" className="App-logo" alt="under construction" />
            </Flex>
            <Flex className='landing-container border-red'>
                <Header className="App-header">
                    <P>Keep up to date with<br />
                        <Span className="emphasize"> what</Span><br />
                        your building and<br />
                        <Span className="emphasize"> how</Span><br />
                        you're building it.</P>
                </Header>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Circle-icons-roadblock.svg/600px-Circle-icons-roadblock.svg.png" className="App-logo" alt="under construction" />
            </Flex>
            <Flex className='landing-container border-red'>
                <Header className="App-header">
                    <P>Keep up to date with<br />
                        <Span className="emphasize"> what</Span><br />
                        your building and<br />
                        <Span className="emphasize"> how</Span><br />
                        you're building it.</P>
                </Header>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Circle-icons-roadblock.svg/600px-Circle-icons-roadblock.svg.png" className="App-logo" alt="under construction" />
            </Flex>

        </>
    )
}
