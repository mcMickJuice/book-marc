import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {mapTag} from '../../redux/tag/selectors'
import * as css from '../../styles/tag-list'
import Tag from './Tag'

const TagView = ({tags}) => {

    if(tags.length === 0) {
        return false
    }
    const tagList = tags.map(t => {
        return <Tag className="bm-tag-list__tag" key={t.id} name={t.name}>
        </Tag>
    })

    return <div className="bm-tag-list">
        {tagList}
    </div>
}

TagView.propTypes = {
    tags: T.arrayOf(T.shape({
        id: T.string.isRequired,
        name: T.string.isRequired
    }))
}

const mapStateToProps = (state, ownProps) => {
    const {tags} = ownProps;
    const mapper = mapTag(state)
    const tagList = (tags || []).map(mapper)
    
    return {
        tags: tagList
    }
}

export default connect(mapStateToProps)(TagView)