<template>
	<div class="container">
		<div class="main">
			<ul class="list-group-items">
				<li class="list-group-item list-group-item-info">
					<h4>Favorites</h4>
				</li>

				<!-- Show if no favorites -->
				<li v-if="favorites.length===0"
					class="list-group-item list-group-item-warning"> 
				    <h5>
				    	You have not added any properties to your favourites.
				    </h5>
     			</li>

     			<!-- Show thie list of favorites -->
				<li v-else class="list-group-item"
					v-for="(item, index) in favorites"
					@click="gotoDetails(item)">
					<img class="img-thumbnail"
                        :src="item.thumb_url">
                    <div class='item-box'> 
                        <div>
                            {{ item.price_formatted }}
                        </div>
                        <div class="item-label item-smaller">
                            {{ item.title }}
                        </div>
                    </div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			favorites: []
		}
	},

	created: function () {		
		this.favorites = this.$store.getters.getFavorite;	
	},


	methods: {
		gotoDetails (item) {
			this.$store.commit('saveItem', item);
			this.$router.push('./details')
		}
	}
}

</script>

<style scoped>
	.container {          
          padding-top:10px;          
      }
	
	.item-box {
		margin-left: 110px;
    	margin-top: -60px;
	}

	.list-group-item {
		padding-bottom: 20px;
	}

    li:hover {
        color: #31708f;
        background-color: #d9edf7;
    }

 </style>