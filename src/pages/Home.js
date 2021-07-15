import React, { useState } from 'react'
import { Button, Flex } from '../components/Elements/Elements'
import UserInfo from '../components/UserInfo/UserInfo'
import AddProjectForm from '../components/UserProjects/AddProjectForm/AddProjectForm'
import UserProjects from '../components/UserProjects/UserProjects'
import './Home.css'

export default function Home() {
    const [displayForm, setDisplayForm] = useState(false)

    const toggleDisplayForm = () => setDisplayForm(!displayForm)
    // const toggleDisplayForm = () => console.log('clicked')

    return (
        <>
            <Flex className='border-red'>
                <UserInfo />
            </Flex>
            <Button onClick={toggleDisplayForm}>Add a project</Button>

            <Flex className='projects-container'>
                {displayForm ? <AddProjectForm /> : null}
                <UserProjects />
            </Flex>
        </>
    )
}
