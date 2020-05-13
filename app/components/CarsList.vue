<template>
    <Page>
        <ActionBar :title="pageTitle"/>
        <ScrollView>
            <StackLayout class="cars-list">
                <!-- Loading info -->
                <Label v-if="errorMessage" :text="errorMessage" textWrap="true" class="error-message" />

                <Button v-if="errorMessage" text="Retry" @tap="fetchAll()" class="retry-button" />
                <ActivityIndicator :busy="isBusy" v-if="isBusy" />

                <!-- Filters -->
                <StackLayout v-if="!filters.manufacturer && !filters.body">
                    <Label class="h1">Brands</Label>
                    <CarsFilters filter_type="manufacturer" :filters="getManufacturers" />

                    <Label class="h1">Body Shapes</Label>
                    <CarsFilters filter_type="body" :filters="getBodies" />

                    <Label class="h1">Latest Cars</Label>
                </StackLayout>

                <!-- Stock -->
                <StackLayout class="card cars-list-item"
                    v-for="car in filteredCars"
                    :key="car.manufacturer+car.model+car.id">
                    <GridLayout columns="2*, 3*" rows="auto, auto, auto" @tap="goToDetails(car)">
                        <Image :src="car.images ? car.images[0] : ''" stretch="aspectFill" row="0" rowSpan="3" col="0" />
                        <Label :text="car.manufacturer + ' ' + car.model" row="0" col="1" class="title" />
                        <Label :text="car.mileage ? formatNumber(car.mileage) + ' km' : ''" row="1" col="1" />
                        <Label :text="'N$ ' + formatNumber(car.price)" row="2" col="1" />
                    </GridLayout>
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script >
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CarDetails from './CarDetails';
import CarsFilters from './CarsFilters';
import API from '../API';
const Intl = require('intl');

export default {
    props: {
        filters: {
            default: {}
        }
    },
    components: { CarDetails, CarsFilters },
    data() {
        return {
            errorMessage: false,
            isBusy: false,
            filteredCars: [],
            carsData: {} // additional cars data that pulled from API
        }
    },
    computed: {
        ...mapGetters([ "getManufacturers", "getBodies", "getFilters", "getCars", "getCarsTimestamp" ]),
        pageTitle: function() {
            let title = "Dillish Cars";
            if (this.filters && this.filters.manufacturer) {
                title = this.filters.manufacturer;
            }
            else if (this.filters && this.filters.body) {
                title = this.filters.body;
            }
            return title;
        },
    },
    methods: {
        ...mapMutations([ "updateFilters", "updateCars" ]),
        formatNumber(number) {
            if (number > 0) {
                return new Intl.NumberFormat().format(number);
            }
            else {
                return number;
            }
        },
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
        async fetchAll() {
            this.isBusy = true;
            this.errorMessage = false;

            try {
                const res = await API.get('cars/all');
                this.updateCars(res.data);
            } catch(e) {
                this.errorMessage = "Can't get data from server. Please try later...";
            } finally {
                this.isBusy = false;
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
    async created() {
        // fetch whole cars database
        if (!this.getCarsTimestamp) {
            await this.fetchAll();
        }

        // filter cars from saved database
        if (Object.keys(this.filters).length == 0) {
            this.filteredCars = this.getCars.slice(-10).reverse();
        }
        else {
            const filtered = this.getCars.filter(item => {
                let is_match = true;
                if (this.filters.manufacturer && this.filters.manufacturer !== item.manufacturer) {
                    is_match = false;
                }
                if (this.filters.body && this.filters.body !== item.body) {
                    is_match = false;
                }
                return is_match;
            });
            this.filteredCars = filtered; // return with pagination TODO
        }

        // fetch additional car data from API
        const ids = this.filteredCars.map(item => item.id).join(',');
        const data = await API.get('cars/ids?ids=' + ids);

        let additional = {};
        data.data.forEach(item => {
            additional[item.id] = item;
        });

        this.filteredCars = this.filteredCars.map(item => {
            if (additional[item.id]) {
                item.images = additional[item.id].images;
                item.mileage = additional[item.id].mileage;
            }
            return item;
        });

    }
}
</script>

<style scoped>
    .error-message {
        background-color: red;
        color: white;
        text-align: center;
    }
    .retry-button {
        background-color: white;
        color: black;
        margin-top: 20;
    }

    .cars-list {
        vertical-align: top;
        font-size: 20;
        margin: 10;
    }

    .cars-list-item {
        background-color: #fff;
        border-radius: 8;
        font-size: 17;
        margin-top: 14;
    }

    .cars-list-item .title {
        font-weight: bold;
    }

    .cars-list-item Image {
        border-radius: 8;
        margin-right: 12;
    }


</style>
