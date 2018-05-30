const SET_PAGE = 1;

module.exports = {

    setPage(page) {
        if(!page) throw new Error('cannot dispatch setPage without page');
        return { type : "SET_PAGE", page }
    },

    createLocation(location) {
        if(!location.id) throw new Error('cannot dispatch createLocation with no location id');
        // Validate more
        return { type : "CREATE_LOCATION", location };
    },

    updateLocation(location_id, location) {
        // Validate
        return { type: "UPDATE_LOCATION", location_id, location}
    },

    removeLocation(location_id) {
        // Validate
        return { type: "REMOVE_LOCATION", location_id};
    },

    selectLocation(location_id) {
        // Validate
        return { type: "SELECT_LOCATION", location_id };
    },

    deselectLocation(location_id) {
        return { type: "DESELECT_LOCATION" };
    },

    stopLoading() {
        return { type: "STOP_LOADING" };
    },

    toogleShowGrouped() {
        return { type: "TOOGLE_SHOW_GROUPED" };
    }

}