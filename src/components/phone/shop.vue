<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			市场
			<span></span>
		</div>
		<div class="searchBox">
			<input v-model="msg" v-on:input="change" @keydown.enter="sousuo" type="" name="" id="" value="" placeholder="请输入食材名" />
			<img @click="clear" v-if="show" src="../../../static/img/叉.png"/>
			<button @click="sousuo()">搜索食材</button>
		</div>
		<div class="content">
			<ul class="con">
				<li v-for="(item,index) in list" class="item" @click="product(index)">
					<img :src="item.pimg"/>
					<div class="des">
						<p><span class="pname">{{item.pname}}</span>
							<!--<span class="stock">库存：<span>{{item.stock}}</span></span>-->
						</p>
						<!--<p class="pinfo" :class="{txt:index!=all}">{{item.pinfo}}
							<span v-show="index!=a" class="showT" @click="open(index)">
								<i>查看全部</i>
							</span>
							<span v-show="index==b" class="showT" @click="close(index)">
								<i>收起</i>  
							</span>
						</p>-->
						
						<span class="price"><img src="../../../static/img/钱钱.png" alt="" /><span class="price0">{{item.price}} /<span class="price1">{{item.weight}}</span></span></span>
						<!--<div class="changeNum" @click="addCar(index)">
							<i class="fa fa-shopping-basket" aria-hidden="true"></i>
						</div>-->
					</div>
					<div class="lack" v-if="index==iflack">
						库存不足！
					</div>
				</li>
			</ul>
		</div>
		<div class="basket">
			<router-link to="/basket">
				<i class="fa fa-shopping-basket" aria-hidden="true"></i>
				<span>{{num}}</span>
			</router-link>
		</div>
		<div id="gotop" @click="gotop()">
			<!--<i class="fa fa-angle-double-up" aria-hidden="true"></i>-->
			<img src="../../../static/img/顶部.png"/>
		</div>
	</main>
</template>

