import React, { useContext } from 'react'
import { UserContext } from '../../UserContext'
import { Flex, H5 } from '../Elements/Elements'
import './UserProjects.css'

export default function UserProjects() {
    const { loggedInUser } = useContext(UserContext)
    const { projects } = loggedInUser
    console.log(projects)
    return (
        <Flex className='projects-container'>
            <H5>Projects</H5>
        </Flex>
    )
}
