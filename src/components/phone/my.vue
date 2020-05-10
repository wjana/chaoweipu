<template>
	<main>
		<div class="head">
			个人中心
		</div>
		<div class="userInfo">
			<span class="headImg">
				<img :src="uimg"/>
			</span>
			<span class="logReg">{{uid}}<img src="../../../static/img/欢迎.png"/></span>
		</div>
		<ul class="property">
			<li>
				<p><img src="../../../static/img/钱钱.png" alt="" />{{money}}</p>
				<p>充值币</p>
			</li>
			<li>
				<router-link to="/myCollection">
					<p><img src="../../../static/img/帖子.png" alt="" />{{menus}}</p>
					<p>收藏</p>
				</router-link>
			</li>
		</ul>
		<ul class="myOption">
			<li>
				<router-link to="/myPost"><i class="fa fa-handshake-o fa-fw" aria-hidden="true"></i>我的发帖</router-link>
			</li>
			<li>
				<router-link to="/address"><i class="fa fa-address-book-o fa-fw" aria-hidden="true"></i>我的收货地址</router-link>
			</li>
			<li>
				<router-link to="/myOrder"><i class="fa fa-handshake-o fa-fw" aria-hidden="true"></i>我的食材订单</router-link>
			</li>
			<li>
				<router-link to="/charge"><i class="fa fa-money fa-fw" aria-hidden="true"></i>充值中心</router-link>
			</li>
			<li>
				<router-link to="/myInfo"><i class="fa fa-edit fa-fw" aria-hidden="true"></i>个人信息</router-link>
			</li>
			<li>
				<router-link to="/afterSale"><i class="fa fa-volume-control-phone fa-fw" aria-hidden="true"></i>售后服务信息</router-link>
			</li>
		</ul>
		<button to="/" class="outLogin" @click="out()">退出当前用户登录</button>
		
		<ul class="foot">
			<li>
				<router-link to="/index"><i class="fa fa-square" aria-hidden="true"></i>首页</router-link>
			</li>
			<li>
				<router-link to="/type"><i class="fa fa-bars" aria-hidden="true"></i>菜单</router-link>
			</li>
			<li>
				<router-link to="/basket"><i class="fa fa-shopping-basket" aria-hidden="true"></i>菜篮子</router-link>
			</li>
			<li class="active">
				<router-link to="/my"><i class="fa fa-user-o" aria-hidden="true"></i>我的</router-link>
			</li>
		</ul>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				uid:'',
				money:0,
				menus:0,
				uimg:''
			}
		},
		methods:{
			out(){
				this.cookies.clearCookie()
				this.$router.push({path: '/'})
			}
		},
		mounted(){
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			
			let data1 = {'uid':this.uid}
			this.$http.post('/api/user/searchUid',data1)
            .then((res)=>{
		    	this.list=res.data
		    	this.money=this.list[0].money
		    	this.uimg=this.list[0].uimg
			})
            .finally((f)=>{
            	
            })
            
            let data2 = {'uid':this.uid}
			this.$http.post('/api/collection/collectCount',data2)
            .then((res)=>{
		    	this.menus = res.data[0].menus
		    	console.log(res.data)
			})
            .finally((f)=>{
            	
            })
	    }
	}
</script>

<style scoped="">
	.head{
		width: 100%;
		height: 12vw;
		line-height: 12vw;
		background-color: #c93756;
		text-align: center;
		color: white;
		font-weight: bold;
		font-size: 20px;
		z-index: 9;
	}
	.userInfo{
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		padding: 15px 15px;
		border-bottom: 10px solid #f2f2f2;
	}
	.headImg{
		display: inline-block;
		width: 70px;
		height: 70px;
		border: 2px solid #C93756;
		border-radius: 50px;
		overflow: hidden;
		float: left;
	}
	.headImg img{
		width: 100%;
	}
	.logReg{
		line-height: 70px;
		float: left;
		margin-left: 20px;
		font-size: 18px;
		font-weight: bold;
	}
	.logReg img{
		margin-top: -20px;
	}
	.property{
		padding: 4px 0;
		box-sizing: border-box;
		background-color: white;
		border-bottom: 10px solid #f2f2f2;
	}
	.property li{
		width: 49%;
		display: inline-block;
	}
	.property li:first-of-type{
		border-right: 1px solid #F2F2F2;
	}
	.property li p:first-child{
		font-size: 15px;
		line-height: 26px;
	}
	.property li p:last-child{
		font-size: 12px;
		color: #999999;
	}
	.property img{
		vertical-align: text-bottom;
		margin-right: 3px;
	}
	.myOption li{
		box-sizing: border-box;
		width: 100%;
		padding: 10px 0 9px 15px;
		text-align: left;
		border-bottom: 1px solid #dedede;
		background-color: white;
	}
	.myOption li a{
		font-size: 15px;
		line-height: 33px;
		width: 100%;
		display: inline-block;
	}
	.myOption .fa{
		margin-right: 5px;
	}
	.outLogin{
		display: block;
		width: 100%;
		line-height: 55px;
		font-size: 15px;
		margin-top: 20px;
		background-color: #C93756;
		color: white;
		margin-bottom: 70px;
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
</style>