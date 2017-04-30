/* @flow */
import React, { PropTypes as T } from 'react';
import Card from '../../elements/Card'
import Date from '../../elements/Date'
import MarkdownViewer from '../../elements/MarkdownViewer'

export type Props = {
    blurb: string,
    createdDate: number,
    title: string,
    className?: string,
};

const AreaNote = (props: Props) => {
    const {title, blurb, createdDate, className} = props;
    return (<Card className={className}>
        <h3>{title}</h3>
        <div>
            <MarkdownViewer rawText={blurb}/>
        </div>
        <div>
            <Date date={createdDate} />
        </div>
    </Card>)
}

export default AreaNote
