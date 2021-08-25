import React, { useState } from 'react'

export default function Test({ initialCount }) {
    const [count, setCount] = useState(initialCount)
    // console.log('rendering')

    const initialValue = () => {
        setCount(initialCount)
    }

    const incrementValueState = () => {
        setCount(count + 1)
    }
    const decrementValueState = () => {
        setCount(count - 1)
    }
    const currentValueState = () => {
        setCount(count)
    }

    const incrementValueCB = () => {
        setCount(prev => prev + 1)
    }
    const decrementValueCB = () => {
        setCount(prev => prev - 1)
    }
    const currentValueCB = () => {
        setCount(prev => prev)
    }

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={initialValue}>initialValue</button>
            <br></br>
            <br></br>
            <button onClick={incrementValueState}>incrementValueState</button>
            <button onClick={decrementValueState}>decrementValueState</button>
            <button onClick={currentValueState}>currentValueState</button>
            <br></br>
            <br></br>
            <button onClick={incrementValueCB}>incrementValueCB</button>
            <button onClick={decrementValueCB}>decrementValueCB</button>
            <button onClick={currentValueCB}>currentValueCB</button>
        </div>
    )
}
