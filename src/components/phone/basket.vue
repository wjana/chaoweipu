<template>
	<main>
		<div class="head">
			菜篮
			<div class="change" @click="change()">
				<span v-show="c1">管理</span>
				<span v-show="c2">完成</span>
			</div>
			
		</div>
		<ul class="foot">
			<li>
				<router-link to="/index"><i class="fa fa-square" aria-hidden="true"></i>首页</router-link>
			</li>
			<li>
				<router-link to="/type"><i class="fa fa-bars" aria-hidden="true"></i>菜单</router-link>
			</li>
			<li class="active">
				<router-link to="/basket"><i class="fa fa-shopping-basket" aria-hidden="true"></i>菜篮子</router-link>
			</li>
			<li>
				<router-link to="/my"><i class="fa fa-user-o" aria-hidden="true"></i>我的</router-link>
			</li>
		</ul>
		<ul class="buyList">
			<li>
				<span>商品</span>
				<span>单价</span>
				<span>数量</span>
			</li>
			<li v-for="(item,index) in list">
				<input @click="choose(index)" type="checkbox" name="choose" class="ch" value="" />
				<img :src="item.pimg"/>
				<span>
					{{item.pname}}
				</span>
				<span>{{item.price}}</span>
				<span class="">
					<button @click="minus(index)"><i class="fa fa-minus" aria-hidden="true"></i></button>
					{{item.pnum}}
					<button @click="plus(index)"><i class="fa fa-plus" aria-hidden="true"></i></button>
				</span>
			</li>
		</ul>
		<div class="bottomOption">
			<span class="all"><input type="checkbox" @click="all()" name="" id="all" value="" />全选</span>
			<span class="money" v-show="ok"><img src="../../../static/img/钱钱.png" alt="" />{{money}}</span>
			<button class="tijiao" v-show="ok" @click="buy()">提交订单</button>
			<button class="del" v-show="no" @click="del()">删除</button>
		</div>
	</main>
</template>

