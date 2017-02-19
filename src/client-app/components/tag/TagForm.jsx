import React, {PropTypes as T} from 'react'
import TagSearch from './TagSearch'
import ToggleView from '../../elements/ToggleView'
import TagCreateButton from './TagCreateButton'

const toggleTagButtonFunc = (isOpen, onClick) => {
    const toggleClass = isOpen ? 'bm-tag-creator__toggle-button--open' : ''

    return <div className={`bm-tag-creator__toggle-button ${toggleClass}`} onClick={onClick}>
        {isOpen ? 'Close' : 'Add Tag'}
    </div>
}

const TagForm = (props) => {
    return <ToggleView toggleButtonFunc={toggleTagButtonFunc}>
        <TagSearch {...props} tagCreateButton={TagCreateButton}></TagSearch>
    </ToggleView>
}

TagForm.propTypes = {}

export default TagForm