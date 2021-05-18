import React from 'react'

export const Email = ({ htmlName, value, handleInputChange }) => (
    <input
        type='email'
        name={htmlName}
        value={value}
        onChange={e => handleInputChange(e)}
    />
)