import React from 'react';
import { connect } from 'react-redux';
const _ = require('lodash');

class LocationListContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul>
            {
                this.props.locations.map(location => <li key={location.id}>{location.name}</li> )
            }
            </ul>
        )
    }
}

module.exports = connect(state => {

    return {
        locations : _.map(state.locations)
    }

})(LocationListContainer);