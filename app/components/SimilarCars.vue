<template>

        <FlexboxLayout flexWrap="wrap">
            <StackLayout v-for="car in similars" width="50%" class="similar-item" @tap="goToDetails(car)" :key="'similar'+car.id">
                <Image :src="car.images[0]" stretch="aspectFit" />
                <Label :text="car.year + ' ' + car.manufacturer + ' ' + car.model" row="0" col="0"/>
                <Label :text="'NAD ' + car.price" row="0" col="0" class='price' />
            </StackLayout>
        </FlexboxLayout>


</template>

<script>
import API from '../API';
import CarDetails from './CarDetails';

export default {
    props: ["id"],
    conponents: { CarDetails },
    data() {
        return {
            similars: []
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
        const resSimilar = await API.get('cars/' + this.id + '/similars');
        this.similars = resSimilar.data;
    }
}
</script>

<style scoped>
    .similar-item {
        text-align: center;
        font-size: 14;
        padding: 0 7 20 7;
    }
    .similar-item Image {
        border-radius: 4;
    }
    .similar-item .price {
        font-weight: bold;
    }
</style>
