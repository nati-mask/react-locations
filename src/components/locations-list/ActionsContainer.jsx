import React from 'react';
import { connect } from 'react-redux';

const { setPage, setCategoryFilter, deselectLocation, removeLocation, toogleShowGrouped } = require('../../actions');

const data_manager = require('../../data-manager');

require('./ActionsContainer.less');

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
        data_manager.save();
    }
    render() {
        return (
            <div className="action-container">
                <i className="material-icons add-button" onClick={this.addLocation.bind(this)}> add_circle </i>
                <select className="categ-select" onChange={this.props.setCatogoryFilter} value={this.props.filter_category || "no-filter"}>
                    <option value="no-filter">show all categories</option>
                    {_.map(this.props.categories, category =>
                        <option key={category} value={category}>
                            Show Only: {category}
                        </option>
                    )}
                </select>
                { !this.props.filter_category &&
                    <i className="material-icons grouped-select" onClick={this.props.toogleShowGrouped.bind(this)}>
                        { this.props.show_grouped ? "view_headline" : "view_agenda" }
                    </i>
                }
                { this.props.selected_location &&
                    <div style={{float:"right"}}>
                        <i className="material-icons item-action" onClick={this.editLocation.bind(this)}>edit</i>
                        <i className="material-icons item-action" onClick={this.removeLocation.bind(this)}>delete</i>
                        <i className="material-icons item-action" onClick={this.viewLocation.bind(this)}>remove_red_eye</i>
                    </div>
                }
            </div>
        )
    }
}

module.exports = connect(state => {

    return {
        page: state.page,
        selected_location: state.selected_location,
        filter_category: state.filter_category,
        show_grouped: state.show_grouped,
        categories: _.uniq(_.map(state.locations, location => location.category)),
    }

}, dispatch => {

    return {
        setCatogoryFilter(e) {
            if (e.target.value === 'no-filter') dispatch(setCategoryFilter(null));
            else dispatch(setCategoryFilter(e.target.value));
        },
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
        toogleShowGrouped: () => {
            dispatch(toogleShowGrouped());
        },
        navToList: () => {
            dispatch(setPage('LocationsList'));
        }
    }

})(ActionsContainer);
