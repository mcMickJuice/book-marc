import React, {PropTypes} from 'react';
import {Link} from 'react-router'


const RecentlyAddedBookmark = ({title, url, id}) => {
    return (
        <div>
            <Link to={`/bookmark/${id}`}>
                {title}
            </Link>
        </div>
    );
};

RecentlyAddedBookmark.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

export default RecentlyAddedBookmark;