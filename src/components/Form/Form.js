import React from 'react'

export const Form = ({ id, className, children }) => (
    <form id={id} className={className}>
        {children}
    </form>
)