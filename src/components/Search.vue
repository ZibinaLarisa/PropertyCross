<template>
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">PropertyCross</a>
                </div>
                <button class="btn btn-info navbar-btn navbar-right">Favourites</button>
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
                      @keyup.enter="search(query)">  
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
	            @click="gotoResults()">            
	              My location
            </button>
        </div>

        <template v-if="errorMsg">
            <ul class="list-group">  
                <li class="list-group-item list-group-item-warning">{{ errorMsg }}</li>
            </ul>              
        </template>

        <template v-if="(lsLength)">
            <ul class="list-group">
				<li class="list-group-item list-group-item-info">Resent searches</li>
                <li class="list-group-item" 
                    v-for="(item, index) in getLastSearches"
                    @click="search(item)">
                    <div>{{ item.title }} ({{ item.quantity }})</div>
                </li>
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
                query = query.title;                         
                this.$store.commit('saveQueryTitle', query);
            }             
      
            this.$store.dispatch('search', [query, ])
            .then(() => {
                const response = vm.$store.getters.getData;               
                vm.switchResponse(response);
            });            
        },

        switchResponse(response) {
            console.log(response);      
                let appCode = response.application_response_code;
                console.log(appCode);
                console.log(response.listings);
                this.locations = response.locations;
                switch (appCode) {
                case '100': 
                case '101':
                case '110':
                 
                    this.$store.commit('saveListings', response.listings);
                    this.saveLocationToLS(this.locations[0], response.total_results);
                    this.$store.commit('saveTotal', response.total_results);
                    this.$router.push('/results');
                    break;
                default:
                    this.errorMsg = 'There was a problem with your search.';
                    console.error('status_code: ', response.status_code, response.application_response_text);
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
        }
    }
    
};

</script>

<style scoped>
      .container {
          display: block;
          width: 600px;
          margin-left: auto;
          margin-right: auto;
          padding-top:10px;
          border: 1px solid black;
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