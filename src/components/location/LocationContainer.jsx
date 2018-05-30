import React from 'react';
import { connect } from 'react-redux';
const uuid = require('uuid/v4');

const { createLocation, updateLocation, setPage } = require('../../actions');

const store = require('../../store');

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
    renderEdit() {
        return (
            <div>
                <div>
                    Name:
                    <input type="text" onChange={this.setLocationProp.bind(this)} name="name" value={this.state.location.name}/>
                </div>
                <div>
                    Address:
                    <input type="text" onChange={this.setLocationProp.bind(this)} name="address" value={this.state.location.address}/>
                </div>
                <div>
                    Coordinates:
                    <input type="text" onChange={this.setLocationProp.bind(this)} name="coordinates" value={this.state.location.coordinates}/>
                </div>
                <div>
                    Category:
                    <input type="text" onChange={this.setLocationProp.bind(this)} name="category" value={this.state.location.category}/>
                </div>
                <button onClick={this.props.saveLocation.bind(this)}>Save</button>
            </div>
        )
    }
    renderView() {
        return (
            <div>
                <div>{this.props.location.name}</div>
                <div>{this.props.location.address}</div>
                <div>{this.props.location.coordinates}</div>
                <div>{this.props.location.category}</div>
            </div>
        )
    }
    render() {
        if(this.props.editing) return this.renderEdit();
        return this.renderView();
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
        saveLocation(e) {
            if(this.props.new) dispatch(createLocation(Object.assign({}, this.state.location, {
                id: uuid().replace(/-/g, ''),
            })));
            else dispatch(updateLocation(this.state.location.id, this.state.location));
            dispatch(setPage('LocationsList'));

            // TODO: Extract to better model, debounce, save to database, etc;
            setTimeout(() => {
                window.localStorage.setItem('myLocationsData', JSON.stringify(store.getState().locations));
            });
        },
    }

})(LocationContainer);
