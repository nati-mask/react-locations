const _ = require('lodash');
const store = require('./store');

const { createLocation, createCategory, stopLoading } = require('./actions');

module.exports = {
    save() {
        // TODO: Debounce, save to database, etc;
        setTimeout(() => {
            window.localStorage.setItem('myLocationsData', JSON.stringify(_.pick(store.getState(), ['locations','categories'])));
        });
    },
    load() {
        return new Promise(resolve => {
            setTimeout(() => {
                let str_data = window.localStorage.getItem("myLocationsData");
                if (!str_data) {
                    store.dispatch(stopLoading());
                    return;
                }
                let data = JSON.parse(str_data);
                _.map(data.locations, location => store.dispatch(createLocation(location)));
                _.map(data.categories, category => store.dispatch(createCategory(category)));
                store.dispatch(stopLoading());
            });
        })
    },
}