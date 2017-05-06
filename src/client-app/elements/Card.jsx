/* @flow */
import React from 'react';

const Card = ({ children, className }: { children: any, className?: string }) => {
    return <div className={`bm-card ${className || ''}`}>
        {children}
    </div>
}

export default Card