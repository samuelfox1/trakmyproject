import React from 'react'
import { Link } from 'react-router-dom'
import { useParams, useHistory } from 'react-router-dom'

export default function Home() {
    const { username } = useParams()
    const history = useHistory()
    // console.log(history)

    const handleBack = () => {
        history.goBack()
    }

    return (
        <>
            <h1>{username}</h1>
            <Link to='/'>Logout</Link>
            <button onClick={handleBack} >Back</button>

        </>
    )
}
