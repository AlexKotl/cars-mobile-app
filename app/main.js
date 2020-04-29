import Vue from 'nativescript-vue'
import CarsList from './components/CarsList'
import VueDevtools from 'nativescript-vue-devtools'

Vue.config.suppressRenderLogs = true;

Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
    store,
    render: h => h('frame', [h(CarsList)])
}).$start()
