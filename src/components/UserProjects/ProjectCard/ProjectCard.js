import React from 'react'
import { Flex, H1, P } from '../../Elements/Elements'
import './ProjectCard.css'

export default function ProjectCard({ project }) {

    const { title, gitHubRepo, description, makePrivate } = project

    return (
        <Flex className='project-card border-red'>
            <H1 className='underline'>{title}</H1>
            <hr />
            <P>private: {makePrivate ? 'yes' : 'no'}</P>
            <P>GitHub repo: {gitHubRepo}</P>
            <P>Description{description}</P>
        </Flex>
    )
}
