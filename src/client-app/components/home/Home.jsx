/* @flow */
import React, { Component } from 'react';
import BookmarkActivityChart from './BookmarkActivityChart'
import TagOverviewChart from './TagOverviewChart'
import { getDashboardData } from '../../common/dashboardService'


export type Props = {};


class Home extends Component {
    constructor() {
        super()

        this.state = {
            tagData: [],
            bookmarkData: [],
            isLoading: true
        }
    }

    props: Props;

    componentDidMount() {
        getDashboardData()
            .then(data => {
                this.setState(() => {
                    return {
                        isLoading: false,
                        tagData: data.tagsOverview,
                        bookmarkData: data.bookmarkActivity
                    }
                })
            })
    }


    render() {
        const { tagData, bookmarkData, isLoading } = this.state;

        return (
            isLoading
                ? <div>Loading</div>
                :
                <div>
                    <div style={{ width: '90%', height: '300px', margin: '10px auto 40px auto' }}>
                        <h3>Bookmark Activity (Last 45 days)</h3>
                        <BookmarkActivityChart
                            hideLabels
                            data={bookmarkData} />
                    </div>
                    <div style={{ width: '90%', height: '400px', margin: '10px auto 40px auto' }}>
                        <h3>Top 5 Tags</h3>
                        <TagOverviewChart data={tagData} />
                    </div>
                </div>
        )

            ;
    }
}

export default Home