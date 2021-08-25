import React, { } from 'react'
import { useUserContext } from '../../context/UserProvider'
import { Flex } from '../Elements/Elements'
import ProjectCard from '../ProjectCard/ProjectCard'
import './UserProjects.css'

export default function UserProjects() {
    const { user } = useUserContext()
    const formattedArray = user?.projects?.slice(0).reverse()

    return (
        <>
            {user?.isLoggedIn &&
                < Flex className='projects-container' >
                    {formattedArray.map((project, idx) => <ProjectCard key={idx} project={project} />)}
                </Flex >
            }
        </>
    )
}
