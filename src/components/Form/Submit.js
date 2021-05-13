import React from 'react'

export const Submit = ({ handleSubmit, }) => (
    <input
        type='Submit'
        onClick={e => handleSubmit(e)}
    />
)