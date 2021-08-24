import React, { useEffect, useState } from 'react'
import { useDisplayContext } from '../../utils/context/DisplayProvider'
import LoginForm from '../LoginForm/LoginForm'
import SignUpForm from '../SignUpForm/SignUpForm'
import AddProjectForm from '../AddProjectForm/AddProjectForm'
import './Modal.css'

export default function Modal({ className }) {
    const { display, setDisplay } = useDisplayContext()
    const [modalContent, setModalContent] = useState()
    const [modalOptions] = useState({
        LoginForm: <LoginForm />,
        SignUpForm: <SignUpForm />,
        AddProjectForm: <AddProjectForm />
    })

    useEffect(() => {
        if (!display.modal) return setModalContent()
        setModalContent(modalOptions[display.componentName])
    }, [display, modalOptions])

    const closeModal = () => {
        setDisplay({ ...display, modal: false, componentName: '' })
    }

    return (
        <>
            {display.modal &&
                <>
                    <div id='blur-screen'></div>
                    < div id="myModal" className={`${className ? className : ''} modal`} >

                        <div className="modal-content border-red">
                            <span className="close" onClick={closeModal}>&times;</span>
                            {modalContent}
                        </div>

                    </div >
                </>
            }
        </>
    )
}
