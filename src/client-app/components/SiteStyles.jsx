/* @flow */
import React, { Component } from 'react';
import * as css from '../styles/site'

const StyleSection = ({ isVisible, toggleClick, children }: { isVisible: boolean, toggleClick?: () => void, children?: any }) => {
    const display = isVisible ? 'initial' : 'none';
    const sectionHeader = isVisible ? 'Collapse' : 'Expand';
    return <div>
        <h3 onClick={toggleClick}>({sectionHeader})</h3>
        <div style={{ display }}>
            {children}
        </div>
    </div>
}

const buildSectionParams = (id, collapsed, callback) => {
    return {
        isVisible: collapsed.indexOf(id) === -1,
        toggleClick: () => callback(id)
    }
}

export type Props = {};

type State = { collapsed: Array<any> };

class StyleContainer extends Component {
    state: State;
    collapseSection: Function;
    constructor() {
        super();

        this.collapseSection = this.collapseSection.bind(this);

        this.state = {
            collapsed: []
        }
    }

    props: Props;

    collapseSection(id: number) {
        const { collapsed } = this.state;
        console.log(id, collapsed)

        let newCollapsed = []
        if (collapsed.indexOf(id) > -1) {
            newCollapsed = collapsed.filter(c => c !== id);
        } else {
            newCollapsed = [...collapsed, id]
        }

        this.setState({
            collapsed: newCollapsed
        })
    }

    render() {
        const { collapsed } = this.state;

        return <div>
            <StyleSection {...buildSectionParams(1, collapsed, this.collapseSection) }
            >
                <ListStyles></ListStyles>
            </StyleSection>
            <StyleSection {...buildSectionParams(2, collapsed, this.collapseSection) }>
                <SiteStyles></SiteStyles>
            </StyleSection>


        </div>

    }
}

const ListStyles = () => {
    return <div>Heres list styles yo</div>
}

const SiteStyles = () => {
    return <div style={{ padding: '10px' }}>
        <h1>Here are styles for the page</h1>
        <div>
            <h2>Headers</h2>
            <h1>This is main header - h1</h1>
            <h2>This is section header - h2</h2>
            <h3>This is subtitle header - h3</h3>
            <h4>This is another subtitle header - h4</h4>
        </div>
        <div>
            <h2>Here are common elements</h2>
            <div>
                <h3>Actionable elements</h3>
                <div className="bm-button">
                    Im a button!
            </div>
                <div style={{ marginTop: '20px' }}>
                    <a href="/">I'm a link yo</a>
                </div>
            </div>
            <div>
                <h3>Form elements</h3>
                <div >
                    <label className="bm-input__label" htmlFor="">Label</label>
                    <input type="text" value="Heres some text here" />
                </div>
                <div>
                    <input type="text" placeholder="Placeholder text" />
                </div>
                <div>
                    <textarea name="" id="" cols="30" rows="10"
                        placeholder="heres some text">
                        There is text here
                </textarea>
                </div>
            </div>
        </div>
    </div>
}

export default StyleContainer