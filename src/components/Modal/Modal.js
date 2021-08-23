import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Elements/Elements'
import './Modal.css'

export default function Modal({ className, children }) {

    return (
        <>
            <div id='blur-screen'></div>
            < div id="myModal" className={`${className ? className : ''} modal`} >

                <div className="modal-content border-red">
                    <span className="close">&times;</span>
                    {children}
                </div>

            </div >
        </>
    )
}
