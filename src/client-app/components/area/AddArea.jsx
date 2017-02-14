import React, {Component, PropTypes as T} from 'react'
import {createArea} from '../../common/bookmarkClient'
import TagCreator from '../tag/TagCreator'
import {connect} from 'react-redux'
import {addArea} from '../../redux/area/actions'
import {mapTag} from '../../redux/tag/selectors'

class AddArea extends Component {
    static propTypes = {
        history: T.any.isRequired,
        addArea: T.func.isRequired,
        tagMapper: T.func.isRequired
    }

    constructor() {
        super();

        this.onNameBlur = this.onNameBlur.bind(this);
        this.addArea = this.addArea.bind(this);
        this.onTagSelect = this.onTagSelect.bind(this);

        this.state = {
            name: '',
            tags: []
        }
    }

    onNameBlur(evt) {
        const name = evt.target.value

        this.setState({
            name
        })
    }

    addArea() {
        const {name, tags} = this.state
        const {push} = this.props.history

        const newTag = {
            name,
            tags
        }

        createArea(newTag)
            .then(area => {
                push(`/area/${area.id}`)
            })
    }

    onTagSelect(tag) {
        const {id} = tag;
        const {tags} = this.state;
        console.log(id)

        if(tags.indexOf(id) === -1){
            this.setState({
                tags: [...tags, id]
            })
        }
    }

    
    render() {
        const {name, tags} = this.state;
        const {tagMapper} = this.props;
        console.log(tags)

        const tagSection = tags.length > 0
            ? (<div>
                {tags.map(tagMapper).map(t => <div key={t.id}>{t.name}</div>)}
            </div>)
            : ''

        return (<div>
            <h3>Create Area</h3>
            <div>
                <div className="bm-input__row">
                    <label htmlFor="name" className="bm-input__label">Area Name</label>
                    <input type="text"
                        className="bm-input bm-input__text"
                        name="name"
                        defaultValue={name}
                        onBlur={this.onNameBlur}
                    />
                </div>
                <TagCreator selectTag={this.onTagSelect}></TagCreator>
                <div className="bm-button" onClick={this.addArea}>
                    Add Area
                </div>
                {tagSection}
            </div>
        </div>)
    }
}

const mapStateToProps = state => {
    return {
        tagMapper: mapTag(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addArea: area => {
            return dispatch(addArea(area))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArea)