import React, { PropTypes as T, Component } from 'react'
import RatingSelector from './RatingSelector'
import MarkdownViewer from '../../elements/MarkdownViewer'

class BookmarkDescription extends Component {

    constructor() {
        super();

        this.state = {
            isEditingDescription: false
        }
    }

    static propTypes = {
        description: T.string,
        rating: T.number,
        onDescriptionUpdate: T.func.isRequired,
        onRatingUpdate: T.func.isRequired
    }

    onDescriptionEdit = () => {
        setTimeout(() => {
            //for some reason doing this sync wasn't setting focus
            this.textArea.focus();
        }, 50)

        this.setState({
            isEditingDescription: true
        })
    }

    onDescriptionExit = (evt) => {
        const {onDescriptionUpdate, description} = this.props;
        const nextDescription = evt.target.value;

        this.setState({
            isEditingDescription: false
        })

        if (nextDescription === description) return;

        onDescriptionUpdate(nextDescription);
    }

    onRatingSelect = (newRating) => {
        const {onRatingUpdate} = this.props

        onRatingUpdate(newRating);
    }

    render() {
        const {description, rating} = this.props;
        const {isEditingDescription} = this.state;


        const displayDescription = (description != null && description.length > 0)
            ? <MarkdownViewer rawText={description} />
            : <span>Add a Description!</span>

        return <div>
            <div>
                <label htmlFor="description" className="bm-input__label">Description (double click to edit)</label>
                <div style={{ display: isEditingDescription ? 'initial' : 'none' }}>
                    <textarea placeholder="Add a Description!"
                        ref={ta => this.textArea = ta}
                        defaultValue={description}
                        name="description"
                        id="descriptionArea"
                        cols="30" rows="10"
                        onBlur={this.onDescriptionExit}>
                    </textarea>
                </div>
                <div style={{ display: !isEditingDescription ? 'initial' : 'none' }}
                    onDoubleClick={this.onDescriptionEdit}>{displayDescription}</div>
            </div>
            <div className="row">
                <label htmlFor="rating" className="bm-input__label">Rating</label>
                <RatingSelector initialRating={rating} onRatingSelect={this.onRatingSelect} />
            </div>

        </div>
    }
}

export default BookmarkDescription