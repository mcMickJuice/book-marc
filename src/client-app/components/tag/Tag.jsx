import React, {PropTypes as T} from 'react'
import * as css from '../../styles/tag'

const Tag = ({name, onRemoveTag, className = ''}) => {
    const removeElement = onRemoveTag != null
        ? <div className="bm-tag__remove" onClick={onRemoveTag}>
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

Tag.propTypes = {
    onRemoveTag: T.func,
    name: T.string.isRequired,
    className: T.string
}

export default Tag