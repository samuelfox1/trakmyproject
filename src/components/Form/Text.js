import React from 'react'

export const Text = ({ htmlName, value, handleInputChange }) => (
    <input
        type='text'
        name={htmlName}
        value={value}
        onChange={e => handleInputChange(e)}
    />
)