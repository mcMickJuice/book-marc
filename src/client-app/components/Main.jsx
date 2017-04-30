/* @flow */
import React, { Component } from 'react';
import { Link } from 'react-router'
import * as css from '../styles/main'
import LogoutButton from './LogoutButton'
import { getAllTags } from '../redux/tag/actions'
import {connect} from 'react-redux'

export type Props = {
    children: number | string | React.Element | Array<any>,
    dispatch: Function,
};

type State = { isLoading: boolean };

class Main extends Component {
    state: State;
    constructor() {
        super();

        this.state = {
            isLoading: true
        }
    }

    props: Props;

    componentDidMount() {
        const {dispatch} = this.props;
        
        dispatch(getAllTags())
            .then(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    render() {
        const {children} = this.props;
        const {isLoading} = this.state;

        return (
            <div>
                <div className="bm-header">
                    <div className="bm-header__title">
                        <Link to="/">Book Marc</Link>
                    </div>
                    <div className="bm-header__links">
                        <Link to="/bookmark">Bookmark</Link>
                        <Link to="/area">Area</Link>
                        <LogoutButton />
                    </div>
                </div>
                <div className="bm-app-body">
                    {isLoading ? 'Loading' : children}
                </div>
            </div>
        );
    }
}

export default connect()(Main);