import React, { Component, PropTypes as T } from 'react';
import BookmarkActivityChart from './BookmarkActivityChart'
import TagOverviewChart from './TagOverviewChart'
import { getDashboardData } from '../../common/dashboardService'


class Home extends Component {
    constructor() {
        super()

        this.state = {
            tagData: [],
            bookmarkData: [],
            isLoading: true
        }
    }

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
                    <div style={{ width: '90%', height: '300px', margin: 'auto' }}>
                        <BookmarkActivityChart data={bookmarkData} />
                    </div>
                    <div style={{ width: '60%', height: '400px', margin: 'auto' }}>
                        <TagOverviewChart data={tagData} />
                    </div>
                </div>
        )

            ;
    }
}

export default Home