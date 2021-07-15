import React, { useState } from 'react'
import { Flex, H3 } from '../../Elements/Elements'
import { Form, Label, Text, TextArea, Checkbox, Submit } from '../../Elements/FormElements'
import './AddProjectForm.css'

export default function AddProjectForm() {
    const inputClassName = "input-add-project border-radius"

    const htmlNameTitle = 'title'
    const htmlNameGitHubRepo = 'gitHubRepo'
    const htmlNameDescription = 'description'
    const htmlNamePrivate = 'makePrivate'
    //eslint-disable-next-line
    const [allowSubmit, setAllowSubmit] = useState(true)
    const [addProjectInputs, setAddProjectInputs] = useState({
        [htmlNameTitle]: 'title',
        [htmlNameGitHubRepo]: 'repo',
        [htmlNameDescription]: 'description',
        [htmlNamePrivate]: false
    })

    const { title, gitHubRepo, description, makePrivate } = addProjectInputs

    const handleInputChange = (e) => {
        setAddProjectInputs({ ...addProjectInputs, [e.target.name]: e.target.value || e.target.checked })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(addProjectInputs)
    }

    return (
        <>
            <Flex className="add-project-container border-red">

                <Form>
                    <H3>Add a project</H3>
                    <Flex className={inputClassName}>
                        <Label htmlFor={htmlNameTitle} text='Title:' />
                        <Text htmlName={htmlNameTitle} value={title} handleInputChange={handleInputChange} />
                    </Flex>
                    <Flex className={inputClassName}>
                        <Label htmlFor={htmlNameGitHubRepo} text='GitHubRepo:' />
                        <Text htmlName={htmlNameGitHubRepo} value={gitHubRepo} handleInputChange={handleInputChange} />
                    </Flex>
                    <Flex className={inputClassName}>
                        <Label htmlFor={htmlNameDescription} text='Description:' />
                        <TextArea htmlName={htmlNameDescription} value={description} handleInputChange={handleInputChange} />
                    </Flex>
                    <Flex className={inputClassName}>
                        <Label htmlFor={htmlNamePrivate} text='Make Private:' />
                        <Checkbox htmlName={htmlNamePrivate} checked={makePrivate} handleInputChange={handleInputChange} />
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