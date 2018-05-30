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

    createCategory(category) {
        if (!category.id) throw new Error('cannot dispatch createCategory with no category id');
        // Validate more
        return { type: "CREATE_CATEGORY", category };
    },

    updateCategory(category_id, category) {
        // Validate
        return { type: "UPDATE_CATEGORY", category_id, category }
    },

    removeCategory(category_id) {
        // Validate
        return { type: "REMOVE_CATEGORY", category_id };
    },

    stopLoading() {
        return { type: "STOP_LOADING" };
    },

    setCategoryFilter(category) {
        return { type: "SET_CATEGORY_FILTER", category };
    },

    toogleShowGrouped() {
        return { type: "TOOGLE_SHOW_GROUPED" };
    }

}