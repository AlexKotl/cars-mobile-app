import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cars: []
    },
    mutations: {
        updateCars(state, cars) {
            state.cars = cars;
        },
    },
    actions: {

    },
    getters: {
        getCars(state) {
            return state.cars;
        },
        getManufacturers(state) {
            return ['BMW'];
        }
    }
});
