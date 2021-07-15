import React from 'react'
import { Flex } from '../components/Elements/Elements'
import UserInfo from '../components/UserInfo/UserInfo'
import UserProjects from '../components/UserProjects/UserProjects'
import './Home.css'

export default function Home() {

    return (
        <>
            <Flex className='home-container border-red'>
                <UserInfo />
                <UserProjects />
            </Flex>
        </>
    )
}
