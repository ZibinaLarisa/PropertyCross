import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { router } from '../main.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        vm: {},
        data: {},        
        listProps: [],
        item:{},
        msg:'',
        textButton: ''         
    },

    getters:{
        getData: state => state.data,
        getmsg: state => state.msg,
        getItem: state => state.item,        
        getTotalAmount: state => state.data.total_results,
        getTitle: state => state.data.locations[0].title,
        getListings: state => state.listProps,
        getTextButton: state =>state.textButton,
        getFavorite: function(state) {
            let list_filtered =  state.listProps.filter(item => item.favorite);
            return list_filtered;
        }
    },

    mutations:{

        setData (state, payload) { 
            state.data = payload;  // response.data.response
        },
        setLocalStorage (state, obj) {
            state.vm = obj;    
        },
        saveListings (state, arr) {
            state.listProps = arr; //  response.listings
        },
        
        saveQueryTitle (state, title) {
            state.queryTitle = title;            
        },
        setLocation (state, payload_) {
            state.data = payload_;
        },
        saveItem (state, obj) {
            state.item = obj; // response.listings[i] at the Result page
            Vue.set(state.item, 'favorite', false);
            state.textButton = 'Add to favorite';           
        },
        setmsg (state, string) {
            state.msg = string;
        },
       
        toggle_fav (state) {
            state.item.favorite = !state.item.favorite;
            state.textButton = !state.item.favorite ? 'Add to favorite' : 'Remove from favorite'
           
        }
       
    },

    actions: {
        
        search({ commit }, [query, page=1]) {      
            const url = 'https://api.nestoria.co.uk/api';
            return axios.get(url,
                { 
                    timeout: 5000,
                    params: {
                        country: 'uk',
                        pretty: 1,
                        action: 'search_listings',
                        encoding: 'json',
                        listing_type: 'buy',
                        page: page,
                        place_name: query
                    }
                })
                .then(response => {                          
                    const results = response.data.response;
                    store.commit('setData', results);
                    return results;
                })                                
                .catch((error) => {
                    console.log(error);
                    const ermsg = 'An error occurred while searching. Please check your network connection and try again.'
                    store.commit('setmsg', ermsg);                    
                });
        },
		
		searchLocation({ commit }, location) {  
            const url = 'https://api.nestoria.co.uk/api';
            return axios.get(url,
                { 
                    timeout: 5000,
                    params: {
                        country: 'uk',
                        pretty: 1,
                        action: 'search_listings',
                        encoding: 'json',
                        listing_type: 'buy',
                        page: 1,
                        centre_point: location
                    }
                })
                .then(response => {
                    const results = response.data.response;                   
                    store.commit('setData', results);								
                    return results;
                })                                
                .catch((error) => {
                    console.log(error); 
                    const ermsg = 'Unable to detect current location. Please ensure location is turned on in your phone settings and try again.'
                    store.commit('setmsg', ermsg);                   
                });
        }
    }
});

export default store;
