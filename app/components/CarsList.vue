<template>
        <ScrollView>
            <StackLayout class="cars-list">
                <GridLayout v-for="car in cars" columns="100, *" rows="auto, auto" class="cars-list-item" :key="car.manufacturer+car.model">
                    <Image :src="car.image" stretch="aspectFill" row="0" rowSpan="2" col="0" />
                    <Label :text="car.manufacturer + ' ' + car.model" row="0" col="1" class="title" />
                    <Label :text="'N$' + car.price" row="1" col="1" />
                </GridLayout>
            </StackLayout>
        </ScrollView>

</template>

<script >
export default {
    data() {
        return {
            cars: [
                {manufacturer: 'BMW', model: 'Model 1', image: 'https://dillishcars.com/upload/cars_na/20268/20268_300_1.jpg', price: 100000},
                {manufacturer: 'Volkswagen', model: 'Model 2', image: 'https://dillishcars.com/upload/cars_na/20269/20269_300_1.jpg', price: 100000}
            ],
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
