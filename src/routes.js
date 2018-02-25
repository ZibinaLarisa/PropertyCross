import Search from './components/Search.vue';
import Results from './components/Results.vue';
import Details from './components/Details.vue';
import Favourites from './components/Favourites.vue';


export const routes = [
    { path: '', component : Search },
    { path: '/results', component: Results },
    { path: '/details', component: Details },
    { path: '/favourites', component: Favourites }
];