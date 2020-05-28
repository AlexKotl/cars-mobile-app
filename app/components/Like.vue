<template>
    <StackLayout>
        <Image v-if="!liked" src="~/assets/images/like-o.png" ref="icon" width="26" height="26" @tap="like(true)" />
        <Image v-else src="~/assets/images/like.png" ref="icon" width="26" height="26" @tap="like(false)" />
    </StackLayout>
</template>

<script>
export default {
    props: {
        id: {},
        liked: {
            default: false
        }
    },
    data: function() {
        return {

        }
    },
    methods: {
        like(is_like) {

            this.liked = !this.liked;

            let icon = this.$refs.icon.nativeView;
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
