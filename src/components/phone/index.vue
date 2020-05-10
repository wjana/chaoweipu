<template>
	<main>
		<div class="head">
			<img src="../../../static/img/logoImg2.png"/>
			潮味谱
		</div>
		<ul class="foot">
			<li class="active">
				<router-link to="/index"><i class="fa fa-square fa-pulse" aria-hidden="true"></i>首页</router-link>
			</li>
			<li>
				<router-link to="/type"><i class="fa fa-bars" aria-hidden="true"></i>菜单</router-link>
			</li>
			<li>
				<router-link to="/basket"><i class="fa fa-shopping-basket" aria-hidden="true"></i>菜篮子</router-link>
			</li>
			<li>
				<router-link to="/my"><i class="fa fa-user-o" aria-hidden="true"></i>我的</router-link>
			</li>
		</ul>
		<div class="loop">
			<mt-swipe :auto="4000">
				<mt-swipe-item v-for="(item,index) in loopList"><img :src="item.cimg" @click="food(index)"/></mt-swipe-item>
			</mt-swipe>
		</div>
		<ul class="navBtn">
			<li class="btns"><router-link to="/menu"><i class="fa fa-cutlery fa-2x" aria-hidden="true"></i></router-link>菜谱</li>
			<li class="btns"><router-link to="/shop"><i class="fa fa-truck fa-2x" aria-hidden="true"></i></router-link>市集</li>
			<li class="btns"><router-link to="/editMenu"><i class="fa fa-book fa-2x" aria-hidden="true"></i></router-link>发表菜谱</li>
			<li class="btns"><router-link to="/twentyFour"><i class="fa fa-th fa-2x" aria-hidden="true"></i></router-link>24节气</li>
		</ul>
		<div class="today">
		  	<p class="tdTitle">
		  		<i class="fa fa-caret-left" aria-hidden="true"></i>	今日优选	<i class="fa fa-caret-right" aria-hidden="true"></i>
		  	</p>
		  	<section class="td td1">
		  		<div class="tdt">
		  			<router-link to="/popularMenu">热门菜品<p>今天这样吃>></p></router-link>
		  		</div>
		  	</section>
		  	<!--<section class="td td2">
		    	<div class="tdt">
		    		<router-link to="/popularMenu">时令食材<p>食材随便选>></p></router-link>
		    	</div>
		 	</section>-->
		</div>
		<div class="recommend">
		  	<p class="rcTitle">
		  		<i class="fa fa-caret-left" aria-hidden="true"></i>	为您推荐	<i class="fa fa-caret-right" aria-hidden="true"></i>
		  	</p>
		  	<section class="rcCon">
		    	<div v-for="(item,index) in list.slice(0,3)" @click="food1(index)">
		      		<img :src="item.cimg"/>
		      		<p>{{item.cname}}</p>
		    	</div>
		  	</section>
		  	<section class="rcCon2" v-for="(item,index) in list.slice(3,7)" @click="food2(index)">
		    	<img :src="item.cimg"/>
		    	<div>
			      	<p>{{item.cname}}</p>
			      	<p class="rcDes">{{item.cinfo}}</p>
		    	</div>
		    </section>
		</div>

		<img class="footImg" src="../../../static/img/img18.jpg"/>
	</main>
</template>

<script>
	import 'swiper/css/swiper.css'
	import Swiper from 'swiper'
	export default{
		name:"Slider",
		data(){
			return {
				list:[],
				length:0,
				loopList:[],
				loopIdList:[],
				foodID:''
			}
		},
		methods:{
			random(min, max){
				return Math.floor(Math.random() * (max - min)) + min;
			},
			a(){
				do{
					this.loopIdList[0]=this.random(0,this.length)
					this.loopIdList[1]=this.random(0,this.length)
					this.loopIdList[2]=this.random(0,this.length)
				}while(this.loopIdList[0] == this.loopIdList[1] || this.loopIdList[0] == this.loopIdList[2] || this.loopIdList[1] == this.loopIdList[2])
				for(var i in this.loopIdList){
					this.loopList.push(this.list[this.loopIdList[i]])
				}
				console.log(this.loopList)
			}, 
			food(i){
				this.foodID=this.loopList[i].cid
				console.log(this.foodID)
				this.$router.push({name: 'food',params:{cid:this.foodID}})
			},
			food1(i){
				this.foodID=this.list[i].cid
				console.log(this.foodID)
				this.$router.push({name: 'food',params:{cid:this.foodID}})
			},
			food2(i){
				this.foodID=this.list[i+3].cid
				console.log(this.foodID)
				this.$router.push({name: 'food',params:{cid:this.foodID}})
			}
		},
		mounted(){
			this.$http.post('/api/menu/search')
            .then((res)=>{
                this.list=res.data
                this.length=this.list.length
                console.log(this.length)
            	this.a()
            })
            .finally((f)=>{
            	
            })
            
            document.onscroll=null;
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
			document.documentElement.scrollTop=0;
			window.pageYOffset=0;
			document.body.scrollTop=0;
		}
	}
