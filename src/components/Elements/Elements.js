export const Button = ({ className, text, action, history }) => (
    <button
        type="button"
        className={className}
        onClick={action}
    >
        {text}
    </button>
)

export const Image = ({ src, className, alt }) => (
    <img src={src} className={className} alt={alt} />
)

export const P = ({ className, text }) => (
    <p className={className}>{text}</p>
)

export const Span = ({ className, text }) => (
    <span className={className}>{text}</span>
)
export const H1 = ({ className, text }) => (
    <h1 className={className}>{text}</h1>
)