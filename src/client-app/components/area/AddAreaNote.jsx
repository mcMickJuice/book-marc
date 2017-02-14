import React, {Component, PropTypes as T} from 'react'

class AddAreaNote extends Component {
    static propTypes = {
        onAddNote: T.func.isRequired,
        areaId: T.string.isRequired
    }

    constructor() {
        super();

        this.onAddNote = this.onAddNote.bind(this);
        this.onBlurbBlur = this.onBlurbBlur.bind(this);
        this.onTitleBlur = this.onTitleBlur.bind(this);

        this.state = {
            title: '',
            blurb: '',
            showNote: false
        }
    }

    onAddNote() {
        const {onAddNote, areaId} = this.props;
        const {blurb, title} = this.state;

        const note = {
            title,
            blurb,
            createdDate: Date.now(),
            areaId
        }

        onAddNote(note);
    }

    onTitleBlur(evt) {
        const title = evt.target.value;

        this.setState({
            title
        })
    }

    onBlurbBlur(evt) {
        const blurb = evt.target.value;

        this.setState({
            blurb
        }) 
    }

    render() {
        const {onCancel} = this.props;

        return (<div>
            <h3>Add Area Note</h3>
            <div className="bm-button" onClick={onCancel}>X</div>
            <div className="bm-input__row">
                <label htmlFor="title">Title</label>
                <input type="text" className="bm-input bm-input__text" onBlur={this.onTitleBlur}/>
            </div>
            <div className="bm-input__row">
                <label htmlFor="blurb">Area Blur</label>
                <div>
                    <textarea name="" 
                    id="blurb" 
                    className="bm-input bm-input__textarea"
                    placeholder="Add a Blurb!"
                    name="blurb"
                    cols="30"
                    rows="10"
                    onBlur={this.onBlurbBlur}
                    ></textarea>
                </div>
            </div>
            <div className="bm-button" onClick={this.onAddNote}>Add Note</div>
        </div>)
    }
}

export default AddAreaNote