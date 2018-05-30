import React from 'react';
import { connect } from 'react-redux';
const { setPage, createLocation, stopLoading } = require('../actions');
const _ = require('lodash');

const store = require('../store');

const data_manager = require('../data-manager.js');

const LocationContainer = require('./location/LocationContainer.jsx');
const Header = require('./header/Header.jsx');
const NavContainer = require('./nav/NavContainer.jsx');
const LocationsListContainer = require('./locations-list/LocationsListContainer.jsx');
const CategoriesListContainer = require('./categories-list/CategoriesListContainer.jsx');

require('./RootContainer.less');

class RootContainer extends React.Component {
    constructor(props) {
        super(props);
        data_manager.load();
    }
    getTitle(pageRoute) {
        // This is bad, just for the first impression. Time is over:
        switch (pageRoute) {
            case "LocationEdit":
                return "Location";
            case "LocationView":
                return "Location";
            case "LocationsList":
                return "Locations List";
            case "CategoriesList":
                return "Categories";
            default:
                return "404";
        }
    }
    renderPage() {
        switch (this.props.page) {
            case "LocationEdit":
                return <LocationContainer editing={true}/>

            case "LocationView":
                return <LocationContainer editing={false} />

            case "CategoriesList":
                return <CategoriesListContainer />

            default:
                return <LocationsListContainer />
        }
    }
    render() {

        if(this.props.loading) return (
            <div>
                Loading...
            </div>
        )

        return (
            <div>
                <Header pageTitle={ this.getTitle(this.props.page) } />
                { this.renderPage() }
                <NavContainer />
            </div>
        )
    }
}

module.exports = connect(state => {

    return {
        page: state.page,
        loading: state.loading,
    }

}, dispatch => {

    return {
        navClick : (page, e) => {
            dispatch(setPage(page));
        }
    }

})(RootContainer);
