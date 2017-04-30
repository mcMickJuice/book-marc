/* @flow */
import React, { Component, PropTypes as T } from 'react';
import showdown from 'showdown'
import * as codeSyntaxCss from '../styles/markdown-themes/monokai-sublime.css'
import highlightJs from 'highlight'
import * as widgetCss from '../styles/markdown-viewer'
import { queryAll } from '../common/domHelpers'

export type Props = { rawText: string };

class MarkdownViewer extends Component {
    highlightCodeBlocks: Function;
    constructor() {
        super();
    }

    props: Props;

    componentWillMount() {
        this.convertor = new showdown.Converter();
    }

    componentDidMount() {
        this.highlightCodeBlocks()
    }

    highlightCodeBlocks() {
        //filter to only get code blocks
        const codeBlocks = queryAll('#markdown pre > code')
        codeBlocks.forEach(c => {
            highlightJs.highlightBlock(c)
        })
    }

    componentDidUpdate() {
        this.highlightCodeBlocks()
    }

    render() {
        const {rawText} = this.props;
        const markdown = this.convertor.makeHtml(rawText);

        return (<div className="bm-markdown-viewer">
            <div id="markdown" className="bm-markdown-viewer__viewer"
                dangerouslySetInnerHTML={{ __html: markdown }}>

            </div>
        </div>)
    }
}

export default MarkdownViewer