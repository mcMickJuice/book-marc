import React, {PropTypes as T, Component} from 'react'

class BookmarkDescription extends Component {
    
    constructor() {
        super();

        this.onDescriptionEdit = this.onDescriptionEdit.bind(this);
        this.onDescriptionExit = this.onDescriptionExit.bind(this);
        this.onRatingChange = this.onRatingChange.bind(this);

        this.state = {
            isEditingDescription: false
        }
    }
    
    static propTypes = {
        description: T.string,
        rating: T.string,
        onDescriptionUpdate: T.func.isRequired,
        onRatingUpdate: T.func.isRequired
        }

    onDescriptionEdit() {
        this.setState({
            isEditingDescription: true
        })
    }

    onDescriptionExit(evt) {
        const {onDescriptionUpdate, description} = this.props;
        const nextDescription = evt.target.value;

        this.setState({
            isEditingDescription: false
        })

        if(nextDescription === description) return;

        onDescriptionUpdate(nextDescription);
    }

    onRatingChange(evt) {
        const {onRatingUpdate} = this.props
        const rating = evt.target.value

        onRatingUpdate(rating);
    }

    render() {
        const {description, rating} = this.props;
        const {isEditingDescription} = this.state;

        return <div>
            <div>
                <label htmlFor="description">Description</label>
                <div style={{display: isEditingDescription ? 'initial' : 'none'}}>
                    <textarea defaultValue={description} 
                        name="description" 
                        id="descriptionArea" 
                        cols="30" rows="10" 
                        onBlur={this.onDescriptionExit}>
                    </textarea>
                </div>
                <div style={{display: !isEditingDescription ? 'initial' : 'none'}} 
                onDoubleClick={this.onDescriptionEdit}>{description}</div>
            </div>
            <div className="row">
                    <label htmlFor="rating">Rating</label>
                    <select defaultValue={rating} name="rating" 
                    id="rating" 
                    onChange={this.onRatingChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            
        </div>
    }
}

export default BookmarkDescription