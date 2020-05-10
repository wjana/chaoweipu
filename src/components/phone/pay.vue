<template>
	<main>
		<div class="cancel">
			<router-link to="/myOrder">取消支付</router-link>
		</div>
		<div class="goods-psd">
		  	<p class="apply-title">请输入支付密码</p>
		  	<p class="paym">应付金额：<img src="../../../static/img/钱钱.png" alt="" /><span>{{paymoney}}</span></p>
		  	<div class="psd-container">
		   		<input class="psd-input" type="password" readonly v-for="(value,index) in passwordGroup" :key="index" :value="value.value">
		  	</div>
		</div>
		<div class="input-pan">
			<p class="money">
				<span class="mNum">余额：<img src="../../../static/img/钱钱.png" alt="" /><span>{{money}}</span></span>
				<span class="recharge"><router-link to="/charge">去充值</router-link></span>
			</p>
		  	<div class="pan-num" v-for="(value,num) in number" :key="num" @click="inputPsd(value)">{{value}}</div>
		</div>
		<div class="bg" v-if="fshow">
			<div class="payfail">
				<p>支付失败！</p>
				<p class="a"><span @click="re()">重新输入</span><span><router-link to="/myOrder">取消支付</router-link></span></p>
			</div>
		</div>
		<div class="bg" v-if="sshow">	
			<div class="paysuccess">
				<p><i class="fa fa-check-circle" aria-hidden="true"></i>支付成功！</p>
				<!--<p class="b">即将返回个人中心...</p>-->
			</div>
		</div>
		
	</main>
</template>

<script>
	export default{
		data(){
			return{
				popupVisible1: true,
			   	realInput: '',
			   	password: '111',
			   	passwordGroup: [],
			   	number: ['1','2','3','4','5','6','7','8','9','取消','0','删除'],
			   	pasgroup: [],
			   	currentInputIndex:-1,
			   	initPasswordGroup() {
				 	this.passwordGroup=[];
				 	for(var i=0;i<6;i++){
				  		this.passwordGroup.push({
				    		value:null
				  		})
				 	}
				},
				paymoney:0,
				money:0,
				paypasswd:'',
				list:[],
				fshow:false,
				sshow:false,
				oid:''
			}
			
		},
		
		methods:{
			inputPsd(value) {
			   	switch (value) {
			    	case '取消':
				     	this.currentInputIndex = -1
				     	this.pasgroup = []
				     	this.initPasswordGroup()
				     	break;
			    	case '删除':
				     	this.pasgroup.pop()
				     	console.log(this.pasgroup)
				     	// this.currentInputIndex 下标值,删除添加时改变
				     	this.passwordGroup[this.currentInputIndex].value = null
				     	this.currentInputIndex--
				     	console.log(this.passwordGroup)
				     	break;
				    default:
				     	this.pasgroup.push(value)
				     	this.currentInputIndex++
				     	this.passwordGroup[this.currentInputIndex].value = value
		   		}
		  	},
		  	cancel(){
		  		console.log(1)
		  	},
		  	re(){
		  		this.fshow=false
		  		this.currentInputIndex = -1
		     	this.pasgroup = []
		     	this.initPasswordGroup()
		  	}
		},
		watch: {
		  	currentInputIndex(val) {
		   		if(val == 5){
		    		console.log(this.pasgroup)
		    		let pay = this.pasgroup.join('')
//		    		console.log(pay)
		    		//密码错误
		    		if(pay!=this.paypasswd){
		    			this.fshow=true
		    		}else{
		    			//密码正确
		    			this.sshow=true
		    			localStorage.removeItem('order')
		    			let data = {'money':this.money-this.paymoney, 'uid':this.uid}
						console.log(data)
			            this.$http.post('/api/user/updateMoney',data)
			            .then((res)=>{
			            	if(res.status == 200){
				            	let data2 = {'state':'待发货','oid':this.oid}
					            this.$http.post('/api/userOrder/updateState',data2)
					            .then((res)=>{
					            	console.log(this.oid,3333333333)
					            	setTimeout(function(){
			                            this.$router.push({path: '/myOrder'})
			                        }.bind(this),1000)
					            })
			                }
			            })
			            .finally((f)=>{
							
			            })
		    			
		    		}
		    	}else if(val <= -1){
		    		this.currentInputIndex = -1
		   		}
		  	}
		  	
		},
		mounted(){
			this.initPasswordGroup()
			
			if(localStorage.getItem('order')==null){
				this.paymoney=this.$route.params.paym
			}
			this.oid=this.$route.params.oid
			console.log(this.oid)
			const order = JSON.parse(localStorage.getItem('order'));
	 		for(var i in order){
				this.paymoney=order[i].pnum*order[i].price+this.paymoney
			}
			
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			let data1 = {'uid':this.uid}
			this.$http.post('/api/user/searchUid',data1)
            .then((res)=>{
		    	this.list=res.data
		    	console.log(this.list)
		    	this.money=this.list[0].money
		    	this.paypasswd=this.list[0].paypasswd
			})
            .finally((f)=>{
            	
            })
			
			const setHtmlFontSize = () => {
		  		const htmlDom = document.getElementsByTagName('html')[0];
			  	let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
			  	if (htmlWidth >= 750) {
			    	htmlWidth = 750;
			  	}
			  	if (htmlWidth <= 320) {
			    	htmlWidth = 320;
			  	}
			  	htmlDom.style.fontSize = `${htmlWidth / 7.5}px`;
			};
			window.onresize = setHtmlFontSize;
			setHtmlFontSize();//1rem==100px
		}
	}
