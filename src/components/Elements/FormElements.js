export const Form = ({ id, className, children }) => (
    <form id={id} className={className}>{children}</form>
)

export const Label = ({ labelClassName, htmlFor, text }) => <label className={labelClassName} htmlFor={htmlFor} >{text}</label>
export const Text = ({ className, htmlName, value, onChange, onClick }) => (
    <input
        className={className}
        type='text'
        name={htmlName}
        value={value}
        onClick={onClick ? (e) => onClick(e) : null}
        onChange={e => onChange(e)}
    />
)
export const TextArea = ({ className, htmlName, value, onChange, onClick, children }) => (
    <textarea
        className={className}
        type='text'
        name={htmlName}
        value={value}
        onClick={onClick ? (e) => onClick(e) : null}
        onChange={e => onChange(e)}
    >{children}</textarea>
)

export const Email = ({ className, htmlName, value, onChange, onClick }) => (
    <input
        className={className}
        type='email'
        name={htmlName}
        value={value}
        onClick={onClick ? (e) => onClick(e) : null}
        onChange={e => onChange(e)}
    />
)

export const Password = ({ className, htmlName, value, onClick, onChange }) => (
    <input
        className={className}
        type="password"
        name={htmlName}
        value={value}
        onClick={onClick ? (e) => onClick(e) : null}
        onChange={e => onChange(e)}
    />
)
export const Checkbox = ({ className, htmlName, value, onClick, onChange }) => (
    <input
        className={className}
        type="checkbox"
        name={htmlName}
        value={value}
        onClick={onClick ? (e) => onClick(e) : null}
        onChange={e => onChange(e)}
    />
)

export const Submit = ({ className, onClick, children }) => (
    <button
        type='Submit'
        className={className}
        onClick={onClick ? (e) => onClick(e) : null}
    >{children}</button>
)