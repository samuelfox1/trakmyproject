import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Flex, H5, Image } from '../Elements/Elements'
import './UserInfo.css'

export default function UserInfo() {
    const { loggedInUser } = useContext(UserContext)
    const { dateCreated } = loggedInUser
    const { profilePic } = loggedInUser

    console.log(loggedInUser)
    return (
        <>
            <Flex className='user-info-container'>
                <Image className='profile-pic' src={profilePic} alt='profile' />
                <H5>user since: {new Date(dateCreated).getFullYear()}</H5>
            </Flex>
        </>
    )
}
