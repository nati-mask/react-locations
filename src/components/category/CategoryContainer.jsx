import React from 'react';
import { connect } from 'react-redux';
const { removeCategory, updateCategory } = require('../../actions');
const data_manager = require('../../data-manager');

class CategoryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            category_name: this.props.category && this.props.category.name,
        }
    }
    setCategoryName(e) {
        const value = e.target.value;
        this.setState({ category_name: value});
    }
    toogleEdit() {
        this.setState(prevState => ({edit : !prevState.edit }));
    }
    save() {
        this.props.updateCategory.call(this);
        data_manager.save();
    }
    render() {
        return (
            <div>
                { this.state.edit &&
                    <div>
                    <input type="text" onChange={this.setCategoryName.bind(this)} value={this.state.category_name} />
                    <button onClick={this.save.bind(this)}>Save</button>
                    </div>
                }
                { !this.state.edit &&
                    <div>
                        { this.props.category.name }
                        <button onClick={this.toogleEdit.bind(this)}>Edit</button>
                        <button onClick={this.props.removeCategory.bind(this)}>Remove</button>
                    </div>
                }
            </div>
        )
    }
}

module.exports = connect((state, ownProps) => {

    return {
        category: state.categories[ownProps.id] || {},
    }

}, dispatch => {

    return {
        removeCategory() {
            dispatch(removeCategory(this.props.id));
        },
        updateCategory() {
            dispatch(updateCategory(this.props.id, {
                name: this.state.category_name,
            }));
        },
    }

})(CategoryContainer);
