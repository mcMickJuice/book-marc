import React, {Component, PropTypes as T} from 'react'
import Area from './Area'
import {connect} from 'react-redux'
import {getAreaFromState} from '../../redux/area/selectors'
import {getAreaById, addAreaNote} from '../../redux/area/actions'

class AreaView extends Component {
    static propTypes = {
        area: T.object,
        getAreaById: T.func.isRequired,
        onAddNote: T.func.isRequired
    }

    constructor() {
        super();

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const {area} = this.props;

        if(area != null) {
            this.setState({
                isLoading: false
            })
        } else {
            this.props.getAreaById()
        }
    }

    render() {
        const {isLoading} = this.state;
        const {area, onAddNote} = this.props;

        return (<div>
            {!area && isLoading
                ? 'Is Loading'
                : <Area area={area} onAddNote={onAddNote}/>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaView)