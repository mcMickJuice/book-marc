import React, { Component, PropTypes as T } from 'react'
import Area from './Area'
import { connect } from 'react-redux'
import { getAreaFromState } from '../../redux/area/selectors'
import { getAreaById, addAreaNote, addTagToArea, removeTagFromArea } from '../../redux/area/actions'

class AreaView extends Component {
    static propTypes = {
        area: T.object,
        getAreaById: T.func.isRequired,
        onAddNote: T.func.isRequired,
        onTagAdded: T.func.isRequired,
        onTagRemoved: T.func.isRequired
    }

    constructor() {
        super();

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const {area} = this.props;

        if (area != null) {
            this.setState({
                isLoading: false
            })
        } else {
            this.props.getAreaById()
        }
    }

    render() {
        const {isLoading} = this.state;
        const {area, onAddNote, onTagAdded, onTagRemoved} = this.props;

        return (<div>
            {/*we're passing dispatch props from AreaView to Area...could we not wrap Area in connect with 
            these dispatch props?*/}
            {!area && isLoading
                ? 'Is Loading'
                : <Area area={area} onAddNote={onAddNote} onTagAdded={onTagAdded} onTagRemoved={onTagRemoved}/>
            }
        </div>)
    }
}

const mapStateToProps = (state, ownProps) => {
    const {id} = ownProps.routeParams;
    const area = getAreaFromState(state)(id);

    return {
        area
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {id} = ownProps.routeParams

    return {
        getAreaById: () => {
            return dispatch(getAreaById(id))
        },
        onAddNote: note => {
            return dispatch(addAreaNote(note))
        },
        onTagAdded: tagId => {
            return dispatch(addTagToArea(id, tagId))
        },
        onTagRemoved: tagId => {
            return dispatch(removeTagFromArea(id, tagId))
        }
    }
}

const mergeProps = (stateProps, dispatchProps) => {
    const {area, ...otherStateProps} = stateProps
    const {onTagAdded, ...otherDispatchProps} = dispatchProps;

    return {
        ...otherStateProps,
        ...otherDispatchProps,
        area,
        onTagAdded: tag => {
            const {id} = tag;
            if (area.tags.indexOf(id) > -1) return;

            return onTagAdded(id);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AreaView)