import React, { useState } from 'react'
import { Flex, H3 } from '../Elements/Elements'
import { Form, Label, Text, TextArea, Checkbox, Submit } from '../Elements/FormElements'
import './AddProjectForm.css'

export default function AddProjectForm() {

    const [allowSubmit, setAllowSubmit] = useState(true)
    const [inputs, setInputs] = useState({
        title: 'title',
        gitHubRepo: 'repo',
        description: 'description',
        makePrivate: false
    })
    const inputClassName = "input-add-project border-radius"


    const handleInputChange = (e) => {
        const { name, value, checked } = e.target
        setInputs({ ...inputs, [name]: value || checked })
    }

    const validateFormData = () => {
        setAllowSubmit()
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        validateFormData()

        // userProjects.push(inputs)
        // toggleDisplayForm()
    }

    return (
        <>
            <Form>
                <H3>Add a project</H3>
                <Flex className={inputClassName}>
                    <Label htmlFor='title' text='Title:' />
                    <Text htmlName='title' value={inputs.title} onChange={handleInputChange} />
                </Flex>
                <Flex className={inputClassName}>
                    <Label htmlFor='gitHubRepo' text='GitHubRepo:' />
                    <Text htmlName='gitHubRepo' value={inputs.gitHubRepo} onChange={handleInputChange} />
                </Flex>
                <Flex className={inputClassName}>
                    <Label htmlFor='description' text='Description:' />
                    <TextArea htmlName='description' value={inputs.description} onChange={handleInputChange} />
                </Flex>
                <Flex className={inputClassName}>
                    <Label htmlFor='makePrivate' text='Make Private:' />
                    <Checkbox htmlName='makePrivate' checked={inputs.makePrivate} onChange={handleInputChange} />
                </Flex>

                {allowSubmit && <Submit handleSubmit={handleSubmit}>Submit</Submit>}
            </Form>
        </>
    )
}