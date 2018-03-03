
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'; 
import { routes } from './routes';
import store from './store';
import VueLocalStorage from 'vue-localstorage';

import Search from './components/Search.vue';
import Results from './components/Results.vue';
import Details from './components/Details.vue';
import Favorites from './components/Favourites.vue';

Vue.use(VueRouter);
Vue.use(VueLocalStorage);


Vue.component('Search', Search);
Vue.component('Results', Results);
Vue.component('Details', Details);
Vue.component('Favorites', Favorites);


export const router = new VueRouter({
    mode: 'history',
    routes 
});

new Vue({
    el: '#app',
    router,
    store,
    localStorage: {
        lastSearches: {
            type: Array,
            default: []
        }
    },    
    render: h => h(App)
});

