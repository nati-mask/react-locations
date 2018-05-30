import React from 'react';
import { connect } from 'react-redux';
const _ = require('lodash');

const { selectLocation, deselectLocation } = require('../../actions');

class LocationListContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul>
            {
                this.props.locations.map(location =>
                    <li key={location.id}
                        onClick={this.props.selectLocation.bind(this, location.id)}
                        className={this.props.selected_location === location.id ? "active" : null}>
                        {location.name}
                    </li>
                )
            }
            </ul>
        )
    }
}

module.exports = connect(state => {

    return {
        selected_location : state.selected_location,
        locations : _.map(state.locations)
    }

}, dispatch => {

    return {
        selectLocation(location_id, e) {
            if (this.props.selected_location === location_id) dispatch(deselectLocation());
            else dispatch(selectLocation(location_id));
        }
    }

})(LocationListContainer);