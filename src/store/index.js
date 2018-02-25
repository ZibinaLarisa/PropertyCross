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
        queryTitle:'',
        msg:'',
        favourites: []    
    },

    getters:{
        getData: state => state.data,
        getmsg: state => state.msg,
        getfav: state => state.favourites
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
        saveTotal (state, number) { 
            state.totalAmount = number; // response.total_results
        },
        saveQueryTitle (state, title) {
            state.queryTitle = title;            
        },
        setLocation (state, payload_) {
            state.data = payload_;
        },
        saveItem (state, obj) {
            state.item = obj; // response.listings[i] at the Result page
        },
        setmsg (state, string) {
            state.msg = string;
        },
        addFavourites (state, obj) {
            state.favourites.push(obj);           
        },
        delFavourites (state, obj) {
           const index = state.favourites.findIndex(item => item.title === obj.title);
           console.log(`index ${index}`);
           if (index !== -1) {
              state.favourites.splice(index, 1);
            }
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
                            console.log(`indexquery ${query}`);
                    const results = response.data.response;                    
                            console.log('results', results);
                    store.commit('setData', results);
                    
                    return results;
                })                                
                .catch((error) => {
                    console.log(error);
                    const ermsg = 'An error occurred while searching. Please check your network connection and try again.'
                    store.commit('setmsg', ermsg);
                    //store.state.msg = 'An error occurred while searching. Please check your network connection and try again.';
                    
                });
        },
		
		searchLocation({ commit }, location) {    
        console.log(location);  
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
                            console.log(response);                  
                    const results = response.data.response;                   
                    store.commit('setData', results);
					       console.log('results', results);					
                    return results;
                })                                
                .catch((error) => {
                    console.log(error); 
                    store.commit('setmsg', ermsg);
                    //store.state.msg = 'Unable to detect current location. Please ensure location is turned on in your phone settings and try again.';
                });
        }
    }
});

export default store;
