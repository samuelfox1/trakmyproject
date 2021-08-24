import React, { useState } from 'react'
import { Button, Flex } from '../../components/Elements/Elements'
import UserInfo from '../../components/UserInfo/UserInfo'
import AddProjectForm from '../../components/AddProjectForm/AddProjectForm'
import UserProjects from '../../components/UserProjects/UserProjects'
import { useDisplayContext } from '../../utils/context/DisplayProvider'
import './Home.css'

export default function Home() {
    const { display, setDisplay } = useDisplayContext()
    const { modal, addProjectForm } = display
    const [displayForm, setDisplayForm] = useState(false)

    const handleAddProjectDisplay = () => {
        setDisplay({ ...display, modal: !modal, addProjectForm: !addProjectForm })
    }

    return (
        <>
            <UserInfo />
            <br />
            <Button onClick={handleAddProjectDisplay}>Add a project</Button>

            <Flex className='projects-container'>
                {displayForm ? <AddProjectForm handleAddProjectDisplay={handleAddProjectDisplay} /> : null}
                <UserProjects />
            </Flex>
        </>
    )
}
