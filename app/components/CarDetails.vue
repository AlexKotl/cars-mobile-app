<template>
    <Page>
        <ActionBar :title="manufacturer + ' ' + model"/>
        <ScrollView>
            <StackLayout class="car-details">
                <GridLayout height="300">
                      <Carousel ref="myCarousel" debug="true" height="100%" width="100%" :items="myData" colow="white"
                         indicatorColor="#9b5504" indicatorColorUnselected="#609b5504"
                        ios:autoPagingInterval="3" android:indicatorAnimation="swap">
                        <CarouselItem v-for="(item, i) in myData" :key="i" verticalAlignment="middle" :backgroundColor="item.color">
                            <GridLayout>
                                <Image :src="item.image" stretch="aspectFill"></Image>
                                <Label :text="item.title" horizontalAlignment="center" backgroundColor="#50000000" height="30"></Label>
                            </GridLayout>
                        </CarouselItem>
                      </Carousel>
                  </GridLayout>

                <Image :src="details.images[0]" stretch="aspectFill" />

                <Label :text="manufacturer + ' ' + model + ' Specifications'" class="h1"></Label>

                <ActivityIndicator :busy="isBusy" />

                <StackLayout class="card">
                    <GridLayout v-for="spec_name in ['price', 'body', 'year', 'mileage',]" columns="3*, 4*" rows="auto" class="car-details-specs">
                        <Label :text="spec_name" row="0" col="0" class="spec-name" />
                        <TextView :text="details[spec_name]" row="0" col="1" class="spec-value" editable="false" />
                    </GridLayout>

                    <GridLayout v-for="spec in details.specs" columns="3*, 4*" rows="auto" class="car-details-specs">
                        <Label :text="spec.name" row="0" col="0" class="spec-name" />
                        <TextView :text="spec.value" row="0" col="1" class="spec-value" editable="false" />
                    </GridLayout>
                </StackLayout>

                <Label text="More used cars for sale" class="h1" />
                <SimilarCars :id="id" />

            </StackLayout>
        </ScrollView>

    </Page>
</template>

<script>
import API from '../API';
import SimilarCars from './SimilarCars';
import { Carousel, CarouselItem } from 'nativescript-carousel';

export default {
    //self: this,
    props: ["id", "manufacturer", "model", "price"],
    components: { SimilarCars, Carousel, CarouselItem },
    data() {
        return {
            isBusy: true,
            details: {
                specs: [],
                images: []
            },
            myData: [{ title: 'Slide 1', color: '#b3cde0', image: 'https://dillishcars.com/img.php?file=23892/23892_1.jpg' },
                  { title: 'Slide 2', color: '#6497b1', image: 'https://dillishcars.com/img.php?file=23892/23892_1.jpg' },
                  { title: 'Slide 3', color: '#005b96', image: 'https://dillishcars.com/img.php?file=23892/23892_1.jpg' },
                  { title: 'Slide 4', color: '#03396c', image: 'https://dillishcars.com/img.php?file=23892/23892_1.jpg' }],
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
        const res = await API.get('cars/' + this.id);
        this.details = res.data;
        this.isBusy = false;
    },
    watch: {
        async myData(to) {
            await this.$nextTick()
            this.$refs.myCarousel.nativeView.refresh();
        },
    }
}
</script>

<style scoped>
    .h1 {
        font-size: 24;
        font-weight: bold;
        margin: 10 0;
        color:white;
    }

    .car-details {
        vertical-align: top;
        padding: 10px;
    }

    .car-details-specs {
        margin-bottom: 4;
    }

    .spec-name {
        text-align: right;
        text-transform: uppercase;
        margin-right: 20;
        margin-top: 7;
        font-weight: normal;
        vertical-align: top;
    }

    .spec-value {
        font-weight: bold;
        vertical-align: top;
        font-size: 14;
        background-color: transparent;
    }

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
