/* @flow */
import React, { Component, PropTypes as T } from 'react';

export type Props = {
    selected: string,
    options: Array<{
        value: any,
        display: string,
    }>,
    onSelect: Function,
};

class Dropdown extends Component {
    constructor() {
        super();

        this.toggleList = this.toggleList.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.bodyWasClicked = this.bodyWasClicked.bind(this);
        this.preventBubble = this.preventBubble.bind(this);

        this.state = {
            showList: false
        }
    }

    props: Props;

    componentDidMount() {
        document.addEventListener('click', this.bodyWasClicked);
        this.dropdownContainer.addEventListener('click', this.preventBubble)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.bodyWasClicked);
        this.dropdownContainer.removeEventListener('click', this.preventBubble)
    }

    bodyWasClicked() {
        const {showList} = this.state;

        if(this.discardClick) {
            this.discardClick = false;
            return;
        }

        if(showList) {
            this.setState({
                showList: !showList
            })
        }
    }

    preventBubble() {
        this.discardClick = true;
    }

    toggleList() {
        const {showList} = this.state;

        this.setState({
            showList: !showList
        })
    }

    selectItem(selected) {
        const {onSelect} = this.props;

        this.setState({
            showList: false
        })

        onSelect(selected);
    }

    render() {
        const {options, selected} = this.props;
        const {showList} = this.state;
        const optionElements = options.map(o => {
            return <div key={o.value} className="bm-dropdown__list__item"
                onClick={() => this.selectItem(o.value)}>
                {o.display}
            </div>
        })

        const buttonClass = showList ? 'bm-dropdown__button--active' : '';
        const listClass = showList ? 'bm-dropdown__list--active' : '';

        return <div className="bm-dropdown__container" ref={elem => this.dropdownContainer = elem}>
            <div className={`bm-button bm-dropdown__button ${buttonClass}`}
                onClick={this.toggleList}>
                {selected}
            </div>
            <div>
                <div className={`bm-dropdown__list ${listClass}`}>
                    {optionElements}
                </div>
            </div>

        </div>
    }
}

export default Dropdown;