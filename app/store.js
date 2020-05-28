import Vue from 'vue';
import Vuex from 'vuex';
const appSettings = require("tns-core-modules/application-settings");

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cars: [],
        carsTimestamp: false,
        filteredCars: [],
        filters: {},
        likes: [],
    },
    mutations: {
        updateCars(state, cars) {
            state.cars = cars;
            state.carsTimestamp = new Date();
        },
        updateLikes(state, likes) {
            state.likes = likes;
        },
        updateLike(state, car_id) {
            const index = state.likes.indexOf(car_id);
            if (index === -1) {
                state.likes.push(car_id);
            }
            else {
                state.likes.splice(index, 1);
            }
            // save to local database
            appSettings.setString('likes', JSON.stringify(state.likes));
        }
    },
    actions: {
        // load likes from local database when loading app
        initLikes({ commit, getters, dispatch, state }) {
            try {
                const likes = JSON.parse(appSettings.getString('likes'));
                commit('updateLikes', likes);
            }
            catch(e) {}
        },
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
        getModels: (state) => (manufacturer) => {
            if (!manufacturer) {
                return [];
            }
            let filtered = state.cars.filter(item => item.manufacturer === manufacturer);
            filtered = filtered.map(el => el.model);
            filtered = filtered.filter((item, index) => filtered.indexOf(item) === index && item != '');
            return filtered.sort();
        },
        getCarsTimestamp(state) {
            return state.carsTimestamp;
        },
        getLikes(state) {
            return state.likes;
        },
    }
});
