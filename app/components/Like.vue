<template>
    <StackLayout>
        <Image src="~/assets/images/like-o.png" ref="icon" width="32" height="32" @tap="like" />
    </StackLayout>
</template>

<script>
export default {
    props: [ "id" ],
    methods: {
        like() {
            let icon = this.$refs.icon.nativeView
            icon.animate({
                scale: {
                    x: 0.6,
                    y: 0.6
                },
                duration: 50,
                delay: 0
            })
            .then(function() {
                return icon.animate({
                    scale: {
                        x: 1.2,
                        y: 1.2,
                        duration: 50
                    }
                });
            })
            .then(function() {
                return icon.animate({
                    scale: {
                        x: 1,
                        y: 1,
                        duration: 100
                    }
                });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
