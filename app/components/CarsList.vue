<template>
    <Page>
        <ActionBar :title="pageTitle">
            <NavigationButton v-if="filters.manufacturer || filters.body || filters.model" text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView>
            <StackLayout class="cars-list">
                <!-- Loading info -->
                <Label v-if="errorMessage" :text="errorMessage" textWrap="true" class="error-message" />

                <Button v-if="errorMessage" text="Retry" @tap="fetchAll()" class="retry-button" />
                <ActivityIndicator :busy="isBusy" v-if="isBusy" />

                <!-- Filters -->
                <StackLayout v-if="!filters.manufacturer && !filters.body && !filters.model">
                    <Label class="h1">Brands</Label>
                    <CarsFilters filter_type="manufacturer" :filters="getManufacturers" />

                    <Label class="h1">Body Shapes</Label>
                    <CarsFilters filter_type="body" :filters="getBodies" />

                    <Label class="h1">Latest Cars</Label>
                </StackLayout>

                <CarsFilters v-if="filters.manufacturer && !filters.model"
                    filter_type="model"
                    :filters="getModels(filters.manufacturer)"
                    :manufacturer="filters.manufacturer" />

                <!-- Stock -->
                <StackLayout class="card cars-list-item"
                    v-for="car in displayCars"
                    :key="car.manufacturer+car.model+car.id">
                    <GridLayout columns="2*, 2*, 1*" rows="auto, auto, auto">
                        <Image :src="car.images ? car.images[0] : ''" @tap="goToDetails(car)" stretch="aspectFill" row="0" rowSpan="3" col="0" />
                        <Label :text="car.manufacturer + ' ' + car.model" row="0" col="1" class="title" />
                        <Label :text="car.mileage ? formatNumber(car.mileage) + ' km' : ''" row="1" col="1" />
                        <Label :text="'N$ ' + formatNumber(car.price)" row="2" col="1" />
                        <Like :id="car.id" :count="car.likes" row="2" col="2" />
                    </GridLayout>
                </StackLayout>

                <Button text="Load more" @tap="showMore()" v-if="displayCars < filteredCars && filteredCars > 0" class="load-more-button" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script >
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CarDetails from './CarDetails';
import CarsFilters from './CarsFilters';
import Like from './Like';
import API from '../API';
const Intl = require('intl');

export default {
    props: {
        filters: {
            default: {}
        }
    },
    components: { CarDetails, CarsFilters, Like },
    data() {
        return {
            errorMessage: false,
            isBusy: false,
            filteredCars: [], // all cars that match current search
            displayCars: [], // cars to render on screen
            carsData: {} // additional cars data that pulled from API
        }
    },
    computed: {
        ...mapGetters([ "getManufacturers", "getBodies", "getModels", "getFilters", "getCars", "getCarsTimestamp" ]),
        pageTitle: function() {
            let title = "Dillish Cars";
            if (this.filters && this.filters.model) {
                title = this.filters.manufacturer + ' ' + this.filters.model;
            }
            else if (this.filters && this.filters.manufacturer) {
                title = this.filters.manufacturer;
            }
            else if (this.filters && this.filters.body) {
                title = this.filters.body;
            }
            return title;
        },
    },
    methods: {
        ...mapMutations([ "updateCars" ]),
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
        showMore() {
            const loaded = this.displayCars.length;
            this.displayCars = this.filteredCars.slice(0, loaded + 20);
        },

    },
    async mounted() {
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
                if (this.filters.model && this.filters.model !== item.model) {
                    is_match = false;
                }
                return is_match;
            });
            this.filteredCars = filtered;
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
                item.likes = additional[item.id].likes;
            }
            return item;
        });

        this.displayCars = this.filteredCars.slice(0, 20);

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
        font-size: 15;
        margin-top: 14;
    }

    .cars-list-item .title {
        font-weight: bold;
        font-size: 17;
    }

    .cars-list-item Image {
        border-top-left-radius: 8;
        border-bottom-left-radius: 8;
        margin-right: 12;
    }

    .load-more-button {
        margin: 20 0;
    }


</style>