<script>
	
	export default{
		data(){
			return{
				num:0,
				list:[],
				carNum:0,
				uid:'',
				msg:'',
				show:false,
				all:-1,
				showTxt:'展开',
				b:'-1',
				a:'-1',
				iflack:-1,
				productList:[]
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			sousuo(){
				let data = {'pname':this.msg}
	            this.$http.post('/api/product/searchPname',data)
	            .then((res)=>{
	                if(res.data == -1) {
						this.$toast({
				          	message: '搜索结果为空',
				          	position: 'center',
							duration: 1500
				        })
	                }else {
	                	this.list=res.data
	                }
	            })
	            .finally((f)=>{
	          	
	            })
			},
			change(){
				console.log(this.msg)
				this.show=true
			},
			clear(){
				this.msg=''
				this.show=false
				this.$http.post('/api/product/search')
	            .then((res)=>{
	                this.list=res.data
	                for(var i in this.list){
	                	if (this.list[i].stock==0){
	                		this.iflack=i
	                		console.log(i)
	                	}
	                }
	            })
	            .finally((f)=>{
        	
	            })
			},
			open(i){
				this.a=i;
				this.b=i;
		        this.all=i;
			},
			close(i){
				this.a=-1;
				this.b=-1;
				this.all=-1;
			},
			addCar(i){
				console.log(this.list[i])
				let data = {'uid':this.uid,'pid':this.list[i].pid,'pnum':parseInt(1)}
	            this.$http.post('/api/shopCar/add',data)
	            .then((res)=>{
	                console.log(res)
                    /*接口的传值是(-1,该商品在购物车已存在)*/
                    if(res.data == -1) {
                        this.$toast({
				          	message: '该食材已添加到菜篮子，加购数量+1',
				          	position: 'center',
							duration: 1500
				        })
                        let data1 = {'pid':this.list[i].pid}
			            this.$http.post('/api/shopCar/searchPid',data1)
			            .then((res)=>{
			                this.carNum=res.data[0].pnum
			                this.carNum++
				            console.log(this.carNum)
							let data2 = {'pnum':this.carNum, 'pid':this.list[i].pid}
				            this.$http.post('/api/shopCar/updatePnum',data2)
				            .then((res)=>{
				                
				            })
			            })
			            .finally((f)=>{
							
			            })
			            
                    }
                    else if(res.status == 200){
                        this.$toast({
				          	message: '添加到菜篮子成功',
				          	position: 'center',
							duration: 1500
				        })
                    }
                })
	            .finally((f)=>{
		            this.$http.post('/api/shopCar/count')
		            .then((res)=>{
		//          	console.log(res.data[0].count)
						this.num=res.data[0].count
		            })
		            .finally((f)=>{
		            	
		            })	
		        })
	            
			},
			gotop(){
				document.documentElement.scrollTop = document.body.scrollTop = 0;
			},
			product(i){
				this.productList=this.list[i]
				console.log(this.productList)
				this.$router.push({name: 'productDetails',params:{productList:this.productList}})
			}
		},
		mounted(){
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			
			this.$http.post('/api/shopCar/count')
            .then((res)=>{
//          	console.log(res.data[0].count)
				this.num=res.data[0].count
            })
            .finally((f)=>{
            	
            }),
            
            this.$http.post('/api/product/search')
            .then((res)=>{
                this.list=res.data
                console.log(this.list)
                for(var i in this.list){
                	if (this.list[i].stock==0){
                		this.iflack=i
                		console.log(i)
                	}
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
	.content{
		padding:0 12px 50px 12px;
		column-count: 2;
		column-gap: 10px;
	}
	.searchBox{
		margin-top: 15vw;
		display: inline-block;
		border: 1px solid #C93756;
		border-radius: 50px;
		overflow: hidden;
		width: 92%;
		position: relative;
	}
	.searchBox input{
		border: none;
		outline: none;
		padding-left: 10px;
		height: 27px;
		width: 70%;
	}
	.searchBox img{
		position: absolute;
		right: 22vw;
		top: 18%;
	}
	.searchBox button{
		height: 100%;
		background-color: #C93756;
		color: white;
		padding: 5px 10px;
		border-radius: 20px;
		float: right;
		font-size: 13px;
	}
	.con li{
		width: 100%;
		border: 1px solid #eeeeee;
	  	border-radius: 5px;
	  	box-shadow: 2px 2px 5px rgb(0, 0, 0,0.2);
	  	overflow: hidden;
	  	margin-top: 10px;
	  	text-align: left;
	  	position: relative;
	}
	.con li img{
		width: 100%;
	}
	.lack{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		color: red;
		font-weight: 900;
		font-size: 20px;
		text-align: center;
		background: rgba(242,242,242,0.6);
		padding-top: 50%;
		box-sizing: border-box;
	}
	.des{
		padding: 5px 10px;
		font-size: 12px;
	}
	.des p{
		font-size: 14px;
		margin-bottom: 10px;
	}
	.pname{
		font-weight: bold;
		font-size: 16px;
	}
	.stock{
		float: right;
		line-height: 1.6;
	}
	.stock span{
		border: 1px solid #CCCCCC;
		padding: 2px 4px;
	}
	.pinfo{
		position: relative;
	}
	.txt{
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .showT{
    	position: absolute;
    	bottom: 0;
    	right: 0;
    	color: #1685a9;
    	background-color: white;
    	padding-left: 8px;
    }
	.price{
		color: #C93756;
	}
	.price0{
		font-size: 18px;
	}
	.price1{
		font-size: 14px;
	}
	.basket{
		position: fixed;
		bottom: 50px;
		left: 20px;
		font-size: 22px;
		padding: 12px;
		border: 1px solid #999999;
		border-radius: 50%;
		background-color: white;
		z-index: 3;
	}
	.basket a{
		color: #C93756;
	}
	.basket span{
		position: absolute;
		top: -10px;
		right: 0px;
		font-size: 26px;
		font-weight: bold;
		z-index: 5;
		background-color: transparent;
		padding-left: 3px;
	}
	.changeNum{
		display: inline-block;
		float: right;
		color: #C93756;
		padding: 2px 10px;
		font-size: 16px;
	}
	#gotop{
		border-radius: 50%;
		position: fixed;
		bottom: 50px;
		right: 20px;
		background-color: white;
		z-index: 4;
	}
	.con li .price img{
		width: auto;
		vertical-align: top;
	}
</style>