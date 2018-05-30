import React from 'react';
import { connect } from 'react-redux';
const { setPage, createLocation, stopLoading } = require('../actions');
const _ = require('lodash');

const store = require('../store');

const LocationContainer = require('./location/LocationContainer.jsx');
const Header = require('./header/Header.jsx');
const LocationsListContainer = require('./locations-list/LocationsListContainer.jsx');

class RootContainer extends React.Component {
    constructor(props) {
        super(props);
        this.loadData();
    }
    // TODO: extract
    loadData() {
        return new Promise(resolve => {
            setTimeout(() => {
                let loaded_locations, str_locations = window.localStorage.getItem("myLocationsData");
                if (!str_locations) return;
                loaded_locations = JSON.parse(str_locations);
                _.map(loaded_locations, location => {
                    store.dispatch(createLocation(location));
                })
                store.dispatch(stopLoading());
            });
        })
    }
    renderPage() {
        switch (this.props.page) {
            case "LocationEdit":
                return <LocationContainer editing={true}/>

            case "LocationView":
                return <LocationContainer editing={false} />

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
                <Header pageTitle={ this.props.page } />
                { this.renderPage() }
                <button onClick={ this.props.navClick.bind(this, "Categories") }>Nav</button>
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
