import React, { } from 'react'
import { useUserData } from '../../utils/context/UserProvider'
import { Flex } from '../Elements/Elements'
import ProjectCard from './ProjectCard/ProjectCard'
import './UserProjects.css'

export default function UserProjects() {
    const { loggedInUser } = useUserData()
    const formattedArray = loggedInUser?.projects?.slice(0).reverse()

    return (
        <Flex className='projects-container'>
            {formattedArray.map((project, idx) => <ProjectCard key={idx} project={project} />)}
        </Flex>
    )
}
