import React from 'react'
import { useDisplayContext } from '../../utils/context/DisplayProvider'
import './Modal.css'

export default function Modal({ className, children }) {
    const { display, setDisplay } = useDisplayContext()

    const closeModal = () => setDisplay({ ...display, modal: false })

    return (
        <>
            <div id='blur-screen'></div>
            < div id="myModal" className={`${className ? className : ''} modal`} >

                <div className="modal-content border-red">
                    <span className="close" onClick={closeModal}>&times;</span>
                    {children}
                </div>

            </div >
        </>
    )
}
