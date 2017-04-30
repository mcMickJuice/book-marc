/* @flow */
import React, { PropTypes as T } from 'react';
import {connect} from 'react-redux'
import {logOut} from '../redux/user/actions'
import {isUserLoggedIn} from '../redux/user/selectors'

export type Props = {
    logout: Function,
    isVisible: boolean,
};

const LogoutButton = (props: Props) => {
    const {logout, isVisible} = props;
    var toRender = isVisible
        ? <a className="bm-link" href="" onClick={logout}>
            Logout
        </a>
        : <span></span>

    return toRender
}

const mapStateToProps = state => {
    return {
        isVisible: isUserLoggedIn(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: evt => {
            evt.preventDefault();
            dispatch(logOut());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)