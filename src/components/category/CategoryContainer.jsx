import React from 'react';
import { connect } from 'react-redux';
const { removeCategory, updateCategory } = require('../../actions');
const data_manager = require('../../data-manager');

require('./CategoryContainer.less');

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
        this.toogleEdit();
        data_manager.save();
    }
    render() {
        return (
            <div className="category">
                { this.state.edit &&
                    <div>
                    <input className="text-input" type="text" onChange={this.setCategoryName.bind(this)} value={this.state.category_name} />
                    <i className="material-icons item-action" onClick={this.save.bind(this)}>check_circle</i>
                    </div>
                }
                { !this.state.edit &&
                    <div>
                        <span className="categ-name"> { this.props.category.name } </span>
                        <i className="material-icons item-action" onClick={this.toogleEdit.bind(this)}>edit</i>
                        <i className="material-icons item-action" onClick={this.props.removeCategory.bind(this)}>delete</i>
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
