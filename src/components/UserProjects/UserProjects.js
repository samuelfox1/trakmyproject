import React, { } from 'react'
import { useUserContext } from '../../utils/context/UserProvider'
import { Flex } from '../Elements/Elements'
import ProjectCard from '../ProjectCard/ProjectCard'
import './UserProjects.css'

export default function UserProjects() {
    const { user } = useUserContext()
    const { isLoggedIn, projects } = user
    const formattedArray = projects?.slice(0).reverse()

    return (
        <>
            {isLoggedIn &&
                < Flex className='projects-container' >
                    {formattedArray.map((project, idx) => <ProjectCard key={idx} project={project} />)}
                </Flex >
            }
        </>
    )
}
