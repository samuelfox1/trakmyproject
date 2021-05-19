import React, { useContext } from 'react'
import { UserContext } from '../../UserContext'
import { H1, H5, Image } from '../Elements/Elements'
import { Flex } from '../Flex/Flex'
import './UserInfo.css'

export default function UserInfo() {
    const { loggedInUser } = useContext(UserContext)
    const { dateCreated } = loggedInUser
    const { profilePic } = loggedInUser.data

    console.log(loggedInUser)
    return (
        <>
            <Flex className='user-container'>
                <Image src={profilePic} alt='profile' />
                <Flex className='user-info'>
                    <H1>Welcome, {loggedInUser.username}</H1>
                    <H5>user since: {new Date(dateCreated).getFullYear()}</H5>
                </Flex>
            </Flex>
        </>
    )
}
