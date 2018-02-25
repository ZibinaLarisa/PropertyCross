<template>
	<div class="details">
    	<div class="card">
            <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                  <h3>Property Details</h3>
                </div>
                <button class="btn btn-info navbar-btn navbar-right"
                @click="gotoFavourites()">Favourites</button>
            </div>
        </nav>
            <div class="card-block">
                <h4 class="card-title">{{item.price_formatted}}</h4>
                <h4 class="card-title">{{item.title | trancated}}</h4>
                <img :src="item.img_url" alt="" >
                <h5 class="card-title">{{item.bedroom_number}} bedrooms, {{item.bathroom_number}} bathrooms</h5>
                <p class="card-text">{{item.summary}}</p>
                <a href="#" class="btn btn-primary"
                @click="addtoFavourite()"
                >{{favButton}}</a>
            </div>
        </div>
	</div>
</template>
<script>
export default {
    data() {
        return {    
            item: {},
            favButton: 'Add to favourite',
            favourite: false,           
        }
    },

    created: function () {      
        this.item = this.$store.state.item;        
        this.getFavourites();    
    },

    methods: {
        addtoFavourite() {
            this.favourite = !this.favourite;
            this.favButton = this.favourite ? 'Remove from Favourite' : 'Add to favourite';
            if (this.favourite) {
                this.$store.commit('addFavourites', this.item)
            }
            else {
                this.$store.commit('delFavourites', this.item)
            }
        },

        getFavourites() {
            let arr = this.$store.getters.getfav;
            const title = arr.find(item => item.title === this.item.title );
            if (title) {
                this.favButton = 'Remove from Favourite';
            }
        },


        gotoFavourites(){
            this.$router.push('./favourites');
            ;
        }
    },

    filters: {
        trancated: function (value) {
            if (!value) return '';
            return  value.split(',').slice(0,2).join(',');            
        }
        
    }
}
</script>

<style scoped>
    body {
        background-color: grey;
    }
    .details {
        display: block;
        width: 800px;
        margin-left: auto;
        margin-right: auto;
        padding-top:10px;
          
    }
    .navbar-right {
        margin-right: 20px;
    }

    .card-block {
        padding: 10px;        
    }

   
 </style>