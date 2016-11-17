import React, {PropTypes as T} from 'react'
import {connect} from 'react-redux'
import {logOut} from '../redux/user/actions'
import {isUserLoggedIn} from '../redux/user/selectors'

const LogoutButton = ({logout, isVisible}) => {
    var toRender = isVisible
        ? <div className="bm-link" onClick={logout}>
            Logout
        </div>
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
        logout: () => {
            dispatch(logOut());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton)