import React from 'react'
import { Flex, Header, Image, P, Span } from '../components/Elements/Elements'
import './Landing.css'

export default function Landing() {

    return (
        <>

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
