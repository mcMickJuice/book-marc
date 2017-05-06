/* @flow */
import React, { Component } from 'react';
import MarkdownViewer from './MarkdownViewer'
import { noop } from '../common/utility'
import * as css from '../styles/markdown-editor'
import debounce from 'lodash.debounce'

export type Props = {
    onBlur: string => void,
    onChange: string => void,
    initialText?: string,
    collapsible?: boolean,
    children?: number | string | React.Element<any> | Array<any>,
};

type State = {
    text: any,
    collapsed: any,
};

class MarkdownEditor extends Component {
    state: State;
    expandEditor: Function;
    onEditorChangeImpl: Function;
    onEditorChange: Function;
    onEditorBlur: Function;
    textArea: HTMLInputElement;

    static defaultProps = {
        onBlur: noop,
        onChange: noop,
        collapsible: false,
        initialText: '',
        children: 'No Text Provided'
    }

    constructor(props: Props) {
        super(props);

        this.onEditorBlur = this.onEditorBlur.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        //fire change after .5s of inactivity
        this.onEditorChangeImpl = debounce(this.onEditorChangeImpl.bind(this), 250);
        this.expandEditor = this.expandEditor.bind(this);

        this.state = {
            text: props.initialText,
            collapsed: props.collapsible
        }
    }

    props: Props;

    onEditorBlur(evt: any) {
        const value: string = evt.target.value;
        const {onBlur, collapsible} = this.props;

        onBlur(value);

        if (collapsible) {
            this.setState({
                collapsed: true
            })
        }
    }

    onEditorChange(evt: any) {
        const value:string = evt.target.value;

        this.onEditorChangeImpl(value);
    }

    onEditorChangeImpl(value: string) {
        const {onChange} = this.props;

        onChange(value);

        this.setState({
            text: value
        })
    }

    expandEditor() {
        setTimeout(() => {
            this.textArea.focus();
        }, 50)

        this.setState({
            collapsed: false
        })
    }

    render() {
        const {children} = this.props
        const {text, collapsed} = this.state;

        return (<div className="bm-markdown-editor" onDoubleClick={this.expandEditor}>
            {collapsed ? false : <div className="bm-markdown-editor__input">
                <textarea placeholder="Add a Description!"
                    ref={ta => this.textArea = ta}
                    defaultValue={text}
                    name="description"
                    id="descriptionArea"
                    cols="30" rows="10"
                    onChange={this.onEditorChange}
                    onBlur={this.onEditorBlur}>
                </textarea>
            </div>}
            
            <div className="bm-markdown-editor__viewer">
                {text.trim() == '' 
                ? children
                : <MarkdownViewer rawText={text} />}
            </div>
        </div>)
    }
}

export default MarkdownEditor