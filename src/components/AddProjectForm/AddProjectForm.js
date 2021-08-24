import React, { useState } from 'react'
import { Flex, H3 } from '../Elements/Elements'
import { Form, Label, Text, TextArea, Checkbox, Submit } from '../Elements/FormElements'
import { useDisplayContext } from '../../utils/context/DisplayProvider'
import { useUserContext } from '../../utils/context/UserProvider'
import './AddProjectForm.css'

export default function AddProjectForm() {
    const { user, setUser } = useUserContext()
    const { display, setDisplay } = useDisplayContext()
    const { modal, addProjectForm } = display
    const [allowSubmit, setAllowSubmit] = useState(true)

    const [addProjectInputs, setAddProjectInputs] = useState({
        title: 'title',
        gitHubRepo: 'repo',
        description: 'description',
        makePrivate: false
    })

    const { title, gitHubRepo, description, makePrivate } = addProjectInputs
    const inputClassName = "input-add-project border-radius"


    const handleInputChange = (e) => {
        setAddProjectInputs({ ...addProjectInputs, [e.target.name]: e.target.value || e.target.checked })
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        // userProjects.push(addProjectInputs)
        // toggleDisplayForm()
    }

    return (
        <>
            <Flex className="add-project-container border-red">

                <Form>
                    <H3>Add a project</H3>
                    <Flex className={inputClassName}>
                        <Label htmlFor='title' text='Title:' />
                        <Text htmlName='title' value={title} onChange={handleInputChange} />
                    </Flex>
                    <Flex className={inputClassName}>
                        <Label htmlFor='gitHubRepo' text='GitHubRepo:' />
                        <Text htmlName='gitHubRepo' value={gitHubRepo} onChange={handleInputChange} />
                    </Flex>
                    <Flex className={inputClassName}>
                        <Label htmlFor='description' text='Description:' />
                        <TextArea htmlName='description' value={description} onChange={handleInputChange} />
                    </Flex>
                    <Flex className={inputClassName}>
                        <Label htmlFor='makePrivate' text='Make Private:' />
                        <Checkbox htmlName='makePrivate' checked={makePrivate} onChange={handleInputChange} />
                    </Flex>
                    {allowSubmit
                        ? <Flex className='input-add-project-submit border-radius'>
                            <Submit handleSubmit={handleSubmit}>Submit</Submit>
                        </Flex>
                        : null
                    }
                </Form>
            </Flex>
        </>
    )
}