const { combineReducers } = require('redux');
const _ = require('lodash');

module.exports = {

    page(state = "LocationsList", action) {
        if (action.type === "SET_PAGE") return action.page;
        return state;
    },

    loading(state = true, action) {
        if (action.type === "STOP_LOADING") return false;
        return state;
    },

    categories(state = {}, action) {
        switch (action.type) {
            case "CREATE_CATEGORY":
                return Object.assign({}, state, { [action.category.id]: action.category })

            case "UPDATE_CATEGORY":
                return _.keyBy(_.map(state, category => {
                    if (category.id === action.category_id) return _.extend({}, action.category, { id: action.category_id });
                    return category;
                }), 'id');

            case "REMOVE_CATEGORY":
                return _.keyBy(_.filter(state, category => category.id !== action.category_id), 'id');

            default:
                return state;
        }
    },

    locations(state = {}, action) {
        switch (action.type) {
            case "CREATE_LOCATION":
                return Object.assign({}, state, {[action.location.id] : action.location})

            case "UPDATE_LOCATION":
                return _.keyBy(_.map(state, location => {
                    if (location.id === action.location_id) return _.extend({}, action.location, {id: action.location_id});
                    return location;
                }), 'id');

            case "REMOVE_LOCATION":
                return _.keyBy(_.filter(state, location => location.id !== action.location_id), 'id');

            default:
                return state;
        }
    },

    selected_location(state = null, action) {
        switch (action.type) {
            case "SELECT_LOCATION":
                return action.location_id;

            case "DESELECT_LOCATION":
                return null;

            default:
                return state;
        }
    },

    show_grouped(state = false, action) {
        if (action.type === "TOOGLE_SHOW_GROUPED") return !state;
        return state;
    },

    filter_category(state = null, action) {
        if(action.type === "SET_CATEGORY_FILTER") return action.category;
        return state;
    }
}
