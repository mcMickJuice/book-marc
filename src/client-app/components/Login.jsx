import React, { Component, PropTypes as T } from 'react'
import {logIn} from '../redux/user/actions'
import {login} from '../common/authClient'
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
        onLogin: T.func.isRequired
    }

    onLogin() {
        const {username, password} = this.state;
        const {onLogin} = this.props;

        if (username.length > 0 && password.length > 0) {
            login(username, password)
                .then(onLogin, () => {
                    this.setState({
                        error: 'Invalid username or password'
                    })
                })
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
            ? <div className="bm-error">
                {error}
            </div>
            : '';

        return <div>
        <h2>Login</h2>
            <div className="bm-input__row">
                <label htmlFor="username" className="bm-input__label">User Name</label>
                <input type="text" className="bm-input bm-input__text" name="username" defaultValue={username} onBlur={this.onUsernameBlur} />
            </div>
            <div className="bm-input__row">
                <label htmlFor="password" className="bm-input__label">Password</label>
                <input type="password" className="bm-input bm-input__text" name="password" defaultValue={password} onBlur={this.onPasswordBlur}/>
            </div>
            <div className="bm-button" onClick={this.onLogin}>
                Login
            </div>
            {errorSection}
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: userInfo => dispatch(logIn(userInfo))
    }
}

export default connect(null, mapDispatchToProps)(Login)