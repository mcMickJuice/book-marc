import React, {PropTypes} from 'react';
import {Link} from 'react-router'
import requireBookmark from './requireBookmark'

const ViewBookmark = ({bookmark}) => {
    return (
        <div>
           <h3>{bookmark.title}</h3>
           <a href={bookmark.url} target="_blank">Open Article</a> 

           <div>
            <Link to={`/bookmark/${bookmark.id}/edit`}>Edit this</Link>
           </div>
        </div>
    );
};

ViewBookmark.propTypes = {
    bookmark: PropTypes.shape({
        id: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })
}

export default requireBookmark(ViewBookmark)