<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			充值中心
			<span></span>
		</div>
		<section class="info">
			<p class="">当前账号：<span>{{uid}}</span></p>
			<p class="">余额：<img src="../../../static/img/钱钱.png" alt="" /><span>{{this.money}}</span></p>
		</section>
		<section class="number">
			<div class="money">
				充值金额：
				<p class="btn">
					<span class="minus btns l" @click="minus()">-</span>
					<input id="in" class="l" type="text" v-model="n" @input="search()" />
					<span class="plus btns l" @click="plus()">+</span>
				</p>
			</div>
			<p>充值币数量：<img src="../../../static/img/钱钱.png" alt="" /><span>{{msg}}</span></p>
		</section>
		<ul class="type">
			<li class="ch">选择支付方式</li>
			<li class="ty">
				<img src="../../../static/img/支付宝.png"/>   
				支付宝
				<input type="radio" value="" checked="checked" />
			</li>
		</ul>
		<section class="pay" @click="pay()">
			立即支付
		</section>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				msg:10,
				n:10,
				uid:'',
				money:0,
				paypasswd:""
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			minus(){
				this.n--
				if(this.n<0){
					this.n=0
				}
				this.msg=this.n
			},
			plus(){
				this.n++
				this.msg=this.n
			},
			search(){
				if(this.n==''){
					this.n=''
					this.msg=0
				}else if(this.n<0){
					this.n=0
					this.msg=0
				}else{
					this.msg=this.n
//					this.msg=Math.round(this.msg)
				}
			},
			pay(){
				if(this.n<5){
					this.$toast({
						message: '每次最少也要充值5元哦',
						position: 'center',
						duration: 1500
					});
				}else{
					let data = {'money':parseFloat(this.money)+parseFloat(this.msg), 'uid':this.uid}
					this.$http.post('/api/user/updateMoney',data)
		            .then((res)=>{
		            	if(res.status == 200){
			            	setTimeout(function(){
	                            this.$router.push({path: '/zhifubao'})
	                        }.bind(this),0)
		                }
		            })
		            .finally((f)=>{
						
		            })
				}
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
		    	this.paypasswd=this.list[0].paypasswd
			})
            .finally((f)=>{
            	
            })
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
		z-index: 9;
	}
	.head i{
		position: relative;
		left: 10px;
	}
	.info{
		padding:14vw 13px 0 13px;
	}
	.info p{
		width: 49%;
		display: inline-block;
		line-height: 30px;
		text-align: left;
	}
	.info span{
		color: #999999;
	}
	.info p:last-of-type{
		text-align: right;
	}
	.info p:last-of-type span{
		color: #ff6000;
		margin-right: 5px;
	}
	.number{
		padding: 0 13px;
		text-align: left;
		background-color: white;
		overflow: hidden;
	}
	.money{
		overflow: hidden;
		margin: 20px 0;
	}
	.btn{
		width: 75%;
		vertical-align: middle;
		line-height: 31px;
	    display: flex;
		float: right;
	}
	.btns{
		display: inline-block;
		width: 22%;
		border: 1px solid #B3B3B3;
		text-align: center;
		font-size: 18px;
	}
	.minus{
		border-radius: 20px 0 0 20px;
	}
	.plus{
		border-radius: 0 20px 20px 0;
	}
	.btn input{
		width: 50%;
		height: 31px;
		text-align: center;
		border: 1px solid #B3B3B3;
		border-left: none;
		border-right: none;
		color: #ff6000;
	}
	.number>p{
		padding: 8px 0;
	}
	.number>p span{
		color: #ff6000;
		margin-right: 5px;
	}
	.type{
		margin-top: 10px;
		background-color: white;
	}
	.type li{
		width: 100%;
		padding: 15px 13px;
		box-sizing: border-box;
		border-bottom: 1px solid #B3B3B3;
		text-align: left;
	}
	.ch{
		color: #999999;
	}
	.ty img{
		margin-right: 10px;
	}
	.ty span{
		display: inline-block;
		width: 63px;
		line-height: 26px;
		background-color: #1DDD8F;
		color: white;
		text-align: center;
		border-radius: 20px;
		float: right;
	}
	.ty input{
		background-color: #ff5d5b;
		width: 20px;
		height: 20px;
		float: right;
		margin-top: 6px;
	}
	.pay{
		color: white;
		width: 90%;
		margin: 0 auto;
		margin-top: 40px;
		line-height: 40px;
		background-color: #C93756;
		border-radius: 20px;
	}
</style>