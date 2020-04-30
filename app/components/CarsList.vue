<template>
    <Page>
        <ActionBar :title="pageTitle"/>
        <ScrollView>
            <StackLayout class="cars-list">
                <!-- Loading info -->
                <Label v-if="errorMessage" :text="errorMessage" textWrap="true" class="error-message card with-padding" />
                <Button v-if="errorMessage" text="Retry" @tap="fetchAll()" class="retry-button" />
                <ActivityIndicator :busy="isBusy" />

                <!-- Filters -->
                <CarsFilters v-if="!filters || !filters.manufacturer" filter_type="manufacturer" :filters="getManufacturers" />

                <!-- Stock -->
                <StackLayout class="card cars-list-item"
                    v-for="car in filteredCars"
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
    </Page>
</template>

<script >
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CarDetails from './CarDetails';
import CarsFilters from './CarsFilters';
import API from '../API';

export default {
    props: ["filters"],
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
        ...mapGetters([ "getManufacturers", "getFilters", "getCars", "getCarsTimestamp" ]),
        pageTitle: function() {
            return (this.filters && this.filters.manufacturer ? this.filters.manufacturer : "Dillish Cars");
        },
    },
    methods: {
        ...mapMutations([ "updateFilters", "updateCars" ]),
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

        // init filters prop
        if (!this.filters) {
            this.filters = {};
        }

        // filter cars from saved database
        if (Object.keys(this.filters).length == 0) {
            this.filteredCars = this.getCars.slice(-10);
        }
        else {
            const filtered = this.getCars.filter(item => {
                return (!this.filters.manufacturer || this.filters.manufacturer === item.manufacturer);
            });
            this.filteredCars = filtered.slice(0, 20); // return with pagination TODO
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
