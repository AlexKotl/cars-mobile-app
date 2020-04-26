<template>
    <ScrollView>
        <StackLayout class="cars-list">
            <GridLayout v-for="car in cars" columns="100, *" rows="auto, auto" class="cars-list-item" :key="car.manufacturer+car.model" @tap="goToDetails(car)">
                <Image :src="car.image" stretch="aspectFill" row="0" rowSpan="2" col="0" />
                <Label :text="car.manufacturer + ' ' + car.model" row="0" col="1" class="title" />
                <Label :text="'N$' + car.price" row="1" col="1" />
            </GridLayout>
        </StackLayout>
    </ScrollView>

</template>

<script >
import CarDetails from './CarDetails';
export default {
    conponents: { CarDetails },
    data() {
        return {
            cars: [
                {id: 4232, manufacturer: 'BMW', model: 'Model 1', image: 'https://dillishcars.com/upload/cars_na/20268/20268_300_1.jpg', price: 100000},
                {id: 4233, manufacturer: 'Volkswagen', model: 'Model 2', image: 'https://dillishcars.com/upload/cars_na/20269/20269_300_1.jpg', price: 100000}
            ],
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
    created() {

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
        margin-bottom: 10;
    }

    .cars-list-item .title {
        font-weight: bold;
    }

    .cars-list-item Image {
        border-radius: 5;
        margin-right: 7;
    }


</style>
