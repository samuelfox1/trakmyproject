import React from 'react'
import { Image } from '../components/Elements/Elements'
// import { UserContext } from '../UserContext'

export default function Landing() {
    return (
        <>
            <header className="App-header">
                <p>Keep others up to date with<br />
                    <span className="emphasize"> what</span><br />
               your building and<br />
                    <span className="emphasize"> how</span><br />
               you're building it.</p>
            </header>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Circle-icons-roadblock.svg/600px-Circle-icons-roadblock.svg.png" className="App-logo" alt="under construction" />
            <br />
        </>
    )
}
