import React from 'react';
import { connect } from 'react-redux';

const { setPage, deselectLocation } = require('../../actions');

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
    render() {
        return (
            <div style={{float : "right"}}>
                <button onClick={this.addLocation.bind(this)}>Add</button>
                { this.props.selected_location &&
                    <button onClick={this.editLocation.bind(this)}>Edit</button>
                }
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
        navToLocation: () => {
            dispatch(setPage('Location'));
        }
    }

})(ActionsContainer);
