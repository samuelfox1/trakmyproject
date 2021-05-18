import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { H1, Image } from '../components/Elements/Elements'

export default function Landing() {
    const history = useHistory()
    const { pathname } = history.location
    // console.log(history)

    return (
        <>
            <header className="App-header">
                <H1 text="Welcome to TrakMyProject!" />
                <p>Keep others up to date with<br />
                    <span className="emphasize"> what</span><br />
               your building and<br />
                    <span className="emphasize"> how</span><br />
               you're building it.</p>
            </header>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Circle-icons-roadblock.svg/600px-Circle-icons-roadblock.svg.png" className="App-logo" alt="under construction" />
            <br />
            <Link to={{ pathname: '/signup', state: { from: pathname } }}>SignUp</Link>
        </>
    )
}
