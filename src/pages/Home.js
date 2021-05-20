import React from 'react'
import { Flex } from '../components/Flex/Flex'
import UserInfo from '../components/UserInfo/UserInfo'
import UserProjects from '../components/UserProjects/UserProjects'

export default function Home() {

    return (
        <>
            <Flex className='home-container'>
                <UserInfo />
                <UserInfo />
                <UserInfo />
                <UserInfo />

                <UserProjects />
            </Flex>
            <Flex className='home-container'>
                <UserInfo />
                <UserInfo />
                <UserInfo />
                <UserInfo />

                <UserProjects />
            </Flex>
        </>
    )
}
