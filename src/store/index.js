import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { router } from '../main.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        vm: {},
        data: {},
        totalAmount: 0,
        listProps: [],
        item:{},       
        queryTitle:''    
    },

    getters:{
        getData: state => state.data       
    },

    mutations:{

        setData (state, payload) { // response.data.response
            state.data = payload;      
        },
        setLocalStorage (state, obj) {
            state.vm = obj;      
        },
       	saveListings (state, arr) {
            state.listProps = arr;
        },
        saveTotal (state, number) { 
            state.totalAmount = number;
        },
        saveQueryTitle (state, title) {
            state.queryTitle = title;            
        },
        setLocation (state, payload_) {
            state.data = payload_;
        },
        saveItem (state, obj) {
            state.item = obj;
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
                    console.log(`page ${page}`);
                    const results = response.data.response;                    
                    console.log('results', results);
                    store.commit('setData', results);
                    return results;
                })                                
                .catch((error) => {
                    console.log(error);
                });
        },
		
		searchLocation({ commit }, [location, page=1]) {      
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
                });
        }
    }
});

export default store;
