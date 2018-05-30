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
}
