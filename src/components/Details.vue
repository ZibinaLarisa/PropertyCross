<template>
	<div class="container">
    	<div class="card">
            <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                  <h3>Property Details</h3>
                </div>
                <button class="btn btn-info navbar-btn navbar-right"
                @click="gotoFavorites()">Favorites</button>
            </div>
        </nav>
            <div class="card-block">
                <h4 class="card-title">{{item.price_formatted}}</h4>
                <h4 class="card-title">{{item.title | trancated}}</h4>
                <img :src="item.img_url" alt="" >
                <h5 class="card-title">{{item.bedroom_number}} bedrooms, {{item.bathroom_number}} bathrooms</h5>
                <p class="card-text">{{item.summary}}</p>

                <button class="btn btn-primary"
                @click="toggleFavorite()"
                 :class="{starred: item.favorite}"
                >{{favButton}}</button>
                
            </div>
        </div>
	</div>
</template>
<script>
export default {
    data() {
        return {    
            item: {} 
        }
    },
    
    created: function () {      
        this.item = this.$store.getters.getItem;
    },

    computed: {
        favButton () {
            return this.$store.getters.getTextButton;
        }    
    },

    methods: {
        toggleFavorite() {
            this.$store.commit('toggle_fav');
        },

        gotoFavorites(){
            this.$router.push('./favorites');
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
    /.details {
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
    .starred {
    color: red;
    background-color:orange;
    border-color:red;
    }

   
 </style>