/* @flow */
import React, { PropTypes as T } from 'react';
import * as css from '../../styles/tag'

export type Props = {
    onRemoveTag?: Function,
    name: string,
    id: string,
    className?: string,
};

const Tag = (props: Props) => {
    const {name, id, onRemoveTag, className = ''} = props;
    const removeElement = onRemoveTag != null
        ? <div className="bm-tag__remove" onClick={() => onRemoveTag(id)}>
            <div className="bm-tag__remove__button">
                x
            </div>
        </div>
        : '';


    return <div className={`bm-tag ${className}`}>
        <div className={'bm-tag__name'}>{name}</div>
        {removeElement}        
    </div>
}

export default Tag