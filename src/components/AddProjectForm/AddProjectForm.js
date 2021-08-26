import React, { useState } from 'react'
import { useDisplayContext } from '../../context/DisplayProvider'
import { useUserContext } from '../../context/UserProvider'
import { addProjectToUser } from '../../utils/projectsAPI'
import { Flex, H3 } from '../Elements/Elements'
import { Form, Label, Text, TextArea, Checkbox, Submit } from '../Elements/FormElements'
import './AddProjectForm.css'

export default function AddProjectForm() {
    const { user, setUser } = useUserContext()
    const { closeModal } = useDisplayContext()
    const [allowSubmit, setAllowSubmit] = useState(false)
    const [inputs, setInputs] = useState({
        admin_id: user._id,
        title: '',
        gitHubRepo: '',
        description: '',
        private: false
    })
    const inputClassName = "input-add-project border-radius"


    const handleInputChange = (e) => {
        const { name, value, checked } = e.target
        setInputs({ ...inputs, [name]: name === 'private' ? checked : value })
        validateFormData()
    }

    const validateFormData = () => {
        let key
        for (key in inputs) {
            if (key !== 'private' && !inputs[key]) return setAllowSubmit(false)
        }
        setAllowSubmit(true)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        addProjectToUser(inputs)
            .then(({ projects }) => {
                console.log(projects)
                setUser({ ...user, projects })
                closeModal()
            })

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
                    <Label htmlFor='private' text='Make Private:' />
                    <Checkbox htmlName='private' checked={inputs.private} onChange={handleInputChange} />
                </Flex>

                {allowSubmit && <Submit onClick={handleSubmit}>Submit</Submit>}
            </Form>
        </>
    )
}