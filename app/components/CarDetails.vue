<template>
    <Page>
        <ActionBar :title="manufacturer + ' ' + model"/>
        <ScrollView>
            <StackLayout class="car-details">
                <Image :src="details.images[0]" stretch="aspectFill" />

                <Label :text="manufacturer + ' ' + model + ' Specifications'" class="h1"></Label>

                <ActivityIndicator :busy="isBusy" />

                <GridLayout v-for="spec_name in ['price', 'body', 'year', 'mileage',]" columns="3*, 4*" rows="auto" class="car-details-specs">
                    <Label :text="spec_name" row="0" col="0" class="spec-name" />
                    <TextView :text="details[spec_name]" row="0" col="1" class="spec-value" editable="false" />
                </GridLayout>

                <GridLayout v-for="spec in details.specs" columns="3*, 4*" rows="auto" class="car-details-specs">
                    <Label :text="spec.name" row="0" col="0" class="spec-name" />
                    <TextView :text="spec.value" row="0" col="1" class="spec-value" editable="false" />
                </GridLayout>
            </StackLayout>
        </ScrollView>

    </Page>
</template>

<script>
import API from '../API';
export default {
    props: ["id", "manufacturer", "model", "price"],
    data() {
        return {
            isBusy: true,
            details: {
                specs: [],
                images: []
            }
        }
    },
    async created() {
        const res = await API.get('cars/' + this.id);
        this.details = res.data;
        this.isBusy = false;
    }
}
</script>

<style scoped>
    .h1 {
        font-size: 24;
        font-weight: bold;
        margin: 10 0;
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
    }
</style>
