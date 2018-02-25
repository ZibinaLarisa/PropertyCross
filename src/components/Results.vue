<template>
    <div class="container"> 
        <div class="main">
            <ul class="list-group">
                <li class="list-group-item list-group-item-info">
                {{ listProps.length }}  of {{ totalAmount }} matches
                </li>
                <li class="list-group-item" 
                    v-for="(item, index) in listProps"   
                    @click="gotoDetails(item)"
                    >
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
            <div class="info-item">
            <p>
               Results for {{queryTitle}}, showing {{ listProps.length }} of {{ totalAmount }} properties 
                </p>
                <button type="button" class="btn btn-info"
                     v-if="listProps.length !== totalAmount"
                     @click="loadMoreProperties()">         
                    {{ loadButton }}
                </button>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    data() {
        return {             
            totalAmount: 0,
            listProps: 0,
            queryTitle: '',
            loadButton:'Load more...',
            page: 1      
        }
    },

    created: function () {      
        this.totalAmount = this.$store.state.totalAmount;
        this.listProps = this.$store.state.listProps;
        this.queryTitle = this.$store.state.queryTitle;
    },

    methods: {
        loadMoreProperties(){
            this.loadButton = 'Loading ...'
            this.page = this.page+1;                    
            this.$store.dispatch('search', [this.queryTitle, this.page])
            .then(res => {                
                this.listProps = this.listProps.concat(res.listings);
                this.loadButton = 'Load more...'
                this.$store.commit('saveListings', this.listProps);
                
            })
            .catch(error => {
                console.log(error)
            })
        },

        gotoDetails (item) {
            this.$store.commit('saveItem', item);
            console.log(item);          
            this.$router.push('/details');
        }

    }
}
</script>


<style scoped>

    button {
        position: absolute;
        margin-left: 400px;
        margin-top: -40px;
    }

    .info-item {
        color: #0c5460;
        background-color: #bee5eb;
        border: 1px solid rgba(0,0,0,.125);
        vertical-align: center;
        padding: 10px 20px;
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