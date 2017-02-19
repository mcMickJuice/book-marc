import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { createTag } from '../../redux/tag/actions'
import { isValidTag } from '../../redux/tag/selectors'

const TagCreateButton = ({isInvalidTag, createTag}) => {

    return <div className={`bm-button ${isInvalidTag
        ? 'bm-button--disabled'
        : ''} bm-tag-search__search-row__button`}
        onClick={createTag}>Add Tag</div>
}

TagCreateButton.propTypes = {
    isInvalidTag: T.bool.isRequired,
    createTag: T.func.isRequired
}

const mapStateToProp = (state, ownProps) => {
    const isInvalidTag = !isValidTag(state)(ownProps.tagSearch)

    return {
        isInvalidTag
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    const {tagSearch} = ownProps;

    return {
        createTag: () => {
            const tag = {
                name: tagSearch
            }
            return dispatch(createTag(tag))
        }
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const {isInvalidTag} = stateProps;
    const {createTag} = dispatchProps;
    const {onCreateTag} = ownProps;

    return {
        isInvalidTag,
        createTag: () => {
            if(isInvalidTag) return;

            return createTag().then(tag => onCreateTag(tag))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProps, mergeProps)(TagCreateButton)