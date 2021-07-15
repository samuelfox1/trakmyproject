import React, { useContext } from 'react'
import { UserContext } from '../../UserContext'
import AddProjectForm from './AddProjectForm/AddProjectForm'
import { Flex } from '../Elements/Elements'
import './UserProjects.css'

export default function UserProjects() {
    const { loggedInUser } = useContext(UserContext)
    const { projects } = loggedInUser
    console.log(projects)
    return (
        <Flex className='projects-container'>
            <AddProjectForm />
        </Flex>
    )
}
