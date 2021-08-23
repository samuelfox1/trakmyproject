import React from 'react'
import { H1 } from '../../components/Elements/Elements'
import Modal from '../../components/Modal/Modal'
import './PageNotFound.css'

export default function PageNotFound() {
    return (
        <Modal className="display">
            <H1 className="page-not-found">Page Not Found</H1>
        </Modal>
    )
}
