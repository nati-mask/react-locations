import React from 'react';

require('./Header.less');

module.exports = class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header">
                <h1> { this.props.pageTitle } </h1>
            </div>
        )
    }
}
