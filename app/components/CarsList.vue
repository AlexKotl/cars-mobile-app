<template>
    <ScrollView>
        <StackLayout class="cars-list">
            <WrapLayout style="margin-bottom: 20">
                <Button v-for="manufacturer in getManufacturers"
                    :text="manufacturer"
                    @tap="filter({ manufacturer: manufacturer })"
                    class="filter-button"
                    :class="{ selected: getFilters.manufacturer !== undefined && getFilters.manufacturer === manufacturer }"  />
            </WrapLayout>

            <GridLayout v-for="car in getFilteredCars"
                columns="2*, 3*" rows="auto, auto, auto"
                class="cars-list-item"
                :key="car.manufacturer+car.model+car.id"
                @tap="goToDetails(car)">

                <Image :src="car.images ? car.images[0] : ''" stretch="aspectFill" row="0" rowSpan="3" col="0" />
                <Label :text="car.manufacturer + ' ' + car.model" row="0" col="1" class="title" />
                <Label :text="car.mileage ? car.mileage + ' km' : ''" row="1" col="1" />
                <Label :text="'N$' + car.price" row="2" col="1" />
            </GridLayout>
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
        }
    },
    computed: {
        ...mapGetters([ "getManufacturers", "getFilteredCars", "getFilters" ]),
    },
    methods: {
        ...mapMutations([ "updateFilters" ]),
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
            console.log("setting filter: ", params)
            this.updateFilters(params);
        }
    },
    async created() {
        // const res = await API.get('cars');
        // this.cars = res.data;
        // console.log('Manus:' + this.getManufacturers);
    }
}
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .filter-button {
        border-width: 1;
        border-color: #ccc;
        padding: 5 12;
        margin: 5 3;
        border-radius: 17;
        background-color: white;
        color: black;
        font-size: 14;
        font-weight: bold;
    }
    .filter-button.selected {
        background-color: black;
        color: white;
    }

    .cars-list {
        vertical-align: top;
        font-size: 20;
        margin: 10;
    }

    .cars-list-item {
        margin-bottom: 20;
    }

    .cars-list-item .title {
        font-weight: bold;
    }

    .cars-list-item Image {
        border-radius: 5;
        margin-right: 12;
    }


</style>
