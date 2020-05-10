<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			我的订单
			<span></span>
		</div>
		<mt-navbar v-model="selected">
			<mt-tab-item id="1">全部</mt-tab-item>
		  	<mt-tab-item id="2">待付款</mt-tab-item>
		  	<mt-tab-item id="3">待发货</mt-tab-item>
		  	<mt-tab-item id="4">待收货</mt-tab-item>
		  	<mt-tab-item id="5">待评价</mt-tab-item>
		</mt-navbar>
		
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  	<mt-tab-container-item id="1">
		    	<mt-cell v-for="(item,index) in ordetList">
		    		<div class="" @click="allOrdet(index)">
			    		<p class="title"><span>{{uname}}</span><span>{{item.state}}</span></p>
			    		<p class="orderT"><span class="black">订单编号：{{item.oid}}</span><span>{{item.time}}</span></p>
			    		<div class="ordCon" v-for="(order,index) in item.orders">
			    			<el-row>
							  <el-col :span="8"><div class="grid-content"><el-avatar shape="square" :size="80" fit="cover" :src="order.opimg"></el-avatar></div></el-col>
							  <el-col :span="11"><div class="grid-content black">{{order.pname}}</div></el-col>
							  <el-col :span="5"><div class="grid-content">
							  	<p  class="black"><img src="../../../static/img/钱钱.png" alt="" />{{order.oprice}}</p>
			    				<p class="num">x{{order.opnum}}</p>
							  </div></el-col>
							</el-row>
			    		</div>
			    		<p class="total">共<span>{{item.totalNum}}</span>件，合计：<img src="../../../static/img/钱钱.png" alt="" /><span>{{item.totalPrice}}</span></p>
		    		</div>
		    	</mt-cell>
		  	</mt-tab-container-item>
		  	<mt-tab-container-item id="2">
		    	<mt-cell v-for="(item,index) in unpaid"  >
		    		<div class="" @click="unpaidOrder(index)">
			    		<p class="title"><span>{{uname}}</span><span>{{item.state}}</span></p>
			    		<p class="orderT"><span class="black">订单编号：{{item.oid}}</span><span>{{item.time}}</span></p>
			    		<div class="ordCon" v-for="(order,index) in item.orders">
			    			<el-row>
							  <el-col :span="8"><div class="grid-content"><el-avatar shape="square" :size="80" fit="cover" :src="order.opimg"></el-avatar></div></el-col>
							  <el-col :span="11"><div class="grid-content black">{{order.pname}}</div></el-col>
							  <el-col :span="5"><div class="grid-content">
							  	<p  class="black"><img src="../../../static/img/钱钱.png" alt="" />{{order.oprice}}</p>
			    				<p class="num">x{{order.opnum}}</p>
							  </div></el-col>
							</el-row>
			    		</div>
			    		<p class="total">共<span>{{item.totalNum}}</span>件，合计：<img src="../../../static/img/钱钱.png" alt="" /><span>{{item.totalPrice}}</span></p>
		    		</div>
		    	</mt-cell>
		  	</mt-tab-container-item>
		  	<mt-tab-container-item id="3">
		    	<mt-cell v-for="(item,index) in unshipped"  >
		    		<div class="" @click="unshippedOrder(index)">
			    		<p class="title"><span>{{uname}}</span><span>{{item.state}}</span></p>
			    		<p class="orderT"><span class="black">订单编号：{{item.oid}}</span><span>{{item.time}}</span></p>
			    		<div class="ordCon" v-for="(order,index) in item.orders">
			    			<el-row>
							  <el-col :span="8"><div class="grid-content"><el-avatar shape="square" :size="80" fit="cover" :src="order.opimg"></el-avatar></div></el-col>
							  <el-col :span="11"><div class="grid-content black">{{order.pname}}</div></el-col>
							  <el-col :span="5"><div class="grid-content">
							  	<p  class="black"><img src="../../../static/img/钱钱.png" alt="" />{{order.oprice}}</p>
			    				<p class="num">x{{order.opnum}}</p>
							  </div></el-col>
							</el-row>
			    		</div>
			    		<p class="total">共<span>{{item.totalNum}}</span>件，合计：<img src="../../../static/img/钱钱.png" alt="" /><span>{{item.totalPrice}}</span></p>
		    		</div>
		    	</mt-cell>
		  	</mt-tab-container-item>
		  	<mt-tab-container-item id="4">
		    	<mt-cell v-for="(item,index) in unreceived"  >
		    		<div class="" @click="unreceivedOrder(index)">
			    		<p class="title"><span>{{uname}}</span><span>{{item.state}}</span></p>
			    		<p class="orderT"><span class="black">订单编号：{{item.oid}}</span><span>{{item.time}}</span></p>
			    		<div class="ordCon" v-for="(order,index) in item.orders">
			    			<el-row>
							  <el-col :span="8"><div class="grid-content"><el-avatar shape="square" :size="80" fit="cover" :src="order.opimg"></el-avatar></div></el-col>
							  <el-col :span="11"><div class="grid-content black">{{order.pname}}</div></el-col>
							  <el-col :span="5"><div class="grid-content">
							  	<p  class="black"><img src="../../../static/img/钱钱.png" alt="" />{{order.oprice}}</p>
			    				<p class="num">x{{order.opnum}}</p>
							  </div></el-col>
							</el-row>
			    		</div>
			    		<p class="total">共<span>{{item.totalNum}}</span>件，合计：<img src="../../../static/img/钱钱.png" alt="" /><span>{{item.totalPrice}}</span></p>
		    		</div>
		    	</mt-cell>
		  	</mt-tab-container-item>
		  	<mt-tab-container-item id="5">
		    	<mt-cell v-for="(item,index) in unevaluated"  >
		    		<div class="" @click="unevaluatedOrder(index)">
			    		<p class="title"><span>{{uname}}</span><span>{{item.state}}</span></p>
			    		<p class="orderT"><span class="black">订单编号：{{item.oid}}</span><span>{{item.time}}</span></p>
			    		<div class="ordCon" v-for="(order,index) in item.orders">
			    			<el-row>
							  <el-col :span="8"><div class="grid-content"><el-avatar shape="square" :size="80" fit="cover" :src="order.opimg"></el-avatar></div></el-col>
							  <el-col :span="11"><div class="grid-content black">{{order.pname}}</div></el-col>
							  <el-col :span="5"><div class="grid-content">
							  	<p  class="black"><img src="../../../static/img/钱钱.png" alt="" />{{order.oprice}}</p>
			    				<p class="num">x{{order.opnum}}</p>
							  </div></el-col>
							</el-row>
			    		</div>
			    		<p class="total">共<span>{{item.totalNum}}</span>件，合计：<img src="../../../static/img/钱钱.png" alt="" /><span>{{item.totalPrice}}</span></p>
		    		</div>
		    	</mt-cell>
		  	</mt-tab-container-item>
		</mt-tab-container>
		
	</main>
