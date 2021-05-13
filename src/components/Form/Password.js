import React from 'react'

export const Password = ({ htmlName, value, handleInputChange }) => (
    <input
        type="password"
        name={htmlName}
        value={value}
        onChange={e => handleInputChange(e)}
    />
)