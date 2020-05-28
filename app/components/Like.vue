<template>
    <WrapLayout>
        <Image v-if="getLikes.indexOf(id) === -1 && colors === 'red'" src="~/assets/images/like-o-red.png" ref="icon" width="26" height="26" @tap="like(true)" />
        <Image v-else-if="getLikes.indexOf(id) === -1" src="~/assets/images/like-o.png" ref="icon" width="26" height="26" @tap="like(true)" />
        <Image v-else src="~/assets/images/like.png" ref="icon" width="26" height="26" @tap="like(false)" />
        <Label :text="count" class="likes-count" />
    </WrapLayout>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex';

export default {
    props: [ "id", "count", "colors" ],
    computed: {
        ...mapGetters([ "getLikes" ]),
    },
    data: function() {
        return {

        }
    },
    methods: {
        ...mapMutations([ "updateLike" ]),
        like(is_like) {

            this.updateLike(this.id);

            if (is_like) {
                this.count = parseInt(this.count) + 1;
            }
            else {
                this.count = parseInt(this.count) - 1;
            }

            // animation
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

<style scoped>
.likes-count {
    font-size: 15;
    font-weight: bold;
    margin-left: 5;
}
</style>
