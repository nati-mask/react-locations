import React from 'react';
import { connect } from 'react-redux';
const { setPage } = require('../actions');

const LocationContainer = require('./location/LocationContainer.jsx');
const Header = require('./header/Header.jsx');
const LocationsListContainer = require('./locations-list/LocationsListContainer.jsx');

class RootContainer extends React.Component {
    constructor(props) {
        super(props);
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
        page: state.page
    }

}, dispatch => {

    return {
        navClick : (page, e) => {
            dispatch(setPage(page));
        }
    }

})(RootContainer);
