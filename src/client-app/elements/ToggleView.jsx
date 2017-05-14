/* @flow */
import React, { Component } from 'react';

const defaultButtonFunc = (isOpen, onClick) => {
    return <div onClick={onClick} style={{ cursor: 'pointer' }}>
        Click to {isOpen ? 'Close' : 'Open'}
    </div>
}

export type Props = {
    openByDefault?: boolean,
    destroyChildOnClose?: boolean,
    onClose?: Function,//in case we need to notify parent when closing
    children: number | string | React.Element<any> | Array<any>,
    toggleButtonFunc?: Function,
};

type State = { isOpen: any };

class ToggleView extends Component {
    state: State;
    toggleShow: Function;
    static defaultProps = {
        toggleButtonFunc: defaultButtonFunc
    }

    constructor(props: Props) {
        super(props);

        this.toggleShow = this.toggleShow.bind(this);

        const { openByDefault } = props;
        this.state = {
            isOpen: !!openByDefault
        }
    }

    toggleShow() {
        const { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        })
    }

    render() {
        const { children, toggleButtonFunc, destroyChildOnClose } = this.props;
        const { isOpen } = this.state;

        const button = toggleButtonFunc(isOpen, this.toggleShow)



        return (<div style={{ position: 'relative' }}>
            {button}
            {destroyChildOnClose && !isOpen
                ? false
                : <div style={{ display: (isOpen ? 'block' : 'none') }}>
                    {children}
                </div>}
        </div>)
    }
}

export default ToggleView