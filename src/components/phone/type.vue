<template>
	<main>
		<div class="head">
			菜谱分类
		</div>
		<ul class="foot">
			<li>
				<router-link to="/index"><i class="fa fa-square" aria-hidden="true"></i>首页</router-link>
			</li>
			<li class="active">
				<router-link to="/type"><i class="fa fa-bars" aria-hidden="true"></i>菜单</router-link>
			</li>
			<li>
				<router-link to="/basket"><i class="fa fa-shopping-basket" aria-hidden="true"></i>菜篮子</router-link>
			</li>
			<li>
				<router-link to="/my"><i class="fa fa-user-o" aria-hidden="true"></i>我的</router-link>
			</li>
		</ul>
		<el-tabs v-model="a" @tab-click="click" :tab-position="tabPosition" style="z-index: 9;">
		    <el-tab-pane name="特色小吃" >
		    	<span slot="label"><img src="../../../static/img/小吃.png"/>特色小吃</span>
		    	<ul class="foodList">
		    		<li v-for="(item,index) in list" @click="pick(index)">
		    			<router-link to="/type">
		    				<img :src="item.cimg"/>
		    				<p>{{item.cname}}</p>
		    			</router-link>
		    		</li>
		    	</ul>
		    </el-tab-pane>
		    <el-tab-pane name="糕饼类">
		    	<span slot="label"><img src="../../../static/img/糕点.png"/>糕饼类</span>
		    	<ul class="foodList">
		    		<li v-for="(item,index) in list" @click="pick(index)">
		    			<router-link to="/type">
		    				<img :src="item.cimg"/>
		    				<p>{{item.cname}}</p>
		    			</router-link>
		    		</li>
		    	</ul>
		    </el-tab-pane>
		    <el-tab-pane name="粿类">
		    	<span slot="label"><img src="../../../static/img/粿.png"/>粿类</span>
		    	<ul class="foodList">
		    		<li v-for="(item,index) in list" @click="pick(index)">
		    			<router-link to="/type">
		    				<img :src="item.cimg"/>
		    				<p>{{item.cname}}</p>
		    			</router-link>
		    		</li>
		    	</ul>
		    </el-tab-pane>
		    <el-tab-pane name="烙类">
		    	<span slot="label"><img src="../../../static/img/烙.png"/>烙类</span>
		    	<ul class="foodList">
		    		<li v-for="(item,index) in list" @click="pick(index)">
		    			<router-link to="/type">
		    				<img :src="item.cimg"/>
		    				<p>{{item.cname}}</p>
		    			</router-link>
		    		</li>
		    	</ul>
		    </el-tab-pane>
		    <el-tab-pane name="甜点类">
		    	<span slot="label"><img src="../../../static/img/甜点.png"/>甜点类</span>
		    	<ul class="foodList">
		    		<li v-for="(item,index) in list" @click="pick(index)">
		    			<router-link to="/type">
		    				<img :src="item.cimg"/>
		    				<p>{{item.cname}}</p>
		    			</router-link>
		    		</li>
		    	</ul>
		    </el-tab-pane>
		    <el-tab-pane name="油炸饼">
		    	<span slot="label"><img src="../../../static/img/炸.png"/>油炸饼</span>
		    	<ul class="foodList">
		    		<li v-for="(item,index) in list" @click="pick(index)">
		    			<router-link to="/type">
		    				<img :src="item.cimg"/>
		    				<p>{{item.cname}}</p>
		    			</router-link>
		    		</li>
		    	</ul>
		    </el-tab-pane>
		    <el-tab-pane name="手工类">
		    	<span slot="label"><img src="../../../static/img/手工类.png"/>手工类</span>
		    	<ul class="foodList">
		    		<li v-for="(item,index) in list" @click="pick(index)">
		    			<router-link to="/type">
		    				<img :src="item.cimg"/>
		    				<p>{{item.cname}}</p>
		    			</router-link>
		    		</li>
		    	</ul>
		    </el-tab-pane>
		    <el-tab-pane name="肉脯类">
		    	<span slot="label"><img src="../../../static/img/肉脯.png"/>肉脯类</span>
		    	<ul class="foodList">
		    		<li v-for="(item,index) in list" @click="pick(index)">
		    			<router-link to="/type">
		    				<img :src="item.cimg"/>
		    				<p>{{item.cname}}</p>
		    			</router-link>
		    		</li>
		    	</ul>
		    </el-tab-pane>
		</el-tabs>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				tabPosition: 'left',
				num:0,
				tabs:[],
				types:[],
				a:'特色小吃',
				list:[],
				cid:''
			}
		},
		methods:{
			click(tab, event){
				console.log(this.a)
				let data = {'ctype': this.a}
				this.$http.post('/api/menu/searchCtype',data)
		        .then((res)=>{
		        	this.list=res.data
		        	console.log(this.list)
		        })
		        .finally((f)=>{
					
		        })
			},
			pick(i){
				console.log(this.list[i])
				this.cid=this.list[i].cid
				this.$router.push({name: 'food',params:{cid:this.cid}})
			}
		},
		mounted(){
			let data = {'ctype':this.a}
			console.log(data)
			this.$http.post('/api/menu/searchCtype',data)
            .then((res)=>{
            	this.list=res.data
            })
            .finally((f)=>{
				
            })
            
		}
	}
</script>

<style scoped="" lang="scss">
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
		position: fixed;
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
		z-index: 5;
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
	.foodList{
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
		padding-right: 10px;
	}
	.foodList li{
		width: 25%;
		border: 1px solid #F2F2F2;
		margin: 5px 3px;
		overflow: hidden;
		border-radius: 10px;
	}
	.foodList li p{
		line-height: 2;
		font-size: 14px;
	}
	.foodList li img{
		width: 100%;
	}
	.left .active{
		border-right: 1px solid #C93756;
	}
	/deep/ .el-tabs{
		padding-top: 13vw;
		padding-bottom: 13vw;
		overflow: hidden;
	}
	/deep/ .el-tabs__item.is-active{
		color: #C93756;
	}
	/deep/ .el-tabs__active-bar{
		background-color: #C93756;
	}
	/deep/ .el-tabs__item{
		height: auto;
		text-align: center;
		line-height: 37px;
	}
	/deep/ .el-tabs__item i{
		display: block;
	}
	/deep/ .el-tabs__item img{
		display: block;
	}
	/deep/ .el-tabs--left .el-tabs__item.is-left {
	    text-align: left !important;
	}
	/deep/ .el-tabs--left .el-tabs__nav.is-left{
		transform: none !important;
	}
	/deep/ .el-tabs__header.is-left{
		height: auto !important;
		max-height: calc(100vh - 13vw - 55px);
		position: fixed;
		overflow-x: hidden;
	    overflow-y: scroll;
	    z-index: 9;
	    background-color: white;
	}
	/deep/ .el-tabs__content{
	    position: relative;
	    overflow-x: hidden;
	    overflow-y: scroll;
	    padding-bottom: 14vw;
	    padding-left: 100px;		
	}
	/deep/ .el-tabs__nav-wrap.is-left{
		width: 97%;
	}
</style>