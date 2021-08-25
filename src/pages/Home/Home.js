import React from 'react'
import { Button, Flex } from '../../components/Elements/Elements'
import UserInfo from '../../components/UserInfo/UserInfo'
import Modal from '../../components/Modal/Modal'
import UserProjects from '../../components/UserProjects/UserProjects'
import { useDisplayContext } from '../../context/DisplayProvider'
import './Home.css'

export default function Home() {
    const { displayModal } = useDisplayContext()

    return (
        <>
            <UserInfo />
            <Button onClick={() => displayModal('AddProjectForm')}>Add a project</Button>

            <Flex className='projects-container'>
                <Modal />
                <UserProjects />
            </Flex>
        </>
    )
}
