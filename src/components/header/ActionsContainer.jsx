import React from 'react';
import { connect } from 'react-redux';

const { setPage, deselectLocation, removeLocation } = require('../../actions');

class ActionsContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    addLocation() {
        this.props.deselectLocation();
        this.props.navToEditLocation();
    }
    editLocation() {
        this.props.navToEditLocation();
    }
    viewLocation() {
        this.props.navToViewLocation();
    }
    removeLocation() {
        this.props.navToList();
        this.props.deselectLocation();
        this.props.removeLocation(this.props.selected_location);
    }
    render() {
        return (
            <div style={{float : "right"}}>
                { this.props.page === "LocationsList" && <button onClick={this.addLocation.bind(this)}>Add</button> }
                { this.props.selected_location && <button onClick={this.editLocation.bind(this)}>Edit</button> }
                { this.props.selected_location && <button onClick={this.removeLocation.bind(this)}>Remove</button> }
                { this.props.selected_location && <button onClick={this.viewLocation.bind(this)}>View</button> }
            </div>
        )
    }
}

module.exports = connect(state => {

    return {
        page: state.page,
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
        navToEditLocation: () => {
            dispatch(setPage('LocationEdit'));
        },
        navToViewLocation: () => {
            dispatch(setPage('LocationView'));
        },
        navToList: () => {
            dispatch(setPage('LocationsList'));
        }
    }

})(ActionsContainer);
