<template>
    <Page>
        <ActionBar title="Dillish Cars 3"/>
        <CarsList />
    </Page>

</template>

<script >
import CarsList from './CarsList';

export default {
    components: { CarsList },
    data() {
        return {

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
</style>
