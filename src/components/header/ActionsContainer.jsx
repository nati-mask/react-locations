import React from 'react';
import { connect } from 'react-redux';

const { setPage, deselectLocation, removeLocation } = require('../../actions');

class ActionsContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    addLocation() {
        this.props.deselectLocation();
        this.props.navToLocation();
    }
    editLocation() {
        this.props.navToLocation();
    }
    removeLocation() {
        this.props.navToList();
        this.props.removeLocation(this.props.selected_location);
    }
    render() {
        return (
            <div style={{float : "right"}}>
                <button onClick={this.addLocation.bind(this)}>Add</button>
                { this.props.selected_location && <button onClick={this.editLocation.bind(this)}>Edit</button> }
                { this.props.selected_location && <button onClick={this.removeLocation.bind(this)}>Remove</button> }
            </div>
        )
    }
}

module.exports = connect(state => {

    return {
        selected_location: state.selected_location,
    }

}, dispatch => {

    return {
        deselectLocation: () => {
            dispatch(deselectLocation());
        },
        removeLocation: location_id => {
            dispatch(removeLocation(location_id));
        },
        navToLocation: () => {
            dispatch(setPage('Location'));
        },
        navToList: () => {
            dispatch(setPage('LocationsList'));
        }
    }

})(ActionsContainer);
