<template>
    <ScrollView>
        <StackLayout class="cars-list">
            <GridLayout v-for="car in cars" columns="2*, 3*" rows="auto, auto, auto" class="cars-list-item" :key="car.manufacturer+car.model" @tap="goToDetails(car)">
                <Image :src="car.images[0]" stretch="aspectFill" row="0" rowSpan="3" col="0" />
                <Label :text="car.manufacturer + ' ' + car.id" row="0" col="1" class="title" />
                <Label :text="car.mileage + ' km'" row="1" col="1" />
                <Label :text="'N$' + car.price" row="2" col="1" />
            </GridLayout>
        </StackLayout>
    </ScrollView>

</template>

<script >
import CarDetails from './CarDetails';
import API from '../API';

export default {
    conponents: { CarDetails },
    data() {
        return {
            cars: [],
        }
    },
    methods: {
        goToDetails(car) {
            this.$navigateTo(CarDetails, {
                props: {
                    id: car.id,
                    manufacturer: car.manufacturer,
                    model: car.model,
                    price: car.price,
                }
            });
        }
    },
    async created() {
        const res = await API.get('cars');
        this.cars = res.data;
    }
}
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
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
