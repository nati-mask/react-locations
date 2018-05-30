import React from 'react';
import { connect } from 'react-redux';
const uuid = require('uuid/v4');

const { createLocation, updateLocation, setPage } = require('../../actions');

const data_manager = require('../../data-manager');

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
    setLocationCatogory(e) {

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
                    <select name="category" onChange={this.setLocationProp.bind(this)} value={this.state.location.category || "no-category"}>
                        <option value="no-category">Select Category</option>
                        {_.map(this.props.categories, category =>
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        )}
                    </select>
                </div>
                <button onClick={this.props.saveLocation.bind(this)}>Save</button>
            </div>
        )
    }
    renderView() {
        return (
            <div>
                <div>Name:{this.props.location.name}</div>
                <div>Address:{this.props.location.address}</div>
                <div>Coordinates:{this.props.location.coordinates}</div>
                <div>Category:{this.props.location.category}</div>
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
        },
        categories: state.categories
    }

}, dispatch => {

    return {
        saveLocation(e) {
            if(this.props.new) dispatch(createLocation(Object.assign({}, this.state.location, {
                id: uuid().replace(/-/g, ''),
            })));
            else dispatch(updateLocation(this.state.location.id, this.state.location));
            dispatch(setPage('LocationsList'));

            data_manager.save();
        },
    }

})(LocationContainer);
