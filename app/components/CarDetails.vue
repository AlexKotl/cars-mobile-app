<template>
    <Page>
        <ScrollView>
            <StackLayout class="car-details">
                <Label :text="manufacturer + ' ' + model" class="h1"></Label>
                <Label text="Specifications" class="h1" />
                <ActivityIndicator busy="isBusy" />
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
            details: {}
        }
    },
    async created() {
        this.details = await API.get('cars/' + this.id); 
        console.log(this.details);
    }
}
</script>

<style scoped>
    .h1 {
        font-size: 24;
        font-weight: bold;
    }

    .car-details {
        vertical-align: top;
        padding: 10px;
    }
</style>
