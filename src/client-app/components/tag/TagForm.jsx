import React, {PropTypes as T} from 'react'
import TagCreator from './TagCreator'
import ToggleView from '../../elements/ToggleView'

const toggleTagButtonFunc = (isOpen, onClick) => {
    const toggleClass = isOpen ? 'bm-tag-creator__toggle-button--open' : ''

    return <div className={`bm-tag-creator__toggle-button ${toggleClass}`} onClick={onClick}>
        {isOpen ? 'Close' : 'Add Tag'}
    </div>
}

const TagForm = (props) => {
    return <ToggleView toggleButtonFunc={toggleTagButtonFunc}>
        <TagCreator {...props}></TagCreator>
    </ToggleView>
}

TagForm.propTypes = {}

export default TagForm