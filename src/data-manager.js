const store = require('./store');

module.exports = {
    save() {
        // TODO: Extract to better model, debounce, save to database, etc;
        setTimeout(() => {
            window.localStorage.setItem('myLocationsData', JSON.stringify(store.getState().locations));
        });
    }
}