import React, {Component, PropTypes} from 'react';
import requireBookmark from './requireBookmark'
import {connect} from 'react-redux'
import {updateBookmark} from '../redux/bookmark/actions'

class EditBookmark extends Component {
    constructor(props) {
        super(props);

        this.onRankingChange = this.onRankingChange.bind(this)
        this.onOverviewChange = this.onOverviewChange.bind(this)
        this.submit = this.submit.bind(this)

        const {overview, ranking} = props.bookmark;

        this.state = {
            ranking,
            overview,
            canSubmit: false
        }
    }

    static propTypes = {
        bookmark: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentWillReceiveProps(nextProps) {
        const {ranking, overview} = nextProps;
        
        this.setState({
            ranking,
            overview
        })
    }

    validate() {
        const {overview} = this.state;

        const hasOverview = overview !== '';

        this.setState({
            canSubmit: hasOverview
        })
    }

    onRankingChange(evt) {
        const ranking = evt.target.value
        this.validate();
        this.setState({
            ranking
        })
    }

    onOverviewChange(evt) {
        const overview = evt.target.value
        this.validate();

        this.setState({
            overview
        })
    }

    submit() {
        const {canSubmit, overview, ranking} = this.state;
        if (!canSubmit) return false;
        const {dispatch, bookmark} = this.props;

        console.log(overview,ranking)
        dispatch(updateBookmark({
            ...bookmark,            
            overview,
            ranking,
        }))

        this.setState({
            canSubmit: false
        })
    }

    render() {
        const {bookmark} = this.props;
        const {ranking, overview, canSubmit} = this.state;

        return (
            <div>
                This is edit for {bookmark.title}
                <div className="row">
                    <label htmlFor="ranking">Ranking</label>
                    <select value={ranking} name="ranking" id="" onChange={this.onRankingChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="overview">Overview</label>
                    <textarea value={overview} name="overview" id="" cols="30" rows="10" onChange={this.onOverviewChange}>
                    </textarea>
                </div>
                <div className={`button ${canSubmit ? '' : 'disabled'}`}
                    onClick={this.submit}>
                    Submit Changes
                </div>
            </div>
        );
    }
}

const editBookmark = requireBookmark(EditBookmark);

export default connect()(editBookmark)