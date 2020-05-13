import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cars: [],
        carsTimestamp: false,
        filteredCars: [],
        filters: {}
    },
    mutations: {
        updateCars(state, cars) {
            state.cars = cars;
            state.carsTimestamp = new Date();
        },
        updateFilters(state, filters) {
            state.filters = filters;
        },
    },
    actions: {

    },
    getters: {
        getCars(state) {
            return state.cars;
        },
        getFilters(state) {
            return state.filters;
        },
        getFilteredCars(state) {
            return state.filteredCars;
        },
        getManufacturers(state) {
            let filtered = state.cars.map(el => el.manufacturer);
            filtered = filtered.filter((item, index) => filtered.indexOf(item) === index && item != '');
            return filtered.sort();
        },
        getBodies(state) {
            let filtered = state.cars.map(el => el.body);
            filtered = filtered.filter((item, index) => filtered.indexOf(item) === index && item != '');
            return filtered.sort();
        },
        getCarsTimestamp(state) {
            return state.carsTimestamp;
        }
    }
});
