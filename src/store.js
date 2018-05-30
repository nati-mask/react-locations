/**
 * ===========================================
 * main redux store module
 * ===========================================
 * 
 */


const { combineReducers, createStore } = require('redux');

const reducers = require('./reducers');

module.exports = createStore(combineReducers(reducers));
