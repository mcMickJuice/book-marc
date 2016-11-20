import React, {Component, PropTypes as T} from 'react';
import {connect} from 'react-redux'
import {updateBookmarkDescription, updateBookmarkRating} from '../redux/bookmark/actions'

class EditBookmark extends Component {
    constructor(props) {
        super(props);

        this.onRatingChange = this.onRatingChange.bind(this)
        this.onDescriptionBlur = this.onDescriptionBlur.bind(this)

        const {description, rating} = props.bookmark;

        this.state = {
            rating,
            description,
            canSubmit: false
        }
    }

    static propTypes = {
        bookmark: T.object.isRequired,
        dispatch: T.func.isRequired
    }

    componentWillReceiveProps(nextProps) {
        const {rating, description} = nextProps;
        
        this.setState({
            rating,
            description
        })
    }

    onRatingChange(evt) {
        const {dispatch, bookmark} = this.props
        const rating = evt.target.value
        
        dispatch(updateBookmarkRating({
            ...bookmark,
            rating
        }))
    }

    onDescriptionBlur(evt) {
        const nextDescription = evt.target.value
        const {dispatch, bookmark} = this.props;
        const {description} = this.state;

        if(nextDescription === description) return;

        dispatch(updateBookmarkDescription({
            ...bookmark,
            description: nextDescription
        }))
    }

    render() {
        const {bookmark} = this.props;
        const {rating, description} = this.state;

        return (
            <div>
                This is edit for {bookmark.title}
                <div className="row">
                    <label htmlFor="rating">Rating</label>
                    <select defaultValue={rating} name="rating" id="" onChange={this.onRatingChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea defaultValue={description} 
                    name="description" 
                    id="descriptionArea" 
                    cols="30" rows="10" 
                    onBlur={this.onDescriptionBlur}>
                    </textarea>
                </div>
            </div>
        );
    }
}

export default connect()(EditBookmark)