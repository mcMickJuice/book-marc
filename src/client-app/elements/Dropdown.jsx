import React, { Component, PropTypes as T } from 'react';

class Dropdown extends Component {
    constructor() {
        super();

        this.toggleList = this.toggleList.bind(this);
        this.selectItem = this.selectItem.bind(this);

        this.state = {
            showList: false
        }
    }

    static propTypes = {
        selected: T.string.isRequired,
        options: T.arrayOf(T.shape({
            value: T.any.isRequired,
            display: T.string.isRequired
        })).isRequired,
        onSelect: T.func.isRequired
    }

    toggleList() {
        const {showList} = this.state;

        this.setState({
            showList: !showList
        })
    }

    selectItem(selected) {
        console.log('selected item', selected)
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

        return <div className="bm-dropdown__container">
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