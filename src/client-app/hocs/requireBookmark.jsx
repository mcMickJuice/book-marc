/* @flow */
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import {getBookmark} from '../redux/bookmark/actions'
import {getBookmarkById} from '../redux/bookmark/selectors'

const requireBookmark = Bookmark => {
    class RequireBookmark extends Component {

        componentDidMount() {
            this.props.maybeFetchBookmark()
        }

        render() {
            const {bookmark, ...rest} = this.props;

            const toRender = bookmark == null
                ? <div>Loading Bookmark...</div>
                : <Bookmark bookmark={bookmark} {...rest} />

            return <div>
                {toRender }
            </div >
        }
    }

    const mapStateToProps = (state, ownProps) => {
        const {params: {id}, ...rest} = ownProps;
        const bookmark = getBookmarkById(state, id)

        return {
        ...rest,
        bookmark
        }
    }

    const mapDispatchToProps = (dispatch, ownProps) => {
        const {params: {id}} = ownProps;

        return {
            maybeFetchBookmark: () => {
                dispatch(getBookmark(id))
            }
        }
    }

    const mergeProps = (stateProps, dispatchProps) => {
        const hasBookmark = !!stateProps.bookmark;
        const {maybeFetchBookmark} = dispatchProps;

        return {
            ...stateProps,
        maybeFetchBookmark: hasBookmark ? () => { } : maybeFetchBookmark
        }
    }

    return connect(mapStateToProps, mapDispatchToProps, mergeProps)(RequireBookmark)

}





export default requireBookmark;
