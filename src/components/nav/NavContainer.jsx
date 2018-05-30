import React from 'react';
import { connect } from 'react-redux';
const { setPage } = require('../../actions');

class NavContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <button onClick={this.props.navClick.bind(this, "LocationsList")}>Locations</button>
                <button onClick={this.props.navClick.bind(this, "CategoriesList")}>Categories</button>
            </div>
        )
    }
}

module.exports = connect(state => {

    return {
        page: state.page,
    }

}, dispatch => {

    return {
        navClick: (page, e) => {
            dispatch(setPage(page));
        }
    }

})(NavContainer);
