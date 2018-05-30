import React from 'react';

const ActionsContainer = require('./ActionsContainer.jsx');

module.exports = class Root extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1> { this.props.pageTitle } </h1>
                <ActionsContainer />
            </div>
        )
    }
}