</template>

<script>
	let moment = require("moment");
	
	import Vue from 'vue'
	export default{
		data(){
			return{
				selected: '1',
				uid:'',
				name:'',
				uname:'',
				unpaid:[],
				unshipped:[],
				unreceived:[],
				unevaluated:[],
				ordetList:[],
				userList:[],
				time:'',
				no:false,
				totalPrice:0,
				totalNum:0
			}
		},
		methods:{
			back(){
//				this.$router.go(-1)
				this.$router.push('my')
			},
			allOrdet(i){
				console.log(this.ordetList[i].oid)
				this.$router.push({name: 'orderDetail',params:{order:this.ordetList[i]}})
			},
			unpaidOrder(i){
				console.log(this.unpaid[i].oid)
				this.$router.push({name: 'orderDetail',params:{order:this.unpaid[i]}})
			},
			unshippedOrder(i){
				console.log(this.unshipped[i].oid)
				this.$router.push({name: 'orderDetail',params:{order:this.unshipped[i]}})
			},
			unreceivedOrder(i){
				console.log(this.unreceived[i].oid)
				this.$router.push({name: 'orderDetail',params:{order:this.unreceived[i]}})
			},
			unevaluatedOrder(i){
				console.log(this.unevaluated[i].oid)
				this.$router.push({name: 'orderDetail',params:{order:this.unevaluated[i]}})
			}
		},
		mounted(){
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			
			let data1 = {'uid':this.uid}
			this.$http.post('/api/user/searchUid',data1)
            .then((res)=>{
		    	this.userList=res.data
		    	this.uname=this.userList[0].uname
			})
            .finally((f)=>{
            	
            })
            
//          this.$http.post('/api/orderDetail/searchOrder',data1)
//          .then((res)=>{
//             	this.ordetList=res.data
//             	console.log(this.ordetList)
//             	
//          	if(this.unpaid.length==0){
//             		this.no=true
//             } 
//          })
//          .finally((f)=>{
//          	
//          })   	
               
			//查找用户订单
			this.$http.post('/api/userOrder/searchUid',data1)
            .then((res)=>{
               	this.ordetList=res.data
               	
               	for(let i in this.ordetList){
               		//时间格式
               		this.ordetList[i].time=moment(this.ordetList[i].time).format('YYYY-MM-DD'); 
            		
        			let data2 = {'oid':this.ordetList[i].oid}
               		this.$http.post('/api/orderDetail/searchOid',data2)
		            .then((res)=>{
		               	this.ordDetaList=res.data
		               	this.totalNum=0
	               		this.totalPrice=0
		               	for(let j in this.ordDetaList){
		               		this.totalNum += this.ordDetaList[j].opnum
		               		this.totalPrice += parseFloat(this.ordDetaList[j].total)
		               		
		               		Vue.set(this.ordetList[i],"totalNum",this.totalNum)
							Vue.set(this.ordetList[i],"totalPrice",this.totalPrice)
		               	}
		               	Vue.set(this.ordetList[i],"orders",this.ordDetaList)
		            })
            	}
               	console.log(this.ordetList)
               	for(var z in this.ordetList){
               		if(this.ordetList[z].state=="待付款"){
		       			this.unpaid.push(this.ordetList[z])
		       		}
		       		if(this.ordetList[z].state=="待发货"){
		       			this.unshipped.push(this.ordetList[z])
		       		}
		       		if(this.ordetList[z].state=="待收货"){
		       			this.unreceived.push(this.ordetList[z])
		       		}
               		if(this.ordetList[z].state=="待评价"){
		       			this.unevaluated.push(this.ordetList[z])
		       		}
               	}
               	console.log(this.unevaluated)
            })
        }    
	}
	
</script>

<style scoped="">
	main{
		min-height: 100vh;
		background-color: #F2F2F2;
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
	/deep/ .mint-navbar{
		position: fixed;
		top: 12vw;
		z-index: 9;
    	width: 100%;
	}
	/deep/ .mint-tab-container{
		padding-top: 26vw;
	}
	/deep/ .mint-tab-item-label{
		font-size: 16px;
	}
	/deep/ .mint-navbar .mint-tab-item.is-selected{
		border-bottom: 3px solid #C93756;
    	color: #C93756;
    	margin-bottom: 0px;
	}
	/deep/ .mint-cell-wrapper{
		background-image: none;
	}
	/deep/ .mint-cell{
		background-color: #F2F2F2;
	}
	/deep/ .mint-cell-value{
		width: 100%;
		box-sizing: border-box;
		display: block;
		margin: 8px 0;
		background-color: white;
		overflow: hidden;
		padding: 8px 12px;
	}
	/deep/ .mint-cell-value p{
		overflow: hidden;
		text-align: right;
	}
	/deep/ .mint-cell img {
	    vertical-align: bottom;
	    margin-right: 2px;
	}
	.title span:first-of-type,.orderT span:first-of-type{
		float: left;
	}
	.title span:last-of-type,.orderT span:last-of-type{
		float: right;
	}
	.title{
		padding: 10px 0;
		border-bottom: 1px dotted #C0C4CC;
	}
	.orderT{
		padding: 8px 0;
		font-size: 14px;
	}
	.orderT span:first-of-type{
		color: black
	}
	.ordCon{
		padding: 8px 0;
		border-top: 1px dotted #eee;
		text-align: left;
	}
	.ordCon:first-of-type{
		border-top: 1px solid #ccc;
	}
	.black{
		color: black;
	}
	.num{
		text-align: center;
		margin-top: 10px;
	}
	.total{
		padding-top: 10px;
		text-align: right;
		border-top: 1px solid #ccc;
	}
	.total span{
		color: #C93756;
	}
	.total span:first-of-type{
		margin: 0 2px;
	}
	.not{
		margin-top: 20%;
	}
	.not p{
		margin-top: 10px;
	}
	.grid-content p{
		text-align: right;
	}
</style>