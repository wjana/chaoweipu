<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			订单详情
			<span></span>
		</div>
		<div class="con">
			<div class="pageHead">
				<h3>{{state}}</h3>
				<p>订单编号：{{oid}}</p>
				<p>下单时间：{{time}}</p>
			</div>
			<div class="userInfo">
				<p>
					<i class="fa fa-map-marker" aria-hidden="true"></i>
					<span>{{uname}}</span>
					<span>{{phone}}</span>
				</p>
				<p>收货地址：{{addr}}</p>
			</div>
			<div class="foodInfo">
	    		<div class="ordCon" v-for="(item,index) in orders">
	    			<el-row>
					  <el-col :span="8"><div class="grid-content"><el-avatar shape="square" :size="80" fit="cover" :src="item.opimg"></el-avatar></div></el-col>
					  <el-col :span="11"><div class="grid-content black">{{item.pname}}</div></el-col>
					  <el-col :span="5"><div class="grid-content">
					  	<p  class="black"><img src="../../../static/img/钱钱.png" alt="" />{{item.oprice}}</p>
	    				<p class="num">x{{item.opnum}}</p>
					  </div></el-col>
					</el-row>
	    		</div>
	    		<p class="total">共<span>{{totalNum}}</span>件，合计：<img src="../../../static/img/钱钱.png" alt="" /><span>{{totalPrice}}</span></p>
		    </div>
		</div>
		<div class="ok" v-if="show">
			<button @click="tijiao()">
				{{msg}}
			</button>
		</div>
	</main>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				list:[],
				state:'',
				oid:'',
				time:'',
				uname:'',
				phone:'',
				addr:'',
				totalNum:'',
				totalPrice:'',
				orders:[],
				msg:'确认收货',
				show:true
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			tijiao(){
				if(this.msg=="确认收货"){
					MessageBox({
					  	title: '提示',
					  	message: '确定收到商品？?',
					  	showCancelButton: true
					}).then(action => {
						if(action == 'confirm'){
							console.log('继续购物')
							let data2 = {'state':'待评价', 'oid':this.list.oid}
				            this.$http.post('/api/userOrder/updateState',data2)
				            .then((res)=>{
				            	this.$router.push('/myOrder')
//								this.msg=="评价"
				            })
				            .finally((f)=>{
								
				            })
						}
					});
				}
				if(this.msg=="付款"){
					this.$router.push({name: 'pay',params:{paym:this.list.totalPrice,oid:this.list.oid}})
				}
				if(this.msg=="评价"){
//					this.$router.push({name: 'pay',params:{paym:this.list.totalPrice,oid:this.list.oid}})
//					MessageBox.prompt('请输入姓名').then(({ value, action }) => {
//					  console.log(value)
//					  return MessageBox('提示', '操作成功');
//					});
//					MessageBox({
//					    $type:'prompt',
//					    title:'',
//					    message:'请填写您对此订单的评价',
////					    closeOnClickModal:false,   //点击model背景层不关闭MessageBox
//					    showCancelButton:true,   //显示取消按钮
//					    inputPattern:/\S/,    //正则条件
//					    inputErrorMessage:'请输入内容哦~',
//					    showInput:true
//					}).then(({ value, action }) => {
//					    /* value 为填写的值，进行下一步操作*/
//					    console.log(value);
//					    return MessageBox('提示', '发表成功');
//					});
					console.log(this.list.orders[0])
					this.$router.push({name: 'evaluate',params:{evaluateList:this.list.orders}})
				}
			},
			
		},
		mounted(){
			this.list=this.$route.params.order
			console.log(this.list)
            
            let data1 = {'uid':this.list.uid}
			this.$http.post('/api/user/searchUid',data1)
            .then((res)=>{
		    	this.uname=res.data[0].uname
			})
            .finally((f)=>{
            	
            })
            
            this.state=this.list.state
            this.oid=this.list.oid
            this.time=this.list.time
            this.phone=this.list.phone
            this.addr=this.list.oaddress
            this.orders=this.list.orders
            this.totalNum=this.list.totalNum
            this.totalPrice=this.list.totalPrice
            
            console.log(this.orders)
            
            if(this.list.state=="待发货" || this.list.state=="待收货"){
				this.msg='确认收货'
			}
			if(this.list.state=="待付款"){
				this.msg='付款'
			}
			if(this.list.state=="完成"){
				this.show=false
			}
			if(this.list.state=="待评价"){
				this.msg='评价'
			}
		}
	}
</script>

<style scoped="">
	main{
		background-color: #F2F2F2;
		min-height: 100vh;
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
	}
	.head i{
		position: relative;
		left: 10px;
	}
	.con{
		padding: 12vw 0;
		text-align: left;
	}
	.pageHead{
		background: url(../../../static/img/orderHeader.jpg) no-repeat;
		background-position: center;
		background-size: cover;
		padding: 10px 15px;
		color: white;
	}
	.pageHead p{
		margin: 5px 0;
	}
	.fa-map-marker{
		color: #C93756;
	}
	.userInfo{
		background-color: white;
		margin: 10px 0;
		padding: 5px 15px;
	}
	.userInfo p{
		margin: 10px 0;
	}
	.foodInfo{
		background-color: white;
		padding: 0 15px 10px 15px;
	}
	.total img,.black img {
	    vertical-align: bottom;
	    margin-right: 2px;
	}
	.ordCon{
		padding: 8px 0;
		text-align: left;
		border-bottom: 1px solid #ccc;
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
	}
	.total span{
		color: #C93756;
	}
	.total span:first-of-type{
		margin: 0 2px;
	}
	.ok{
		width: 100%;
		background-color: white;
		position: fixed;
		bottom: 0;
		height: 8vh;
		line-height: 8vh;
		text-align: right;
	}
	.ok button{
		border: none;
		color: white;
		background-color: #C93756;
		padding: 8px 15px;
		font-size: 16px;
		margin-right: 2vw;
	}
</style>