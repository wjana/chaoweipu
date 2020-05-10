<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			我的信息
			<span></span>
		</div>
		<div class="con">
			<h4>基本信息:</h4>
			<div class="demo-type">
			    <el-avatar :size="80" :src="uimg" @error="errorHandler">
			      	<img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
			    </el-avatar>
			</div>
			<table class="tab" cellspacing="0">
				<tr><td>用户ID</td><td>{{uid}}</td></tr>
				<tr><td>昵称</td><td>{{uname}}</td></tr>
				<tr><td>性别</td><td>{{sex}}</td></tr>
				<tr><td>密码</td><td>***</td></tr>
				<tr><td>支付密码</td><td>***</td></tr>
			</table>
			<router-link to="/modifyUserInfo" class="mo">
				修改
			</router-link>
		</div>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				uid:'',
				list:[],
				uimg:'',
		        uname:'',
		        sex:'',
		        pw:'',
		    }
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			errorHandler() {
	        	return true
	      	},
	      	
		},
		mounted(){
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			
			let data1 = {'uid':this.uid}
			this.$http.post('/api/user/searchUid',data1)
            .then((res)=>{
		    	this.list=res.data
		    	console.log(this.list)
		    	this.uimg=this.list[0].uimg
		    	this.uname=this.list[0].uname
		    	this.sex=this.list[0].sex
		    	this.pw=this.list[0].passwd
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
	.con{
		padding-top: 14vw;
		position: relative;
	}
	.tab{
		border-bottom: 10px solid #f2f2f2;
		padding-bottom: 15px;
	}
	.mo{
		display: block;
		padding: 8px 0;
		width: 50vw;
		border: 1px solid #C93756;
		border-radius: 5px;
		color: white;
		background-color: #C93756;
		font-size: 14px;
		margin: 30px auto;
	}
	.tab{
		width: 100%;
	}
	.tab tr{
		border-bottom: 1px solid #F2F2F2;
	}
	.tab td{
		padding: 15px 0;
	}
	h4{
		text-align: left;
		padding: 10px 15px;
	}
</style>