</script>

<style scoped="">
	main{
		background-color: #f9f9f9;
		min-height: 100vh;
		overflow: hidden;
		position: relative;
	}
	.cancel{
		float: right;
		color: #C93756;
		margin-top: .2rem;
		margin-right: 0.2rem;
	}
	.cancel a{
		color: #C93756;
	}
	.goods-psd{
		background-color: white;
		width: 80%;
		margin: 0 auto;
		padding: 0.8rem 0;
		margin-top: 20vh;
		border-radius: 15px;
	}
	.apply-title{
		font-weight: bold;
	}
	.psd-container{
		margin-top: 0.5rem;
	}
	.psd-container input{
		width: 10%;
		border: .5px solid #ccc;
		padding: 0.2rem 0.1rem;
		text-align: center;
	}
	.input-pan{
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		background-color: white;
		width: 100%;
		position: absolute;
		bottom: 0;
		padding-bottom: 0.2rem;
		max-height: 40vh;
	}
	.pan-num{
		width: 32%;
		padding: .3rem 0;
		border: 1px white solid;
		background-color: #F2F2F2;
	}
	.money{
		width: 100%;
		padding: .2rem;
		position: relative;
	}
	.mNum span{
		color: #C93756;
	}
	.mNum img{
		margin-right: 3px;
	}
	.recharge{
		position: absolute;
		right: 0.2rem;
		
	}
	.recharge a{
		color: #26A2FF;
	}
	.bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		background: rgba(0,0,0,.2);
		height: 100vh;
	}
	.payfail,.paysuccess{
		position: absolute;
		background-color: white;
		top: 35vh;
		left: 14.5vw;
		width: 70%;
		border: 1px solid #26A2FF;
		border-radius: 15px;
		z-index: 5;
	}
	.payfail p{
		padding: 0.5rem 0;
	}
	.payfail .a{
		border-top: 1px solid #26A2FF;
		padding: 0;
	}
	.payfail .a span{
		display: inline-block;
		width: 49%;
		padding: 0.3rem 0;
	}
	.payfail .a span:first-of-type{
		border-right: 1px solid #26A2FF;
	}
	.fa-check-circle{
		display: inline-block;
		color: #26A2FF;
		font-size: 20px;
	}
	.paysuccess p:first-of-type{
		padding: 0.5rem 0 0.2rem 0;
		font-size: 18px;
		font-weight: bold;
	}
	.paysuccess p:last-of-type{
		padding-bottom: 0.5rem;
		font-size: 12px;
	}
	.paym{
		margin-top: 0.1rem;
		font-size: 14px;
	}
	.paym span{
		color: #C93756;
	}
</style>