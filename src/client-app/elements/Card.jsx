//@flow
import React from 'react';

const Card = ({ children, className }: { children?: string | React.Element<any>, className?: string }): React.Element<any> => {
    return <div className={`bm-card ${className || ''}`}>
        {children}
    </div>
}

export default Card