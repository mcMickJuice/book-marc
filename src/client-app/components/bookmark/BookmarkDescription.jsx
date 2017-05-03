/* @flow */
import React, { Component } from 'react';
import RatingSelector from './RatingSelector'
import MarkdownEditor from '../../elements/MarkdownEditor'

export type Props = {
    description?: string,
    rating?: number,
    onDescriptionUpdate: Function,
    onRatingUpdate: Function,
};

type State = { isEditingDescription: boolean };

class BookmarkDescription extends Component {
    state: State;
    onDescriptionExit: number => void
    onRatingSelect: number => void
    onDescriptionEdit: () => void

    constructor() {
        super();

        this.onDescriptionExit = this.onDescriptionExit.bind(this)
        this.onRatingSelect = this.onRatingSelect.bind(this)
        this.onDescriptionEdit = this.onDescriptionEdit.bind(this)

        this.state = {
            isEditingDescription: false
        }
    }

    props: Props;

    onDescriptionEdit() {
        this.setState({
            isEditingDescription: true
        })
    }

    onDescriptionExit(nextDescription: string) {
        const { onDescriptionUpdate, description } = this.props;

        if (nextDescription === description) return;

        onDescriptionUpdate(nextDescription);
    }

    onRatingSelect(newRating: number) {
        const { onRatingUpdate } = this.props

        onRatingUpdate(newRating);
    }

    render() {
        const { description, rating } = this.props;

        return <div>
            <div>
                <div htmlFor="description" className="bm-input__label">Description (double click to edit)</div>
                <div>
                    <MarkdownEditor initialText={description}
                        collapsible={true}
                        onBlur={this.onDescriptionExit}>
                        <span className="bm-description__no-text"
                            style={{ color: 'gray' }}>
                            No Description Provided
                            </span>
                    </MarkdownEditor>
                </div>
            </div>
            <div className="row">
                <label htmlFor="rating" className="bm-input__label">Rating</label>
                <RatingSelector initialRating={rating} onRatingSelect={this.onRatingSelect} />
            </div>

        </div>
    }
}

export default BookmarkDescription