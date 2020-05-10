<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			我的收藏
			<span></span>
		</div>
		<ul>
	  		<li v-for="(item,index) in list" @click="food(index)">
	  			<div :style="{backgroundImage: 'url(' + item.cimg + ')'}"></div>
	  			<p>{{item.cname}}</p>
	  		</li>
	  	</ul>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				uid:'',
				collectList:[],
				list:[],
				foodID:''
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			food(i){
				this.foodID=this.list[i].cid
				console.log(this.foodID)
				this.$router.push({name: 'food',params:{cid:this.foodID}})
			},
		},
		mounted(){
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			
			let data1 = {'uid':this.uid}
			this.$http.post('/api/collection/search',data1)
            .then((res)=>{
		    	this.collectList=res.data
		    	console.log(this.collectList)
		    	for(var i in this.collectList){
		    		let data2 = {'cid':this.collectList[i].cid}
					this.$http.post('/api/menu/searchCid1',data2)
		            .then((res)=>{
				    	this.list.push(res.data[0])
				    })
		            .finally((f)=>{
		            	
		            })
		        }
		    	console.log(this.list)
			})
            .finally((f)=>{
            	
            })
	    }
	}
</script>

<style scoped="">
	.head{
		width: 100%;
		line-height: 12vw;
		border-bottom: 1px solid #CCCCCC;
		font-size: 20px;
		font-weight: bold;
		position: fixed;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.head i{
		position: relative;
		left: 10px;
	}
	ul{
		padding-top: 14vw;
	}
	li{
		width: 50%;
	  	overflow: hidden;
	  	float: left;
	}
	li div{
		width: calc(100% - 30px);
		margin: 8px 15px 0 15px;
		height: 150px;
		background-repeat: no-repeat;
	  	background-size: 100% 100%;
	  	background-position: center;
	  	border-radius: 10px;
	}
</style>