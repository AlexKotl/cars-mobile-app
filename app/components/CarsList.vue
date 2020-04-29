<template>
    <ScrollView>
        <StackLayout class="cars-list">
            <WrapLayout class="filters-list">
                <Button v-for="manufacturer in getManufacturers"
                    :text="manufacturer"
                    @tap="filter({ manufacturer: manufacturer })"
                    class="filter-button"
                    :class="{ selected: getFilters.manufacturer !== undefined && getFilters.manufacturer === manufacturer }"  />
            </WrapLayout>

            <StackLayout class="card cars-list-item"
                v-for="car in getFilteredCars"
                :key="car.manufacturer+car.model+car.id">
                <GridLayout columns="2*, 3*" rows="auto, auto, auto" @tap="goToDetails(car)">
                    <Image :src="car.images ? car.images[0] : ''" stretch="aspectFill" row="0" rowSpan="3" col="0" />
                    <Label :text="car.manufacturer + ' ' + car.model" row="0" col="1" class="title" />
                    <Label :text="car.mileage ? car.mileage + ' km' : ''" row="1" col="1" />
                    <Label :text="'N$' + car.price" row="2" col="1" />
                </GridLayout>
            </StackLayout>
        </StackLayout>
    </ScrollView>

</template>

<script >
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CarDetails from './CarDetails';
import API from '../API';

export default {
    conponents: { CarDetails },
    data() {
        return {
            carsData: {} // additional cars data that pulled from API
        }
    },
    computed: {
        ...mapGetters([ "getManufacturers", "getFilteredCars", "getFilters" ]),
    },
    methods: {
        ...mapMutations([ "updateFilters", "completeFilteredCars" ]),
        goToDetails(car) {
            this.$navigateTo(CarDetails, {
                props: {
                    id: car.id,
                    manufacturer: car.manufacturer,
                    model: car.model,
                    price: car.price,
                }
            });
        },
        filter(params = {}) {
            this.updateFilters(params);
        },
        async fetchCars() {
            this.carsData = {};
            const ids = this.getFilteredCars.map(item => item.id).join(',');
            const data = await API.get('cars/ids?ids=' + ids);
            this.completeFilteredCars(data.data);
        }
    },
    async created() {
        this.updateFilters({}); // reinit store
        this.$store.watch(
            (state, getters) => this.$store.state.filters,
            (newValue, oldValue) => {
                this.fetchCars();
            },
        );

    }
}
</script>

<style scoped>
    .filters-list {
        margin-bottom: 20;
    }
    .filter-button {
        border-width: 1;
        border-color: #ccc;
        padding: 5 12;
        margin: 5 3;
        border-radius: 17;
        background-color: black;
        color: white;
        font-size: 14;
        font-weight: bold;
    }
    .filter-button.selected {
        background-color: white;
        color: black;

    }

    .cars-list {
        vertical-align: top;
        font-size: 20;
        margin: 10;
    }

    .cars-list-item {
        margin-bottom: 20;
        background-color: #fff;
        border-radius: 15;
        font-size: 17;
    }

    .cars-list-item .title {
        font-weight: bold;
    }

    .cars-list-item Image {
        border-radius: 5;
        margin-right: 12;
    }


</style>
