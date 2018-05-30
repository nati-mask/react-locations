import React from 'react';
import { connect } from 'react-redux';
const { setPage } = require('../../actions');

require('./NavContainer.less');

class NavContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="nav">
                <i className="material-icons nav-action" onClick={this.props.navClick.bind(this, "LocationsList")}>location_on</i>
                <i className="material-icons nav-action" onClick={this.props.navClick.bind(this, "CategoriesList")}>category</i>
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
