/* @flow */
import React from 'react';
import { Link } from 'react-router'
import Rating from './Rating'
import Date from '../../elements/Date'
import Card from '../../elements/Card'
import * as css from '../../styles/bookmark-row'

export type Props = { bookmark: BookmarkReviewType };

const BookmarkRow = (props: Props) => {
    const {bookmark} = props;
    const {title, id, rating, createdDate} = bookmark;

    return (
        <Card className='bm-bookmark-row'>
            <Link to={`/bookmark/${id}`} className="bm-bookmark-row__title">{title}</Link>
            <div className="bm-bookmark-row__date">
                <Date date={createdDate} />
            </div>
            <div className="bm-bookmark-row__rating">
                <Rating score={rating} />
            </div>
        </Card>
    )
}

export default BookmarkRow