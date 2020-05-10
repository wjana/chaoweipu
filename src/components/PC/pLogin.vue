<template>
	<main>
		<div class="login">
			<h2>潮味谱后台管理系统</h2>
			<el-form action="">
				<el-form-item prop="username">
					<el-input type="text" placeholder="请输入账号ID" v-model="mid"></el-input>
				</el-form-item>
	            <el-form-item prop="password">
					<el-input type="password" placeholder="请输入密码" v-model="mpasswd" @keyup.enter.native="login()"></el-input>
				</el-form-item>
	            <!-- `checked` 为 true 或 false -->
            	<el-checkbox v-model="checked">记住密码</el-checkbox>
	            <el-button class="ok" @click="login()">登录</el-button>
	            
            </el-form>
        </div>
    </main>
</template>

<script>
	export default{
		data(){
			return{
				mid: '',
				mpasswd:'',
				checked:false
			}
		},
		methods:{
		    login() {
				
				//判断复选框是否被勾选 勾选则调用配置cookie方法
			    if(this.checked=true){
			      	//传入账号名，密码，和保存天数3个参数
			     	this.cookies.setCookie(this.mid,this.mpasswd,7);
			    }

		        if(this.mid == "" || this.mpasswd == "") {
	                this.$toast({
			          	message: '请输入账号ID或密码',
			          	position: 'center',
						duration: 1500
			        })
	           }else{
	                let data = {'mid':this.mid,'mpasswd':this.mpasswd}
	                this.$http.post('/api/manger/searchMid',data).then((res)=>{
	                    console.log(res)
	                    /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
	                    if(res.data == -1) {
							this.$toast({
					          	message: '该用户不存在',
					          	position: 'center',
								duration: 1500
					        })
	                    }else if(res.data == 0) {
	                        this.$toast({
					          	message: '密码输入错误',
					          	position: 'center',
								duration: 1500
					        })
	                    }else {
	                        this.$toast({
					          	message: '登录成功',
					          	position: 'center',
								duration: 1500
					        })
//	                        setCookie('uid',this.uid,1000*60)
	                        setTimeout(function(){
	                            this.$router.push({path: '/PCIndex'})
	                        }.bind(this),1000)
	                    }
	                })
	            }
			},
			
		},
		//页面加载调用获取cookie值
		mounted(){
	    	this.cookies.getCookie()
	    	this.mid=this.cookies.getCookie()[0]
			this.mpasswd=this.cookies.getCookie()[1];
	    }
	}
</script>

<style scoped="">
	main{
		background: url(../../../static/img/bg1.jpg) no-repeat;
		min-height: 100vh;
		background-size: 100% 100%;
	}
	.login{
		width: 25%;
		float: left;
    	margin: 120px 0 0 100px;
    	background-color: white;
    	padding: 50px 20px;
	}
	h2{
		margin-bottom: 40px;
	}
	/deep/ .el-input{
		width: 80%;
	}
	.ok{
		width: 200px;
		border: none;
		background-color: #c93756;
		color: white;
		height: 42px;
		border-radius: 5px;
		margin: 0 auto;
		margin-top: 40px;
		font-size: 16px;
	}
	.el-checkbox{
		margin-left: 35px;
		width: 100%;
		text-align: left;
	}
	/deep/ .el-checkbox__label{
		font-size: 12px;
	}
	.white{
		color: white;
	}
</style>