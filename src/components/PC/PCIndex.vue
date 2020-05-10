<template>
	<el-container>
		<el-header>
			<el-menu
			  	default-active="1"
			  	class="el-menu-demo"
			  	mode="horizontal"
			  	@select="handleSelect"
			  	background-color="#545c64"
			  	text-color="#fff"
			  	active-text-color="#ffd04b">
			  	<span class="a">潮味谱后台管理系统</span>
			  	<el-menu-item index="2" class="fr out" @click="out()"><i class="fa fa-sign-out" aria-hidden="true"></i>退出登录</el-menu-item>
			  	<el-menu-item index="3" class="fr">
			  		<span class="identity"><img src="../../../static/img/管理员.png"/>{{identity}}</span>
			  		<span class="name">{{mname}}</span>
			  	</el-menu-item>
			</el-menu>
		</el-header>
	  	<el-container>
    		<el-aside width="180px">
    			<el-menu
			      	default-active="2"
			      	class="el-menu-vertical-demo"
			      	@open="handleOpen"
			      	@close="handleClose"
			      	background-color="#545c64"
			      	text-color="#fff"
			      	active-text-color="#ffd04b">
			      	<el-menu-item index="/welcome" @click="goTo('/welcome')">
				        <i class="el-icon-setting"></i>
				        <span slot="title">首页</span>
			      	</el-menu-item>
			      	<el-submenu index="1">
      					<template slot="title">
				          	<i class="el-icon-menu"></i>
				          	<span>菜谱管理</span>
				        </template>
				        <el-menu-item-group>
				          	<!--<template slot="title">分组一</template>-->
				          	<el-menu-item index="/menuMan" @click="goTo('/menuMan')">菜谱管理</el-menu-item>
				          	<el-menu-item index="/examine" @click="goTo('/examine')">审核菜谱</el-menu-item>
				        </el-menu-item-group>
					</el-submenu>
					<el-menu-item index="/foodManu" @click="goTo('/foodManu')">
				        <i class="el-icon-food"></i>
				        <span slot="title">食材管理</span>
			      	</el-menu-item>
					<el-menu-item index="/orderMan" @click="goTo('/orderMan')">
				        <i class="el-icon-s-order"></i>
				        <span slot="title">订单管理</span>
			      	</el-menu-item>
					<el-submenu index="2" :disabled="power">
						<template slot="title">
				          	<i class="el-icon-s-custom"></i>
				          	<span>人员管理</span>
				        </template>
				        <el-menu-item-group>
				          	<!--<template slot="title">分组一</template>-->
				          	<el-menu-item index="/userMan" @click="goTo('/userMan')">用户管理</el-menu-item>
				          	<el-menu-item index="/mangerMan" @click="goTo('/mangerMan')">管理员管理</el-menu-item>
				        </el-menu-item-group>
				    </el-submenu>
				    <el-menu-item index="/personalInfo" @click="goTo('/personalInfo')">
				    	<i class="el-icon-postcard"></i>
				        <span slot="title">个人信息</span>
			      	</el-menu-item>
			    </el-menu>
    		</el-aside>
    		<el-main>
    			<router-view></router-view>
    			
    		</el-main>
  		</el-container>
	</el-container>
</template>

<script>
	export default{
		data() {
	      	return {
	      		mid:'',
	      		mname:'',
	      		list:[],
	      		power:true,
	      		identity:''
	      	}
    	},
    	methods: {
	      	handleSelect(key, keyPath) {
	        	console.log(key, keyPath);
	      	},
	      	handleOpen(key, keyPath) {
	        	console.log(key, keyPath);
	      	},
	      	handleClose(key, keyPath) {
	        	console.log(key, keyPath);
	      	},
	      	goTo(path){
	      		this.$router.replace(path);
	      	},
	      	out(){
				this.cookies.clearCookie()
				this.$router.push({path: '/pLogin'})
			}
	    },
	    mounted(){
	    	this.$router.replace('/welcome');
	    	
	    	this.cookies.getCookie()
			this.mid=this.cookies.getCookie()[0]
			
			let data1 = {'mid':this.mid}
			this.$http.post('/api/manger/searchManger',data1)
            .then((res)=>{
		    	this.list=res.data
		    	this.mname=this.list[0].mname
		    	console.log(this.list)
		    	if(this.list[0].power == 1){
		    		this.power=false
		    		this.identity='超级管理员'
		    	}else{
		    		this.power=true
		    		this.identity='普通管理员'
		    	}
			})
            .finally((f)=>{
            	
            })
	    }
	}
</script>

<style scoped="">
	.el-header{
		background-color: #b3c0d1;
		color: #333333;
		text-align: center;
	}
	.a{
		float: left;
		color: white;
		margin-left: 20px;
		line-height: 60px;
	}
	.el-aside{
		background-color: #b3c0d1;
		color: #333333;
		text-align: center;
		overflow-x: hidden;
	}
	.el-main{
		background-color: #e9eef3;
		color: #333333;
		text-align: center;
	}
	.el-container{
		  position: absolute; 
		  width: 100%; 
		  top: 0px ; 
		  left: 0 ; 
		  bottom: 0;
	}
	.el-header{
	  	padding: 0;
	  	z-index: 1000;
	}
	.el-aside li{
		width: 90%;
	}
	.el-header .fr{
	  	float: right;
	}
	.el-aside, .el-main{
	  	padding-top: 60px;
	}
	.el-aside{
	  	background: #545c64;
	}
	.el-aside .el-menu{
	  	border-right: none;
	}
	/deep/ .is-active{
		color: #C93756 !important;
		border-bottom-color: #C93756 !important;
	}
	.identity{
		padding: 3px 5px;
		background-color: white;
		border: 1px solid #C93756;
		border-radius: 10px;
		color: #C93756;
		font-size: 10px;
	}
	.name{
		font-size: 18px;
	}
	.out{
		color: #C93756 !important;
		font-weight: bold;
	}
	.fa-sign-out{
		color: #C93756;
	}
</style>