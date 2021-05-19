import React, { useContext } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext'

export default function Home() {
    const { username } = useParams()
    const history = useHistory()
    const { loggedInUser } = useContext(UserContext)

    const handleBack = () => {
        history.goBack()
    }

    return (
        <>
            <h1>{loggedInUser.username}</h1>
            <Link to='/'>Logout</Link>
            <button onClick={handleBack} >Back</button>
            <div className='stringify' >{JSON.stringify(loggedInUser)}</div>
        </>
    )
}
