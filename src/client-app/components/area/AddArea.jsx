/* @flow */
import React, { Component, PropTypes as T } from 'react';
import { createArea } from '../../common/areaService'
import TagForm from '../tag/TagForm'
import { connect } from 'react-redux'
import { addArea } from '../../redux/area/actions'
import TagList from '../tag/TagList'

export type Props = {
    history: any,
    addArea: Function,
};

class AddArea extends Component {
    
    constructor() {
        super();

        this.onNameBlur = this.onNameBlur.bind(this);
        this.addArea = this.addArea.bind(this);
        this.onTagSelect = this.onTagSelect.bind(this);
        this.onTagRemove = this.onTagRemove.bind(this)

        this.state = {
            name: '',
            tagIds: []
        }
    }

    props: Props;
    state: {
        name: string,
        tagIds: Array<number>
    };

    onNameBlur(evt) {
        const name = evt.target.value

        this.setState({
            name
        })
    }

    addArea() {
        const {name, tagIds} = this.state
        const {push} = this.props.history

        const newTag = {
            name,
            tags: tagIds
        }

        createArea(newTag)
            .then(area => {
                push(`/area/${area.id}`)
            })
    }

    onTagSelect(tag) {
        const {id} = tag;
        const {tagIds} = this.state;

        if (tagIds.indexOf(id) === -1) {
            this.setState({
                tagIds: [...tagIds, id]
            })
        }
    }

    onTagRemove(tagId) {
        const {tagIds} = this.state;

        this.setState({
            tagIds: tagIds.filter(t => t !== tagId)
        })
    }


    render() {
        const {name, tagIds} = this.state;

        return (<div>
            <h3>Create Area</h3>
            <div>
                <div className="bm-input__row">
                    <label htmlFor="name" className="bm-input__label">Area Name</label>
                    <input type="text"
                        name="name"
                        defaultValue={name}
                        onBlur={this.onNameBlur}
                    />
                </div>
                <TagForm selectTag={this.onTagSelect}></TagForm>
                <TagList tags={tagIds} onRemoveTag={this.onTagRemove} />
            </div>
            <div className="bm-button" onClick={this.addArea}>
                Add Area
            </div>
        </div>)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addArea: area => {
            return dispatch(addArea(area))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddArea)