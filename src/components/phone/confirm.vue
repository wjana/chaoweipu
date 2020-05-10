<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			确认订单
			<span></span>
		</div>
		<div class="content">
			<div class="orderInfo">
				<p>
					<strong>{{name}}</strong>
					<span>{{phone}}</span>
					<p><i class="fa fa-map-marker" aria-hidden="true"></i>{{ad}}</p>
				</p>
				<button @click="changeAd()">更改地址</button>
			</div>
			<table class="adTable" :class="{none:n}" cellspacing="0">
			  	<tr><th>名字</th><th>电话</th><th>地址</th></tr>
			  	<tr v-for="(item,index) in newList" @click="chooseAd(index)">
			  		<td>{{item.uname}}</td>
			  		<td>{{item.uid}}</td>
			  		<td>{{item.address}}</td>
			  	</tr>
			</table>
			<p class="proInfo">商品信息</p>
			<ul class="goods">
				<li v-for="(item,index) in buyList">
					<span class="img"><img :src="item.pimg"/></span>
					<div class="goodInfo">
						<p class="name">{{item.pname}}</p>
						<p class="explain">{{item.weight}}</p>
					</div>
					<div class="goodNum">
						<p class="price">￥{{item.price}}</p>
						<p class="number"><span>x</span>{{item.pnum}}</p>
					</div>
				</li>
			</ul>
			<!--<div class="payway">
				<p>支付方式</p>
				<p>
					<img src="../../static/img/支付宝.png"/>
					<input type="radio" name="way" id="" value="" />
				</p>
				<p>
					<img src="../../static/img/微信支付.png"/>
					<input type="radio" name="way" id="" value="" />
				</p>
			</div>-->
		</div>
		<div class="bottom">
			<span>总计：<span class="paynum">{{money}}</span>元</span>
			<button class="pay" @click="pay()">确认付款</button>
		</div>
		<div class="bottom" v-if="tishim">
			提醒！您的余额不足！<router-link to="/charge">点击充值>></router-link>
		</div>
		<div class="bottom" v-if="tishi">
			提醒！您所购买的<span class="red">{{tishi1}}</span>库存只有<span class="red">{{stock}}</span>！
		</div>
		
	</main>
</template>

<script>
	let moment = require("moment");
	export default{
		data(){
			return{
				name:'',
				phone:'',
				uid:'',
				address:'选择地址',
				buyList:[],
				addr:'',
				addrsList:[],
				newList:[],
				newaddr:'',
				ad:'',
				n:true,
				money:0,
				shopCarList:[],
				oid:0,
				stock:0,
				tishi1:'',
				tishi2:0,
				tishi:false,
				yue:0,
				tishim:false,
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
				localStorage.removeItem('order')
			},
			changeAd(){
				this.n =! this.n
			},
			chooseAd(i){
               	this.ad=this.newList[i].address
               	this.n=true
			},
			pay(){
				for(let j in this.buyList){
					let data = {'pid':this.buyList[j].pid}
		            this.$http.post('/api/shopCar/deleteProduct',data)
		            .then((res)=>{
		               	console.log('删除成功')
		               	let data5 = {'stock':parseInt(this.stock)-parseInt(this.buyList[j].pnum),'pid':this.buyList[j].pid}
			            this.$http.post('/api/product/updateStock',data5)
			            .then((res)=>{
			               	console.log(1)
			            })
		            })
				}
				
				var date = new Date()
				date = moment(date).format('YYYY-MM-DD')
				let data2 = {'uid':this.uid,'oaddress':this.ad,'phone':this.phone,'state':'待付款','time':date}
	            this.$http.post('/api/userOrder/add',data2)
	            .then((res)=>{
	                this.oid = res.data[0].id
	                console.log(this.oid)
	                for(let i in this.buyList){
	                	let data3 = {'oid':this.oid,'pid':this.buyList[i].pid,'opimg':this.buyList[i].pimg,'pname':this.buyList[i].pname,'opnum':this.buyList[i].pnum,'oprice':this.buyList[i].price,'total':this.buyList[i].pnum*this.buyList[i].price}
			            this.$http.post('/api/orderDetail/add',data3)
			            .then((res)=>{
			                console.log('插入成功')
			            })
			        }
	                this.$router.push({name: 'pay',params:{oid:this.oid}})
                })   
			}
				
		},
		mounted(){
//			this.buyList=this.$route.params.orderList
			this.buyList = JSON.parse(localStorage.getItem('order'));
	 		console.log(this.buyList)
			
			for(let i in this.buyList){
				this.money=this.buyList[i].pnum*this.buyList[i].price+this.money
				console.log(this.buyList[i].pid)
				
				let data5 = {'pid':this.buyList[i].pid}
	            this.$http.post('/api/product/searchPid',data5)
	            .then((res)=>{
	               	this.stock=res.data[0].stock
	               	console.log(this.stock)
	               	if(this.buyList[i].pnum>this.stock){
	               		this.tishi1=this.buyList[i].pname
	               		this.tishi=true
	               	}
	            })
			}
			
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			
			let data = {'uid':this.uid}
            this.$http.post('/api/user/searchUid',data)
            .then((res)=>{
               	this.list=res.data
               	console.log(this.list)
               	
               	this.addr = this.list[0].address
               	if(this.addr==''){
               		this.newList=[]
               	}
               	else{
               		this.addrsList = this.addr.split("|")
	               	for(var j in this.addrsList){
	               		this.newList.push({uid:this.list[0].uid,uname:this.list[0].uname,address:this.addrsList[j]})
	               	}
               	}
               	console.log(this.newList)
               	
               	this.name=this.list[0].uname
               	this.phone=this.list[0].uid
               	this.yue=this.list[0].money
               	this.ad=this.newList[0].address
               	
               	if(this.money>this.yue){
					this.tishim=true
					console.log(1,this.money,this.yue)
				}else{
					this.tishim=false
					console.log(2,this.money,this.yue)
				}
            })
            .finally((f)=>{
            	
            })
		}
	}
</script>

<style scoped="">
	main{
		min-height: 100vh;
		background-color: #F2F2F2;
		position: relative;
		overflow: hidden;
	}
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
	.orderInfo{
		background-color: #faebed;
		text-align: left;
		box-sizing: border-box;
		padding: 15px 15px;
		position: relative;
		border-bottom: 2px dotted #C93756;
		overflow: hidden;
	}
	.orderInfo P{
		margin-top: 7.5px;
	}
	.orderInfo strong{
		font-size: 18px;
		margin-right: 20px;
	}
	.orderInfo i{
		margin-right: 5px;
		font-size: 20px;
		color: #999;
	}
	.orderInfo button{
		background-color: #CA6924;
		color: white;
		padding: 5px;
		float: right;
	}
	.proInfo{
		margin-top: 15px;
		padding: 10px 15px;
    	text-align: left;
		background-color: white;
	}
	.goods{
		text-align: left;
		overflow: hidden;
		padding: 0px 13px;
		box-sizing: border-box;
		background-color: white;
	}
	.goods li{
		width: 100%;
		border-top: 1px solid #F2F2F2;
		padding: 10px 0;
	}
	.img{
		float: left;
		width: 80px;
		height: 80px;
	}
	.img img{
		width: 100%;
		height: 100%;
	}
	.goodInfo {
		display: inline-block;
		margin-left: 15px;
	}
	.goodNum{
		float: right;
	}
	.payway {
		overflow: hidden;
		padding-bottom: 41px;
	}
	.payway p{
		text-align: left;
		margin: 20px 13px;
	}
	.payway input{
		float: right;
		width: 18px;
		height: 18px;
	}
	.goodInfo{
		width: 50%;
	}
	.name, .price{
		font-size: 18px;
		line-height: 2.5;
	}
	.price{
		color: #C93756;
	}
	.explain{
		overflow : hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	.explain{
		color: #999999;
	}
	.number{
		color: #C93756;
		text-align: center;
	}
	.bottom{
		width: 100%;
		max-width: 750px;
		line-height: 2.5;
		position: fixed;
		bottom: -1px;
		border-top: 1px solid #F2F2F2;
		background-color: white;
	}
	.red{
		color: red;
	}
	.paynum{
		color: red;
		margin-right: 7px;
	}
	.pay{
		background-color: #C93756;
		width: 40%;
		font-size: 16px;
		line-height: 2.5;
		float: right;
		border: none;
		outline: none;
		color: white;
	}
	/deep/ .el-table__header{
		width: 100% !important;
	}
	/deep/ .el-table__body{
		width: 100% !important;
	}
	.adTable{
		position: absolute;
		bottom: 0;
		border-color: white;
		z-index: 2;
		background-color: #fff2f4;
		padding: 5px;
		border: 1px solid white;
		transition: 1s;
		width: 100%;
	}
	.none{
		transform: translateY(100%);
	}
	.adTable td,.adTable th{
		border: 1px white solid;
		padding: 8px 5px;
	}
	.content{
		overflow: hidden;
		padding: 12vw 0;
	}
</style>