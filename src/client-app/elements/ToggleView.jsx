import React, {Component, PropTypes as T} from 'react'
import * as css from '../../styles/toggle-view'

class ToggleView extends Component {
    static propTypes = {
        openByDefault: T.bool,
        onClose: T.func,
        destroyChildOnClose: T.bool,
        children: T.node.isRequired
    }  

    constructor(props) {
        super(props);

        this.toggleShow = this.toggleShow.bind(this);

        const {openByDefault} = props;
        this.state = {
            isOpen: !!openByDefault
        }
    }

    toggleShow() {
        const {isOpen} = this.state;

        this.setState({
            isOpen: !isOpen
        })
    }

    render() {
        const {children, destroyChildOnClose = false} = this.props;
        const {isOpen} = this.state;

        const childRender = isOpen ? children : '';

        return (<div className="bm-toggle-view">
            <div className="bm-toggle-view__toggle">
                <div className="bm-toggle-view__toggle__btn"></div>
            </div>
            {childRender}
        </div>)
    }
}

export default ToggleView