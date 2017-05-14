import React, { Component } from 'react';
// import {connect, ConnectedComponent} from 'react-redux'
import {connect} from 'react-redux'
import {getBookmark} from '../redux/bookmark/actions'
import {getBookmarkById} from '../redux/bookmark/selectors'

// const requireBookmark = (Bookmark: React.Component<*, *, *> | ConnectedComponent<*,*,*,*>)  => {
const requireBookmark = (Bookmark)  => {
    class RequireBookmark extends Component {

        // props: {
        //     bookmark: BookmarkType,
        //     rest: Array<any>,
        //     maybeFetchBookmark: () => void
        // }

        componentDidMount() {
            this.props.maybeFetchBookmark()
        }

        render() {
            const {bookmark, ...rest} = this.props;

            const toRender = bookmark == null
                ? <div>Loading Bookmark...</div>
                //TODO flow-error React element Bookmark Expected React Component instead of React%Component
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

    // const mapDispatchToProps = (dispatch: Function, ownProps) => {
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
