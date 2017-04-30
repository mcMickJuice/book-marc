/* @flow */
import React from 'react';
import TagSearch from './TagSearch'
import ToggleView from '../../elements/ToggleView'
import TagCreateButton from './TagCreateButton'

const toggleTagButtonFunc = (isOpen, onClick) => {
    const toggleClass = isOpen ? 'bm-tag-creator__toggle-button--open' : ''

    return <div className={`bm-tag-creator__toggle-button ${toggleClass}`} onClick={onClick}>
        {isOpen ? 'Close' : 'Add Tag'}
    </div>
}

export type Props = {};

const TagForm = (props: Props) => {
    return <ToggleView toggleButtonFunc={toggleTagButtonFunc}
        destroyChildOnClose={true}>
        <TagSearch {...props} TagCreateButton={TagCreateButton}></TagSearch>
    </ToggleView>
}

export default TagForm