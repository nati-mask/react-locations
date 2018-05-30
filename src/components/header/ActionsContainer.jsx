import React from 'react';
import { connect } from 'react-redux';

const { setPage } = require('../../actions');

class ActionsContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{float : "right"}}>
                <button onClick={this.props.navToLocation.bind(this)}>Add</button>
            </div>
        )
    }
}

module.exports = connect(null, dispatch => {

    return {
        navToLocation: () => {
            dispatch(setPage('Location'));
        }
    }

})(ActionsContainer);
