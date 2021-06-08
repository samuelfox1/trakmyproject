import React from 'react'
import { Flex } from '../components/Elements/Elements'
import UserInfo from '../components/UserInfo/UserInfo'
import UserProjects from '../components/UserProjects/UserProjects'

export default function Home() {

    return (
        <>
            <Flex className='home-container'>
                <UserInfo />
                <UserProjects />
            </Flex>
        </>
    )
}
