<template>
	<div class="Details">
    	<div class="card">
            <div class="card-header">
                Property Details
            </div>
                      
            <div class="card-block">
               
                <h4 class="card-title">{{item.price_formatted}}</h4>
                <h4 class="card-title">{{item.title}}</h4>
                <img :src="item.img_url" alt="" >

                <h5 class="card-title">{{item.bedroom_number}} bedrooms, {{item.bathroom_number}} bathrooms</h5>

                <p class="card-text">{{item.summary}}</p>
                <a href="#" class="btn btn-primary">Favourite</a>
            </div>
        </div>
	</div>
</template>
<script>
export default {
    data() {
        return {    
            item: {},
                
        }
    },

    created: function () {      
        this.item = this.$store.state.item;      
       
    },

    methods: {
        
    }
}
</script>

<style scoped>

    .card-block {
        padding: 10px;        
    }

   
 </style>