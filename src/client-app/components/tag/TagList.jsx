/* @flow */
import React from 'react';
import { connect } from 'react-redux'
import { mapTag } from '../../redux/tag/selectors'
import * as css from '../../styles/tag-list'
import Tag from './Tag'

export type Props = {
    tags?: Array<{
        id: string,
        name: string,
    }>,
    onRemoveTag?: Function,
};

const TagView = (props: Props) => {
    const {tags, onRemoveTag} = props;
    if (tags.length === 0) {
        return false
    }
    const tagList = tags.map(t => {
        return <Tag className="bm-tag-list__tag"
            key={t.id}
            id={t.id}
            onRemoveTag={onRemoveTag}
            name={t.name}>
        </Tag>
    })

    return <div className="bm-tag-list">
        {tagList}
    </div>
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