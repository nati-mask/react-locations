import React from 'react';

module.exports = class Root extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1> { this.props.pageTitle } </h1>
            </div>
        )
    }
}
