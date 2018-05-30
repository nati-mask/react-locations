const { combineReducers } = require('redux');

module.exports = {
    page(state = "Location", action) {
        if(action.type === "SET_PAGE") return action.page;
        return state;
    }
}
