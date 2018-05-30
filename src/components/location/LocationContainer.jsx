import React from 'react';
import { connect } from 'react-redux';
const uuid = require('uuid/v4');

const { createLocation, setPage } = require('../../actions');

class LocationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location : props.location,
        }
        console.log('Location component constructed!');
    }
    setLocationProp(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState(prevState => {
            return {
                location: Object.assign({}, prevState.location, { [name]: value })
            }
        });
    }
    render() {
        return (
            <div>
                <div>
                    <input type="text" onInput={this.setLocationProp.bind(this)} name="name" value={this.state.location.name}/>
                </div>
                <div>
                    <input type="text" onInput={this.setLocationProp.bind(this)} name="address" value={this.state.location.address}/>
                </div>
                <div>
                    <input type="text" onInput={this.setLocationProp.bind(this)} name="coordinates" value={this.state.location.coordinates}/>
                </div>
                <div>
                    <input type="text" onInput={this.setLocationProp.bind(this)} name="category" value={this.state.location.category}/>
                </div>
                <button onClick={this.props.createLocation.bind(this)}>Save</button>
            </div>
        )
    }
}

module.exports = connect(state => {

    return {
        new: !state.selected_location,
        location: state.locations[state.selected_location] || {
            name: "",
            address: "",
            coordinates: "",
            category: "",
        }
    }

}, dispatch => {

    return {
        createLocation(e) {
            dispatch(createLocation(Object.assign({}, this.state.location, {
                id: uuid().replace(/-/g, ''),
            })));
            dispatch(setPage('LocationsList'));
        },
    }

})(LocationContainer);
