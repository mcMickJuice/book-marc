import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {logOut} from '../redux/user/actions'
import {isUserLoggedIn} from '../redux/user/selectors'

const LogoutButton = ({logout, isVisible}) => {
    var toRender = isVisible
        ? <a className="bm-link" href="" onClick={logout}>
            Logout
        </a>
        : <span></span>

    return toRender
}

LogoutButton.propTypes = {
    logout: T.func.isRequired,
    isVisible: T.bool.isRequired
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