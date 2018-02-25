<template>
	<div class="container">
		<div class="main">
			<ul class="list-group-items">
				<li class="list-group-item list-group-item-info">
					<h3>Favourites</h3>
				</li>
				<li class="list-group-item"
					v-for="(item, index) in favourites"
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
			favourites: []
		}
	},

	created: function () {
		this.favourites = this.$store.getters.getfav;
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