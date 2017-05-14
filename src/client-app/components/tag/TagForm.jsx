import React from 'react';
import TagSearch from './TagSearch'
import ToggleView from '../../elements/ToggleView'
import TagCreateButton from './TagCreateButton'

const toggleTagButtonFunc = (isOpen, onClick) => {
    const toggleClass = isOpen ? 'bm-tag-creator__toggle-button--open' : ''

    //TODO flow-error unexpected token className
    return <div className={`bm-tag-creator__toggle-button ${toggleClass}`} onClick={onClick}>
        {isOpen ? 'Close' : 'Add Tag'}
    </div>
}

// export type Props = {};

// const TagForm = (props: Props) => {
const TagForm = (props) => {
    return <ToggleView toggleButtonFunc={toggleTagButtonFunc}
        destroyChildOnClose={true}>
        <TagSearch {...props} TagCreateButton={TagCreateButton}></TagSearch>
    </ToggleView>
}

export default TagForm