</script>

<style scoped="">
	.head{
		width: 100%;
		height: 12vw;
		line-height: 12vw;
		background-color: #c93756;
		text-align: left;
		color: white;
		font-size: 34px;
		font-weight: bold;
		position: fixed;
		z-index: 10;
		padding-left: 20px;
		font-family: cursive;
	}
	.loop{
		width: 100%;
		overflow: hidden;
		padding-top: 12vw;
	}
	.loop img{
		width: 100%;
		height: 100%;
	}
	.navBtn{
	  	display: flex;
	  	justify-content: space-between;
	  	flex-wrap: wrap;
	  	margin-top: 10px;
	  	border-bottom: 10px solid #F2F2F2;
	}
	.btns{
		width: 25%;
		margin-bottom: 10px;
	}
	.btns a{
	  	width: 18vw;
	  	height: 18vw;
	  	border: 1px #eeeeee solid;
	  	border-radius: 50%;
	  	display: flex;
	  	justify-content: center;
	  	align-items: center;
	  	margin: 0 auto;
	  	box-shadow: 0px 4px 5px rgb(0, 0, 0,0.3);
	  	margin-bottom: 4px;
	}
	.today{
  		padding: 15px 0;
  		overflow: hidden;
  		border-bottom: 10px solid #F2F2F2;
	}
	.tdTitle,.rcTitle{
		font-size: 20px;
	  	line-height: 2;
	  	color: #C93756;
	}
	.td{
	  	margin: 10px;
	  	border-radius: 10px;
	  	overflow: hidden;
	  	box-sizing: border-box;
	}
	.td1{
		background: url(../../../static/img/img10.jpg) no-repeat;
	  	background-size: 100% 100%;
	}
	.td2{
		background: url(../../../static/img/img38.jpg) no-repeat;
	  	background-size: 100% 100%;
	}
	.td .tdt{
		width: 50vw;
  		padding: 20px 0;
	  	background: rgb(255, 255, 255,0.7);
	  	margin: 32px auto;
	  	font-size: 20px;
	}
	.td .tdt p{
	  	color: #807d7d;
	  	font-size: 14px;
	  	margin-top: 2px;
	}
	.recommend{
	  	padding: 15px 10px;
	}
	.rcCon{
	  	margin: 10px 0;
	  	display: flex;
	  	justify-content: space-between;
	}
	.rcCon div{
	  	width: 30vw;
	}
	.rcCon img{
	  	width: 100%;
	  	height: 30vw;
	  	vertical-align: middle;
	}
	.rcCon p{
	  	font-size: 16px;
	}
	.rcCon2{
	  	margin: 10px auto;
	  	border: 1px solid #eeeeee;
	  	border-radius: 5px;
	  	box-shadow: 3px 3px 5px rgb(0, 0, 0,0.3);
	  	overflow: hidden;
	}
	.rcCon2 img{
	  	width: 100%;
	}
	.rcCon2 p{
	  	padding: 0 10px;
	  	line-height: 2;
	}
	.rcCon2 .rcDes{
	  	font-size: 15px;
	  	color: #807d7d;
	  	white-space: nowrap;
	  	overflow: hidden;
	  	text-overflow: ellipsis;
	}
	.footImg{
	  	width: 100%;
	}
	.foot{
		width: 100%;
		position: fixed;
		bottom: 0;
		padding: 6px 0;
		background-color: white;
		border-top: 1px solid #C93756;
		display: flex;
		justify-content: space-around;
	}
	.foot li{
		font-size: 13px;
		
	}
	.foot .active a{
		color: #C93756;
	}
	.foot li i{
		display: block;
		font-size: 24px;
	}
	/deep/ .mint-swipe-items-wrap{
		padding-bottom: 60%;
	}
	/deep/ .mint-swipe-indicator{
		background: #d7d3d3;
		opacity: 1;
	}
	/deep/ .mint-swipe-indicators .is-active{
		background-size: 4.26vw;
		background-position: -1.1vw;
		opacity: 1;
		background: white;
	}
</style>