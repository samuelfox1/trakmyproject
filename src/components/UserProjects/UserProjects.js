import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Flex } from '../Elements/Elements'
import ProjectCard from './ProjectCard/ProjectCard'
import './UserProjects.css'

export default function UserProjects() {
    const { loggedInUser } = useContext(UserContext)
    const { projects } = loggedInUser
    const tempData = ['project-0', 'project-1', 'project-2', 'project-3', 'project-4',]
    console.log(projects)
    return (
        <Flex className='projects-container'>
            {tempData.map((project, idx) => <ProjectCard key={idx} project={project} />)}
        </Flex>
    )
}
