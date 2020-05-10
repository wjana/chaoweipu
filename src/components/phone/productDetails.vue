<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			<router-link to="/index"><img src="../../../static/img/logo.png"/></router-link>
		</div>
		<div class="proImg">
			<img :src="productList.pimg"/>
		</div>
		<div class="proPrice">
			<span><img src="../../../static/img/钱钱.png" alt="" width="25px" />{{productList.price}}</span>
			<span class="stock"><img src="../../../static/img/库存.png"/>库存：{{productList.stock}}</span>
		</div>
		<div class="info">
			<div class="proDes">
				<p><img src="../../../static/img/规格.png"/>规格：<img src="../../../static/img/钱钱.png" alt="" />{{productList.price}}/{{productList.weight}}</p>
				<p>{{productList.pinfo}}</p>
			</div>
			<div class="comment">
				<img src="../../../static/img/评论.png"/>
				<span class="comTitle">评价</span>
				<section v-for="(item,index) in list">
					<p>
						<img :src="item.img" width="40px"/>
						<span>{{item.uid}}</span>
						<span class="time">{{item.time}}</span>
					</p>
					<p class="text">{{item.evaluation}}</p> 
				</section>
				<section class="empty" v-if="show">
					暂无评价！
				</section>
			</div>
		</div>
		<div class="changeNum">
			<router-link to="/basket" class="car"><i class="fa fa-shopping-basket" aria-hidden="true"></i>菜篮子</router-link>
			<button @click="addCar()" :disabled="empty">{{msg}}</button>
		</div>
	</main>
</template>

<script>
	let moment = require("moment");
	export default{
		data(){
			return{
				productList:[],
				list:[],
				uid:'',
				carNum:0,
				show:false,
				empty:false,
				msg:'加入菜篮'
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			addCar(){
				console.log(this.productList)
				let data = {'uid':this.uid,'pid':this.productList.pid,'pnum':parseInt(1)}
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
                        let data2 = {'pid':this.productList.pid}
			            this.$http.post('/api/shopCar/searchPid',data2)
			            .then((res)=>{
			                this.carNum=res.data[0].pnum
			                this.carNum++
				            console.log(this.carNum)
							let data2 = {'pnum':this.carNum, 'pid':this.productList.pid}
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
		},
		mounted(){
			this.productList=this.$route.params.productList
            console.log(this.$route.params.productList)
            
            if(this.productList.stock==0){
            	this.empty=true
            	this.msg='缺货'
            }
            
            this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
            
            let data1 = {'pid':this.productList.pid}
			this.$http.post('/api/evaluate/searchPid',data1)
            .then((res)=>{
            	if(res.data != -1){
            		this.list=res.data
            		console.log(this.list)
            		for(let i in this.list){
            			this.list[i].time=moment(this.list[i].time).format('YYYY-MM-DD HH:mm:ss')
            		}
            	}else{
            		this.show=true
            	}
		    })
            .finally((f)=>{
            	
            })
            
		}
	}
</script>

<style scoped="" lang="scss">
	.head{
		padding: 5px 15px;
		text-align: left;
		border-bottom: 1px solid #F2F2F2;
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 9;
		background-color: white;
		width: 100%;
		i{
			margin-right: 15px;
		}
	}
	.proImg{
		width: 100%;
		padding-top: 15vw;
		img{
			width: 100%;
		}
	}
	.proPrice{
		background-color: #C93756;
		padding: 8px 15px;
		font-size: 24px;
		color: white;
		text-align: left;
		.stock{
			float: right;
			font-size: 18px;
			line-height: 1.6;
			img{
				position: relative;
				top: -3px;
				margin-right: 3px;
				
			}
		}
	}
	.info{
		padding: 0 15px;
		text-align: justify;
		margin-bottom: 20px;
		overflow: hidden;
		.proDes{
			img{
				vertical-align: text-top;
				margin-right: 3px;
			}
			p{
				margin: 10px 0;
			}
		}
		.comment{
			margin-top: 20px;
			.comTitle{
				color: #1296db;
				
			}
			section{
				margin: 15px 0;
				border-bottom: 1px dashed #DEB887;
				p{
					padding: 5px 0;
					position: relative;
					.time{
						position: absolute;
						right: 0;
						color: #DEB887;
						line-height: 40px;
					}
				}
				.text{
					padding-left: 15px;
				}
			}
		}
	}
	.changeNum{
		width: 100%;
		border-top: 1px solid #F2F2F2;
		background-color: white;
		text-align: right;
		position: fixed;
		bottom: 0;
		button{
			padding: 10px 20px;
			color: white;
			background-color: #C93756;
			font-size: 15px;
		}
		.car{
			color: #C93756;
			background-color: white;
			margin-right: 15px;
			i{
				margin-right: 3px;
			}
		}
	}
	.empty{
		padding: 10px 0;
		text-align: center;
		color: #F0B9C8;
	}
	
</style>