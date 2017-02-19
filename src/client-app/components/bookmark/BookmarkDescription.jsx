import React, {PropTypes as T, Component} from 'react'
import Dropdown from '../../elements/Dropdown'

const ratingOptions = [
    {value: 1, display: 'One'},
    {value: 2, display: 'Two'},
    {value: 3, display: 'Three'},
    {value: 4, display: 'Four'},
    {value: 5, display: 'Five'}
]

const getOption = rating => {
    return ratingOptions.filter(o => o.value === rating)[0];
}

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
        rating: T.number,
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

    onRatingChange(newRating) {
        const {onRatingUpdate} = this.props

        onRatingUpdate(newRating);
    }

    render() {
        const {description, rating} = this.props;
        const {isEditingDescription} = this.state;

        var selectedOption = getOption(rating || 1);

        const displayDescription = (description != null && description.length > 0)
            ? description
            : <span>Add a Description!</span>

        return <div>
            <div>
                <label htmlFor="description" className="bm-input__label">Description</label>
                <div style={{display: isEditingDescription ? 'initial' : 'none'}}>
                    <textarea placeholder="Add a Description!"
                        defaultValue={description} 
                        name="description" 
                        id="descriptionArea" 
                        cols="30" rows="10" 
                        onBlur={this.onDescriptionExit}>
                    </textarea>
                </div>
                <div style={{display: !isEditingDescription ? 'initial' : 'none'}} 
                onDoubleClick={this.onDescriptionEdit}>{displayDescription}</div>
            </div>
            <div className="row">
                    <label htmlFor="rating" className="bm-input__label">Rating</label>
                    <Dropdown onSelect={this.onRatingChange}
                    selected={selectedOption.display}
                    options={ratingOptions}
                     />
                </div>
            
        </div>
    }
}

export default BookmarkDescription