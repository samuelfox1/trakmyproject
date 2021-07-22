import React, { useContext } from 'react'
import { UserProjectsContext } from '../../utils/context/UserProjectsContext'
import { Flex } from '../Elements/Elements'
import ProjectCard from './ProjectCard/ProjectCard'
import './UserProjects.css'

export default function UserProjects() {
    const { userProjects } = useContext(UserProjectsContext)

    const formattedArray = userProjects.slice(0).reverse()

    return (
        <Flex className='projects-container'>
            {formattedArray.map((project, idx) => <ProjectCard key={idx} project={project} />)}
        </Flex>
    )
}
