import React from 'react'
import './Flex.css'

export const Flex = ({ className, children }) => (
    <div className={`${className} flex`}>
        {children}
    </div>
)