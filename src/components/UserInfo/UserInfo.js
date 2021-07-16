import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { A, Flex, H3, H5, Image } from '../Elements/Elements'
import './UserInfo.css'

export default function UserInfo() {
    const { loggedInUser } = useContext(UserContext)
    const { dateCreated, profilePic, username, email } = loggedInUser

    // console.log(loggedInUser)
    return (
        <>
            <Flex className='user-info-container'>
                <Image className='profile-pic' src={profilePic} alt='profile' />
                <H3 className='reset'>{username}</H3>
                <A className='reset' href={email}>{email}</A>
                <br />
                <H5 className='reset'>user since: {new Date(dateCreated).getFullYear()}</H5>
            </Flex>
        </>
    )
}
