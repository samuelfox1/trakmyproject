export const Form = ({ id, className, children }) => (
    <form id={id} className={className}>{children}</form>
)

export const Label = ({ labelClassName, htmlFor, text }) => <label className={labelClassName} htmlFor={htmlFor} >{text}</label>
export const Text = ({ className, htmlName, value, handleInputChange, handleInputClick }) => (
    <input
        className={className}
        type='text'
        name={htmlName}
        value={value}
        onClick={handleInputClick ? (e) => handleInputClick(e) : null}
        onChange={e => handleInputChange(e)}
    />
)

export const Email = ({ className, htmlName, value, handleInputChange, handleInputClick }) => (
    <input
        className={className}
        type='email'
        name={htmlName}
        value={value}
        onClick={handleInputClick ? (e) => handleInputClick(e) : null}
        onChange={e => handleInputChange(e)}
    />
)

export const Password = ({ className, htmlName, value, handleInputChange, handleInputClick }) => (
    <input
        className={className}
        type="password"
        name={htmlName}
        value={value}
        onClick={handleInputClick ? (e) => handleInputClick(e) : null}
        onChange={e => handleInputChange(e)}
    />
)

export const Submit = ({ className, handleSubmit, children }) => (
    <input
        type='Submit'
        className={className}
        value={children}
        onChange={() => console.log('submit')}
        onClick={e => handleSubmit(e)}
    />
)