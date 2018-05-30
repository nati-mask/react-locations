const SET_PAGE = 1;

module.exports = {

    setPage(page) {
        if(!page) throw new Error('cannot dispatch setPage without page');
        return { type : "SET_PAGE", page }
    },

    createLocation(location) {
        // Validate
        return { type : "CREATE_LOCATION", location };
    },

    updateLocation(location_id, location) {
        // Validate
        return { type: "UPDATE_LOCATION", location_id, location}
    },

    selectLocation(location_id) {
        // Validate
        return { type: "SELECT_LOCATION", location_id };
    },

    deselectLocation(location_id) {
        return { type: "DESELECT_LOCATION" };
    }

}