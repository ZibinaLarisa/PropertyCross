saveTotal<template>
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">PropertyCross</a>
                </div>
                <button class="btn btn-info navbar-btn navbar-right"
                @click="gotoFavourites()">Favourites</button>
            </div>
        </nav>
        <div>
            <p>
                Use the form below to search for houses to buy.
                You can search by place-name, postcode, or click 'My location',
                to search in your current location!
            </p>
            <form>
                <div class="input-group">
                    <input type="text" class="form-control" 
                      placeholder="Search" 
                      v-model="query" 
                      @click="search(query)"
                      >  
                     <!--  @input="search(query)" -->
                    <div class="input-group-btn">
                        <button class="btn btn-default" type="submit">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </div>
                </div>
            </form>
            <button type="button" class="btn btn-info" 
                @click="search(query)">
                  Go
            </button>
            <button type="button" class="btn btn-info"
	            @click="getLocation()">            
	              My location
            </button>
        </div>

        <!-- Heading above recent searches list -->
        <template v-if="(lsLength)&&(!errorMsg)&&(!locations.length)">
            <ul class="list-group">
                        <li class="list-group-item list-group-item-info">Resent searches</li>
                <li class="list-group-item" 
                    v-for="(item, index) in getLastSearches"
                    @click="search(item)">
                    <div>{{ item.title }} ({{ item.quantity }})</div>
                </li>
            </ul> 
        </template>

        <!-- Heading above suggested locations list  -->
        <template v-if="locations.length!==0">
            <ul class="list-group">
                <li class="list-group-item list-group-item-info">Please select a location below</li>
                <li class="list-group-item"  
                  v-for="(item, index) in locations"                  
                  @click="search(item.place_name)"
                  >                  
                <div>{{ item.title }}</div>                  
                </li>
            </ul> 
        </template>
        <template v-if="errorMsg">
            <ul class="list-group">  
                <li class="list-group-item list-group-item-warning">{{ errorMsg }}</li>
            </ul>              
        </template>
    </div>   
</template>
<script>

export default {
    data() {
        return {
            query: '',
            errorMsg:'',
            locations: [],
            listProps: [],
            lsLength: 0
        };
    },

    created: function () {
        this.lsLength = this.$localStorage.get('lastSearches').length;     
        this.$store.commit('setLocalStorage', this);
    },

    computed: {
        getLastSearches: function () {
            return this.$localStorage.get('lastSearches');
        }  
    },

    methods: {

        search(query) {
            let vm = this;
            if (!query) return;
         
            if (typeof query === 'object') {
                this.$store.commit('saveQueryTitle', query.title);
                query = query.place_name;                    
            }             
      
            this.$store.dispatch('search', [query, ])
            .then(() => {
                
                this.errorMsg = vm.$store.getters.getmsg;
                const response = vm.$store.getters.getData;  

                vm.switchResponse(response);               
                
            });            
        },

        switchResponse(response) {

            this.locations = response.locations;                
            let appCode = response.application_response_code; 

            
            switch (appCode) {
                case '100': //one unambiguous location
                case '101': //best guess of ambiguous location
                case '110': //location very large
                    
                    
                    if(!response.listings.length){
                        this.errorMsg = 'There were no properties found for the given location.'
                        break;
                    }        
               
                    this.$store.commit('saveListings', response.listings);
                    this.saveLocationToLS(this.locations[0], response.total_results);
                    
                    this.$router.push('/results');
                    break;

                
                   // the results will be shown in the suggested locations list
                case '200': // ambiguous location
                case '202': //misspelled location
                    // 

                    
                    if(!this.locations.length){
                        this.errorMsg = 'There were no properties found for the given location.'
                        break;
                    }
                    else if (response.application_response_text=='unknown location'){
                        this.errorMsg = 'The location given was not recognised.';
                        break;       
                    }   
                default:
                    this.errorMsg = 'There was a problem with your search.';
                    console.error('status_code: ', response.status_code, response.application_response_text);
                }
        
        },
		
		getLocation () {
			let vm = this;
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				vm.errorMsg = 'The use of location is currently disabled';
			}

			function showPosition(position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
				vm.$store.dispatch('searchLocation', (latitude + ',' + longitude))
				.then(() => {
                    const response = vm.$store.getters.getData;            
                    vm.switchResponse(response);
                });				
			}		
		},

        saveLocationToLS (obj, quantity) {
          
            let lastSearches = this.$localStorage.get('lastSearches');
            obj.quantity = quantity; 
            if (!lastSearches.length) {
                lastSearches.unshift(obj);
            }
            else {
                for (let i=0; i < lastSearches.length; i++) {
                    if (lastSearches[i].title === obj.title || i > 3) { 
                        lastSearches.splice(i, 1);
                    }
                }
                lastSearches.unshift(obj); 
            }                    
            this.$localStorage.set('lastSearches', lastSearches);
        },

        gotoResults(){
            this.$router.push('/results');
        },
        gotoFavourites() {
            this.$router.push('/favourites');
        }
    }    
};

</script>

<style scoped>
      .container {
          display: block;
          width: 800px;
          margin-left: auto;
          margin-right: auto;
          padding-top:10px;
          border: 1px solid blue;
      }
      .navbar-right {
          margin-right: 7px;
      }
      .input-group {
          margin-bottom: 10px;
      }
      .list-group {
          margin-top: 15px;
          margin-bottom: 15px;
      }
      
</style>