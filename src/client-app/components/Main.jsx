import React, {PropTypes} from 'react';
import {Link} from 'react-router'

const Main = ({children}) => {
    return (
        <div>
            <div className="header">
                <div className="title">
                    Book Marc
                </div>
                <Link to="/">Home</Link>
                <Link to="/bookmark">Bookmark</Link>
            </div>
            <div className="app-body">
                {children}
            </div>
        </div>
    );
};

Main.propTypes = {
    children: PropTypes.node.isRequired
}

export default Main;