<script>
	export default{
		inject:['reload'],
		data(){
			return{
				list:[],
				money:0,
				show:false,
				c1:true,
				c2:false,
				checkedBox:'',
				ok:true,
				no:false,
				chosedList:[],
				orderList:[]
			}
		},
		methods:{
			minus(i){
				if(this.list[i].pnum>1)
					{
						this.list[i].pnum--
						for(var j in this.chosedList){
							if (this.list[i].pid==this.chosedList[j]){
								this.money=parseFloat(this.money)-1*this.list[i].price
								this.money=this.money.toFixed(2)
							}
						}
					}
				else this.list[i].pnum=1
				let data = {'pnum':this.list[i].pnum, 'pid':this.list[i].pid}
	            this.$http.post('/api/shopCar/updatePnum',data)
	            .then((res)=>{
	            	
	            })
	            .finally((f)=>{
					
	            })
				
			},
			plus(i){
				this.list[i].pnum++
				for(var j in this.chosedList){
					if (this.list[i].pid==this.chosedList[j]){
						this.money=parseFloat(this.money)+1*this.list[i].price
						this.money=this.money.toFixed(2)
					}
				}
				let data = {'pnum':this.list[i].pnum, 'pid':this.list[i].pid}
	            this.$http.post('/api/shopCar/updatePnum',data)
	            .then((res)=>{
	                
	            })
	            .finally((f)=>{
					
	            })
			},
			change(){
				this.c1=!this.c1
				this.c2=!this.c2
				this.show=!this.show
				this.ok=!this.ok
				this.no=!this.no
			},
			choose(i){
				var m = parseFloat(this.money)
				$('#all')[0].checked=false
//				console.log(this.chosedList.indexOf(this.list[i].pid),this.list[i].pid)
				if(this.chosedList.indexOf(this.list[i].pid)===-1){
					this.chosedList.push(this.list[i].pid)
					this.money=this.list[i].pnum*this.list[i].price+m
					this.money=this.money.toFixed(2)
				}
				else{
					this.chosedList.splice(this.chosedList.indexOf(this.list[i].pid),1)
					this.money=m-this.list[i].pnum*this.list[i].price
					this.money=this.money.toFixed(2)
				}
				
//				console.log(this.chosedList)
			},
			all(){
				if(this.chosedList.length>=this.list.length){
					for(var i=0;i<$('.ch').length;i++){
						$('.ch')[i].checked=false
					}
					this.chosedList=[]
					this.money=0
				}
				else{
					for(var i=0;i<$('.ch').length;i++){
						$('.ch')[i].checked=true
					}
					for(var i in this.list){
						if(this.chosedList.indexOf(this.list[i].pid)===-1){
							this.chosedList.push(this.list[i].pid)
						}
//						console.log(this.chosedList)
					}
					var m =0
	                for(var i in this.chosedList){
	                	this.money=this.list[i].pnum*this.list[i].price+m
						m = this.money
					}
				}
				this.money=this.money.toFixed(2)
			},
			del(){
				for(var i=0;i<$('.ch').length;i++ ){
					if($('.ch')[i].checked==true){
//						console.log(this.list[i])
						let data = {'pid':this.list[i].pid}
//						console.log(data)
			            this.$http.post('/api/shopCar/deleteProduct',data)
			            .then((res)=>{
//			                console.log('删除')
			                
			            })
			            .finally((f)=>{
							this.$router.go(0)
			            })
					}
				}
			},
			buy(){
//				this.$router.push({path: '/confirm'})
				for(var i in this.chosedList){
					for(var j in this.list){
						if(this.chosedList[i].indexOf(this.list[j].pid)!=-1){
							this.orderList.push({pid:this.chosedList[i],pname:this.list[j].pname,pimg:this.list[j].pimg,pnum:this.list[j].pnum,price:this.list[j].price,weight:this.list[j].weight})
						}
					}
				}
//				console.log(this.list)
				console.log(this.orderList)
//				this.$router.push({name: 'confirm',params:{orderList:this.orderList}})
				const info = this.orderList
	          	localStorage.setItem('order', JSON.stringify(info));
//				var data1 = JSON.parse(localStorage.getItem('order'));
//	 			console.log(data1)
	 			if(this.orderList.length!=0){
	 				this.$router.push("confirm")
//					console.log(1)
	 			}
	 			
			}
		},
		mounted(){
			this.cookies.getCookie()
	    	this.uid=this.cookies.getCookie()[0]
	    	
	    	this.chosedList=[]
	    	
			let data = {'uid':this.uid}
            this.$http.post('/api/shopCar/searchShopCar',data)
            .then((res)=>{
                /*接口的传值是(-1,商品不存在)*/
                if(res.data == -1) {
					this.$toast({
			          	message: '购物车空空',
			          	position: 'center',
						duration: 1500
			        })
                }else {
                	this.list=res.data
                }
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
		font-size: 18px;
	}
	.head .change{
		position: absolute;
		right: 15px;
		top: 0;
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
	.buyList{
		width: 100%;
		padding-bottom: 95px;
	}
	.buyList li{
		width: 100%;
		border-bottom: 1px solid #F2F2F2;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
	}
	.buyList li img{
		width: 20vw;
		height: 20vw;
	}
	.buyList li span{
		display: inline-block;
		width: 20%;
	}
	.buyList button{
		border: none;
		color: #C93756;
		outline: none;
	}
	.buyList li:first-of-type{
		color: #999999;
	}
	.buyList li:first-of-type span:first-of-type{
		padding-left: 30vw;
	}
	.bottomOption{
		width: 100%;
		line-height: 40px;
		position: fixed;
		bottom: 54px;
		border-top: 1px solid #CCCCCC;
	}
	.all{
		float: left;
		font-weight: bold;
		padding-left: 15px;
	}
	.money{
		color: #C93756;
	}
	.money img{
		vertical-align: text-bottom;
		margin-right: 3px;
	}
	.bottomOption{
		background-color: white;
	}
	.bottomOption .tijiao{
		width: 30vw;
		height: 40px;
		border: none;
		outline: none;
		background-color: #C93756;
		float: right;
		color: white;
	}
	.bottomOption .del{
		width: 15vw;
		height: 30px;
		margin: 0 28px;
		margin-top: 5px;
		border: 1px solid #C93756;
		border-radius: 50px;
		outline: none;
		background-color: white;
		float: right;
		color: #C93756;
	}
</style>