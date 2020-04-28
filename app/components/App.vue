<template>
    <Page>
        <ActionBar title="Dillish Cars"/>
        <CarsList />
    </Page>

</template>

<script >
import CarsList from './CarsList';
import API from '../API';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    components: { CarsList },
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations([ "updateCars" ])
    },
    async created() {
        const res = await API.get('cars/all');
        this.updateCars(res.data);
    }
}
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }
</style>
