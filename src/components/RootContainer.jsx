import React from 'react';
import { connect } from 'react-redux';
const { setPage } = require('../actions');

const Location = require('./location/Location.jsx');
const Header = require('./header/Header.jsx');
const LocationsList = require('./locations-list/LocationsList.jsx');

class RootContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    renderPage() {
        switch (this.props.page) {
            case "Location":
                return <Location />
        
            default:
                return <LocationsList />
        }
    }
    render() {
        return (
            <div>
                <Header pageTitle={ this.props.page } />
                { this.renderPage() }
                <button onClick={ this.props.navClick.bind(this, "Zvulkunb") }>Nav</button>
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
            console.log('Args of navClick:', page, e);
            dispatch(setPage(page));
        }
    }

})(RootContainer);
