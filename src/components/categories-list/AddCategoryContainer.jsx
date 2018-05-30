import React from 'react';
import { connect } from 'react-redux';
const { createCategory } = require('../../actions');
const uuid = require('uuid/v4');
const data_manager = require('../../data-manager');

require('./AddCategoryContainer.less');

class CategoriesActionsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_category_name : "",
        }
    }
    setNewCategoryName(e) {
        const value = e.target.value;
        this.setState({ new_category_name : value });
    }
    render() {
        return (
            <div className="add-category">
                <input className="text-input" type="text" value={this.state.new_category_name} onInput={this.setNewCategoryName.bind(this)} />
                <i className="material-icons item-action" onClick={this.props.createCategory.bind(this)}>check_circle</i>
            </div>
        )
    }
}

module.exports = connect(state => {

    return {
    }

}, dispatch => {

    return {
        createCategory() {
            dispatch(createCategory({
                id: uuid().replace(/-/g, ""),
                name: this.state.new_category_name,
            }));
            this.setState({ new_category_name : "" });
            data_manager.save();
        }
    }

})(CategoriesActionsContainer);
