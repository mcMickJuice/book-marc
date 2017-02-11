import React, {PropTypes as T} from 'react'

const Card = ({children, className}) => {
    return <div className={`bm-card ${className}`}>
        {children}
    </div>
}

Card.propTypes = {
    children: T.any.isRequired,
    className: T.string
}

export default Card