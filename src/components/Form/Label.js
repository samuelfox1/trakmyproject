import React from 'react'

export const Label = ({ labelClassName, htmlFor, text }) => (
    <label className={labelClassName} htmlFor={htmlFor} >{text}</label>
)