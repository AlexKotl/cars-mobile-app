<template>
    <WrapLayout>
        <Button v-for="filter in filters"
            :text="filter"
            @tap="goTo({ manufacturer: filter })"
            class="filter-button"
            :key="'filter_'+filter" />
    </WrapLayout>
</template>

<script >
import CarsList from './CarsList';

export default {
    components: { CarsList },
    props: [ "filters", "filter_type" ],
    data() {
        return {
        }
    },
    methods: {
        goTo(filters) {
            this.$navigateTo(CarsList, {
                props: {
                    filters: filters
                }
            });
        },
    }

}
</script>

<style scoped>
    .filter-button {
        border-width: 1;
        border-color: #ccc;
        padding: 5 12;
        margin: 5 3;
        border-radius: 17;
        background-color: black;
        color: white;
        font-size: 14;
        font-weight: bold;
    }
</style>
