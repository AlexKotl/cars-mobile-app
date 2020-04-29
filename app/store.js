import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cars: [],
        filteredCars: [],
        filters: {}
    },
    mutations: {
        updateCars(state, cars) {
            state.cars = cars;
        },
        updateFilters(state, filters) {
            state.filters = filters;

            if (Object.keys(state.filters).length == 0) {
                state.filteredCars = state.cars.slice(0, 10);
            }
            else {
                const filtered = state.cars.filter(item => {
                    return (state.filters.manufacturer === undefined || state.filters.manufacturer === item.manufacturer);
                });
                state.filteredCars = filtered.slice(0, 20); // return with pagination
            }
        },
        completeFilteredCars(state, data) {
            let additional = {};
            data.forEach(item => {
                additional[item.id] = item;
            });

            const completed = state.filteredCars.map(item => {
                if (additional[item.id]) {
                    item.images = additional[item.id].images;
                    item.mileage = additional[item.id].mileage;
                }

                return item;
            });

            state.filteredCars = completed;
        }
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
    }
});
