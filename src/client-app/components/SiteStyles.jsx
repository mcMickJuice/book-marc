import React from 'react'
import * as css from '../styles/site'

const SiteStyles = () => {
    return <div>
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
            <h3>Button</h3>
            <div className="bm-button">
                Im a button!
            </div>
        </div>
        </div>
    </div>
}

export default SiteStyles