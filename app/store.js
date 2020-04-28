import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cars: [],
        filteredCars: [],
        filters: {},
    },
    mutations: {
        updateCars(state, cars) {
            state.cars = cars;
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
            if (Object.keys(state.filters).length == 0) {
                return state.cars.slice(0, 10);
            }
            const filtered = state.cars.filter(item => {
                return (state.filters.manufacturer === undefined || state.filters.manufacturer === item.manufacturer);
            });
            return filtered.slice(0, 20); // return with pagination
        },
        getManufacturers(state) {
            let filtered = state.cars.map(el => el.manufacturer);
            filtered = filtered.filter((item, index) => filtered.indexOf(item) === index && item != '');
            return filtered.sort();
        },
    }
});
