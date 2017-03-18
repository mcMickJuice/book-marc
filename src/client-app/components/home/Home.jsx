import React, { Component, PropTypes as T } from 'react';
import BookmarkActivityChart from './BookmarkActivityChart'
import TagOverviewChart from './TagOverviewChart'


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
        setTimeout(() => {
            this.setState(() => {
                return {
                    isLoading: false,
                    tagData: [
                        { name: 'javascript', value: 20 },
                        { name: 'react', value: 10 },
                        { name: 'c#', value: 3 },
                        { name: 'videos', value: 1 }
                    ],
                    bookmarkData: [
                        { week: 'Feb 1', added: 10, read: 4 },
                        { week: 'Feb 8', added: 23, read: 23 },
                        { week: 'Feb 15', added: 31, read: 13 },
                        { week: 'Feb 22', added: 14, read: 21 },
                        { week: 'March 1', added: 27, read: 4 }
                    ]
                }
            })
        }, 2000)
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