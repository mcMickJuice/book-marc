/* @flow */
import React from 'react';
import {getDateString} from '../common/dateService'

export type Props = { date: number };

const Date = (props: Props) => {
    const {date} = props;
    const dateString = getDateString(date);

    return <span>{dateString}</span>
}

export default Date