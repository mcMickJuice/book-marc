import React, {Component, PropTypes as T} from 'react'

const defaultButtonFunc = (isOpen, onClick) => {
    return <div onClick={onClick} style={{cursor: 'pointer'}}>
        Click to {isOpen ? 'Close' : 'Open'}
    </div>
}

class ToggleView extends Component {
    static propTypes = {
        openByDefault: T.bool,
        destroyOnClose: T.bool,
        onClose: T.func, //in case we need to notify parent when closing
        children: T.node.isRequired,
        toggleButtonFunc: T.func
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
        console.log('is open', isOpen)
        this.setState({
            isOpen: !isOpen
        })
    }

    render() {
        const {children, toggleButtonFunc = defaultButtonFunc} = this.props;
        const {isOpen} = this.state;

        const button = toggleButtonFunc(isOpen, this.toggleShow)

        return (<div style={{position: 'relative'}}>
            {button}
            <div style={{display: (isOpen ? 'block': 'none') }}>
                {children}
            </div>
        </div>)
    }
}

export default ToggleView