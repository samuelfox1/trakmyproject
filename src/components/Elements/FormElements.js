import React from 'react'

export const Form = ({ id, className, children }) => (
    <form id={id} className={className}>
        {children}
    </form>
)
export const Email = ({ htmlName, value, handleInputChange, handleInputClick }) => (
    <input
        type='email'
        name={htmlName}
        value={value}
        onClick={handleInputClick ? (e) => handleInputClick(e) : null}
        onChange={e => handleInputChange(e)}
    />
)

export const Label = ({ labelClassName, htmlFor, text }) => (
    <label className={labelClassName} htmlFor={htmlFor} >{text}</label>
)

export const Text = ({ htmlName, value, handleInputChange, handleInputClick }) => (
    <input
        type='text'
        name={htmlName}
        value={value}
        onClick={handleInputClick ? (e) => handleInputClick(e) : null}
        onChange={e => handleInputChange(e)}
    />
)

export const Password = ({ htmlName, value, handleInputChange, handleInputClick }) => (
    <input
        type="password"
        name={htmlName}
        value={value}
        onClick={handleInputClick ? (e) => handleInputClick(e) : null}
        onChange={e => handleInputChange(e)}
    />
)

export const Submit = ({ handleSubmit, }) => (
    <input
        type='Submit'
        onClick={e => handleSubmit(e)}
    />
)