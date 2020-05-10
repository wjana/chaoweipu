<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			我的帖子
			<span></span>
		</div>
		<mt-navbar v-model="selected">
		  	<mt-tab-item id="1">待审核</mt-tab-item>
		  	<mt-tab-item id="2">已通过</mt-tab-item>
		</mt-navbar>
		
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  	<mt-tab-container-item id="1">
		    	<mt-cell v-for="(item,index) in List1">
		    		<div @click="unex(index)">
		    			<el-row :gutter="20">
						  <el-col :span="6"><img :src="item.cimg"/></el-col>
						  <el-col :span="10" class="t">{{item.cname}}</el-col>
						  <el-col :span="8" class="t">状态：{{item.examine}}</el-col>
						</el-row>
		    		</div>
		    	</mt-cell>
		    	<p v-if="a">您还没有相关的帖子，快去发表吧！</p>
		  	</mt-tab-container-item>
		  	<mt-tab-container-item id="2">
		    	<mt-cell v-for="(item,index) in List2">
		    		<div @click="ex(index)" >
		    			<el-row :gutter="20">
						  <el-col :span="6"><img :src="item.cimg"/></el-col>
						  <el-col :span="9" class="t">{{item.cname}}</el-col>
						  <el-col :span="9" class="t">收藏数：{{item.collect}}</el-col>
						</el-row>
		    		</div>
		    	</mt-cell>
		    	<p v-if="b">您还没有相关的帖子，快去发表吧！</p>
		  	</mt-tab-container-item>
		</mt-tab-container>
		
	</main>
</template>

<script>
	export default{
		data(){
			return{
				selected: '1',
				userList:[],
				List1:[],
				List2:[],
				a:false,
				b:false,
			}
		},
		methods:{
			back(){
//				this.$router.go(-1)
				this.$router.push('my')
			},
			unex(i){
				this.$router.push({name: 'food',params:{cid:this.List1[i].cid,show:'true'}})
			},
			ex(i){
				this.$router.push({name: 'food',params:{cid:this.List2[i].cid}})
			},
		},
		mounted(){
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			
			let data1 = {'cauthor':this.uid,'examine':'未审核'}
			let data2 = {'cauthor':this.uid,'examine':'审核通过'}
			this.$http.post('/api/menu/searchExamine',data1)
            .then((res)=>{
            	if(res.data==-1){
            		this.a=true
            	}else{
            		this.List1 = res.data
		    		console.log(this.List1)
            	}
		    	
			})
            this.$http.post('/api/menu/searchExamine',data2)
            .then((res)=>{
		    	if(res.data==-1){
            		this.b=true
            	}else{
            		this.List2 = res.data
		    		console.log(this.List2)
            	}
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
	/deep/ .mint-navbar{
		position: fixed;
		top: 12vw;
		z-index: 9;
    	width: 100%;
	}
	/deep/ .mint-tab-container{
		padding-top: 27vw;
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
	.t{
		margin-top: 5%;
	}
	/deep/ .mint-cell img {
	    vertical-align: bottom;
	    width: 100%;
	}
</style>