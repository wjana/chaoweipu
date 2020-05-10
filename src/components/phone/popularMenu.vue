<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			<span>热门菜谱 <img src="../../../static/img/hot.png"/></span>
			<span></span>
		</div>
		<div class="con">
			<ul>
				<li v-for="(item,index) in list" @click="food(index)">
					<!--<router-link to="/">-->
						<div class="cimg">
							<img :src="item.cimg"/>
						</div>
						<div class="des">
							<h3>{{item.cname}}</h3>
							<p><i class="fa fa-tags" aria-hidden="true"></i>{{item.ctype}}</p>
							<p><i class="fa fa-user-circle" aria-hidden="true"></i>{{item.cauthor}}</p>
						</div>
						<div class="topImg"><img :src="rankImgList[index]"/></div>
					<!--</router-link>-->
				</li>
			</ul>
		</div>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				rankImgList:['../../../static/img/top1.png','../../../static/img/top2.png','../../../static/img/top3.png'],
				foodID:'',
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
	      	food(i){
	      		this.foodID=this.list[i].cid
	      		this.$router.push({name: 'food',params:{cid:this.foodID}})
	      	}
		},
		mounted(){
			this.$http.post('/api/menu/searchByCollect')
            .then((res)=>{
                this.list=res.data
                this.list=this.list.slice(0,6)
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
		z-index: 9;
	}
	.head i{
		position: relative;
		left: 10px;
	}
	.head img{
		margin-top: -2px;
	}
	.con{
		padding-top: 12vw;
		padding-bottom: 5px;
	}
	main{
		background-color: #F2F2F2;
		min-height: 100vh;
	}
	ul{
		width: 95%;
		margin: 0 auto;
	}
	li{
		width: 100%;
		margin-top: 5px;
		box-sizing: border-box;
		padding: 6px 8px 8px 8px;
		background-color: white;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	li div{
		display: inline-block;
	}
	li img{
		width: 100%;
	}
	.cimg{
		width: 30%;
		overflow: hidden;
	}
	.cimg img{
		height: 70px;
	}
	.des{
		width: 55%;
		padding: 0 4%;
		text-align: left;
		line-height: 1.6;
		box-sizing: border-box;
	}
	.des p{
		color: #999999;
	}
	.des i{
		margin-right: 2px;
	}
	.topImg{
		width: 12%;
	}
</style>