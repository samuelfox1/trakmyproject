import React from 'react'
import { Link } from 'react-router-dom'
import { Button, H1 } from '../../components/Elements/Elements'
import Modal from '../../components/Modal/Modal'
import './PageNotFound.css'

export default function PageNotFound() {
    return (
        <Modal className="display">
            <H1 className="page-not-found">Page Not Found</H1>
            <Link to='/'><Button>Home</Button></Link>
        </Modal>
    )
}
