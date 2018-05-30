import React from 'react';
import { connect } from 'react-redux';
const {  } = require('../../actions');

const AddCategoryContainer = require('./AddCategoryContainer.jsx');
const CategoryContainer = require('../category/CategoryContainer.jsx');

require('./CategoriesListContainer.less');

class CategoriesListContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="page categories-list">
                <AddCategoryContainer />
                { this.props.categories.map(category =>
                    <CategoryContainer key={category.name} id={category.id} />
                )}
            </div>
        )
    }
}

module.exports = connect(state => {

    return {
        categories: _.map(state.categories),
    }

}, dispatch => {

    return {

    }

})(CategoriesListContainer);
