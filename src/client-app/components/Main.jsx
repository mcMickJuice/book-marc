import React, {PropTypes} from 'react';
import {Link} from 'react-router'
import * as css from '../styles/main'
import LogoutButton from './LogoutButton'

const Main = ({children}) => {
    return (
        <div>
            <div className="bm-header">
                <div className="bm-header__title">
                    <Link to="/">Book Marc</Link>
                </div>
                <div className="bm-header__links">
                    
                    <Link to="/bookmark">Bookmark</Link>
                    <LogoutButton />
                </div>
            </div>  
            <div className="bm-app-body">
                {children}
            </div>
        </div>
    );
};

Main.propTypes = {
    children: PropTypes.node.isRequired
}

export default Main;