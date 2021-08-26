import React from 'react'
import { Flex, H1, P } from '../Elements/Elements'
import './ProjectCard.css'

export default function ProjectCard({ project }) {

    const { title, gitHubRepo, description, makePrivate } = project

    return (
        <Flex className='project-card border-red'>
            <H1 className=''>{title}</H1>
            <hr />
            <P>This project is set to {makePrivate ? 'private' : 'public'}</P>
            <P><a href={gitHubRepo} target="_blank" rel="noreferrer">GitHub Repo</a></P>
            <P>{description}</P>
        </Flex>
    )
}
