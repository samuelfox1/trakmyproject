import React from 'react'
import { Flex, H1 } from '../../Elements/Elements'
import './ProjectCard.css'

export default function ProjectCard({ project }) {
    return (
        <Flex className='project-card border-red'>
            <H1>{project}</H1>
        </Flex>
    )
}
