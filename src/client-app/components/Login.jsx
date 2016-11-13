import React, { Component, PropTypes } from 'react'
import {logIn} from '../redux/user/actions'
import {connect} from 'react-redux'

class Login extends Component {

    constructor() {
        super();

        this.onLogin = this.onLogin.bind(this);
        this.onUsernameBlur = this.onUsernameBlur.bind(this);
        this.onPasswordBlur = this.onPasswordBlur.bind(this);

        this.state = {
            username: '',
            password: '',
            error: null
        }
    }

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    onLogin() {
        const {username, password} = this.state;
        const {dispatch} = this.props;

        if (username.length > 0 && password.length > 0) {
            dispatch(logIn(username, password))
        } else {
            this.setState({
                error: 'You must supply a username or password'
            })
        }
    }

    onUsernameBlur(evt) {
        const username = evt.target.value;

        this.setState({
            username,
            error: null
        })
    }

    onPasswordBlur(evt) {
        const password = evt.target.value;

        this.setState({
            password,
            error: null
        })
    }

    render() {
        const {username, password, error} = this.state;

        const errorSection = error != null
            ? <div className="error">
                {error}
            </div>
            : '';

        return <div>
            <div className="row">
                <label htmlFor="username">User Name:</label>
                <input type="text" name="username" defaultValue={username} onBlur={this.onUsernameBlur} />
            </div>
            <div className="row">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" defaultValue={password} onBlur={this.onPasswordBlur}/>
            </div>
            <div className="row">
                <button type="button" onClick={this.onLogin}>Login</button>
            </div>
            {errorSection}
        </div>
    }
}

export default connect()(Login)