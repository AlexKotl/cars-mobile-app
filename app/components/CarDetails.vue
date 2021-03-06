<template>
    <Page>
        <ActionBar :title="manufacturer + ' ' + model">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView>
            <StackLayout class="car-details">
                <GridLayout>
                    <Carousel ref="myCarousel" debug="false" :height="galleryHight+'px'" width="100%"
                        :items="details.images"
                        indicatorColor="#9b5504"
                        indicatorColorUnselected="#609b5504"
                        android:indicatorAnimation="swap">
                        <CarouselItem v-for="(image, i) in details.images" :key="'car_img_'+i" verticalAlignment="middle">
                            <GridLayout>
                                <Image :src="image" stretch="aspectFill"></Image>
                            </GridLayout>
                        </CarouselItem>
                    </Carousel>
                </GridLayout>

                <Like :id="id" :count="details.likes" colors="red" class="like-button" />

                <Label :text="manufacturer + ' ' + model + ''" class="h1"></Label>

                <ActivityIndicator :busy="isBusy" v-if="isBusy" />


                <StackLayout class="">
                    <GridLayout v-for="spec_name in ['price', 'body', 'year', 'mileage',]"
                        :key="'spec_row'+spec_name"
                        columns="3*, 4*" rows="auto"
                        class="car-details-specs">
                        <Label :text="spec_name" row="0" col="0" class="spec-name" />
                        <TextView :text="details[spec_name]" row="0" col="1" class="spec-value" editable="false" />
                    </GridLayout>

                    <GridLayout v-for="spec in details.specs"
                        :key="'spec_row2'+spec.name"
                        columns="3*, 4*" rows="auto" class="car-details-specs">

                        <Label :text="spec.name" row="0" col="0" class="spec-name" />
                        <TextView :text="spec.value" row="0" col="1" class="spec-value" editable="false" />
                    </GridLayout>
                </StackLayout>

                <Label text="Contact the Seller" class="h1" style="margin-top: 20"/>
                <ContactForm :id="id" />

                <Label text="More used cars for sale" class="h1" style="margin-top: 20"/>
                <SimilarCars :id="id" />

            </StackLayout>
        </ScrollView>

    </Page>
</template>

<script>
import API from '../API';
import SimilarCars from './SimilarCars';
import ContactForm from './ContactForm';
import Like from './Like';
const platformModule = require("tns-core-modules/platform");
const Intl = require('intl');

export default {
    props: ["id", "manufacturer", "model", "price"],
    components: { SimilarCars, ContactForm, Like },
    data() {
        return {
            isBusy: true,
            details: {
                specs: [],
                images: []
            }
        }
    },
    computed: {
        galleryHight() {
            return Math.round(platformModule.screen.mainScreen.widthPixels * 0.7);
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
        this.details.price = 'N$ ' + new Intl.NumberFormat().format(this.details.price);
        this.details.mileage = new Intl.NumberFormat().format(this.details.mileage) + ' km';
        this.isBusy = false;
    },
    watch: {
        // watch for gallery images data load
        async 'details.images'(to) {
            await this.$nextTick();
            this.$refs.myCarousel.nativeView.refresh();
        },
    }
}
</script>

<style scoped>
    .car-details {
        vertical-align: top;
        padding: 10px;
    }

    .car-details-specs {
        margin-bottom: 4;
    }

    .like-button {
        margin: 10 0;
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
        box-sizing: border-box;
    }
    .similar-item Image {
        border-radius: 4;
    }
    .similar-item .price {
        font-weight: bold;
    }
</style>
