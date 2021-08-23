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
export const TextArea = ({ className, htmlName, value, handleInputChange, handleInputClick, children }) => (
    <textarea
        className={className}
        type='text'
        name={htmlName}
        value={value}
        onClick={handleInputClick ? (e) => handleInputClick(e) : null}
        onChange={e => handleInputChange(e)}
    >{children}</textarea>
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
export const Checkbox = ({ className, htmlName, value, handleInputChange, handleInputClick }) => (
    <input
        className={className}
        type="checkbox"
        name={htmlName}
        value={value}
        onClick={handleInputClick ? (e) => handleInputClick(e) : null}
        onChange={e => handleInputChange(e)}
    />
)

export const Submit = ({ className, onClick, children }) => (
    <input
        type='Submit'
        className={className}
        value={children}
        onChange={() => console.log('submit')}
        onClick={e => onClick(e)}
    />
)