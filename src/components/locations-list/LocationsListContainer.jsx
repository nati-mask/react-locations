import React from 'react';
import { connect } from 'react-redux';
const _ = require('lodash');

const { selectLocation, deselectLocation, setCategoryFilter } = require('../../actions');

const ActionsContainer = require('./ActionsContainer.jsx');

function makeGroups(locations) {
    let groups = {};
    _.map(locations, location => {
        if(!location.category) return;
        if(typeof groups[location.category] == 'undefined') groups[location.category] = [];
        groups[location.category].push(location);
    })
    return groups;
}

function sortGroups(groups) {
    let sorted_groups = {};
    _.sortBy(Object.keys(groups), _.lowerCase).map(key => {
        sorted_groups[key] = _.sortBy(groups[key], group => _.lowerCase(group.name));
    })
    return sorted_groups;
}

require('./LocationsListContainer.less');

class LocationListContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="page locations-list">
                <ActionsContainer />
                <div className="location-groups">
                    { _.map(this.props.location_groups, (locations, group_name) =>
                        <div className="group" key={group_name}>
                            <h3>{group_name}</h3>
                            <ul className="group-items">
                            { locations.map(location =>
                                <li key={location.id}
                                    onClick={this.props.selectLocation.bind(this, location.id)}
                                    className={this.props.selected_location === location.id ? "item active" : "item"}>
                                    {location.name} {location.category && <span>({location.category})</span>}
                                </li>
                            ) }
                            </ul>
                        </div>
                    ) }
                </div>
            </div>
        )
    }
}

module.exports = connect(state => {

    let location_groups;

    if (state.show_grouped || state.filter_category) {
        location_groups = makeGroups(state.locations);
        if (state.filter_category) location_groups = _.pick(location_groups, state.filter_category);
    } else location_groups = { "All Categories": _.map(state.locations) }

    return {
        selected_location : state.selected_location,
        location_groups : sortGroups(location_groups),
        filter_category: state.filter_category,
    }

}, dispatch => {

    return {
        selectLocation(location_id, e) {
            if (this.props.selected_location === location_id) dispatch(deselectLocation());
            else dispatch(selectLocation(location_id));
        },
    }

})(LocationListContainer);