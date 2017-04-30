/* @flow */
import React, { PropTypes as T } from 'react';

export type Props = {
    children: any,
    className?: string,
};

const Card = (props: Props) => {
    const {children, className} = props;
    return <div className={`bm-card ${className}`}>
        {children}
    </div>
}

export default Card