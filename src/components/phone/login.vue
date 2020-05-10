<template>
	<main>
		<div class="login">
			<img src="../../../static/img/logo1.png" width="220px"/>
			<el-form action="">
				<el-form-item prop="username">
					<el-input type="text" placeholder="请输入手机号" v-model="uid"></el-input>
				</el-form-item>
	            <el-form-item prop="password">
					<el-input type="password" placeholder="请输入密码" v-model="passwd" @keyup.enter.native="login()"></el-input>
				</el-form-item>
	            <!-- `checked` 为 true 或 false -->
            	<el-checkbox v-model="checked" class="white">记住密码</el-checkbox>
	            <el-button type="primary" class="ok" @click="login()">登录</el-button>
	            <div class="reg white">
	            	<span>还没账号？</span>
	            	<router-link to="/register" class="white">去注册>></router-link>
	            </div>
            </el-form>
        </div>
    </main>
</template>

<script>
	export default{
		data(){
			return{
				uid: '',
				passwd:'',
				checked:false
			}
		},
		methods:{
		    login() {
		    	function codeVerification(phone){
				    let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
				    return phoneCodeVerification.test(phone);
				}
				
				//判断复选框是否被勾选 勾选则调用配置cookie方法
			    if(this.checked=true){
			      	//传入账号名，密码，和保存天数3个参数
			     	this.cookies.setCookie(this.uid,this.passwd,7);
			    }

		        if(this.uid == "" || this.passwd == "") {
	                this.$toast({
			          	message: '请输入用户名或密码',
			          	position: 'center',
						duration: 1500
			        })
	            }else{
	            	if(!codeVerification(this.uid)){
						this.$toast({
				          	message: '您的手机号码不正确，请重新填写！',
				          	position: 'center',
							duration: 1500
				       })
					    return false;
					}
	                let data = {'uid':this.uid,'passwd':this.passwd}
	                this.$http.post('/api/user/searchUser',data).then((res)=>{
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
	                            this.$router.push({path: '/index'})
	                        }.bind(this),1000)
	                    }
	                })
	            }
			},
			
		},
		//页面加载调用获取cookie值
		mounted(){
	    	this.cookies.getCookie()
	    	this.uid=this.cookies.getCookie()[0]
			this.passwd=this.cookies.getCookie()[1];
	    }
	}
</script>

<style scoped="">
	main{
		background: url(../../../static/img/bg_phone1.jpg) no-repeat;
		min-height: 100vh;
		background-size: 100% 100%;
	}
	.login{
		width: 64%;
		padding: 100px 0;
		margin: 0 auto;
	}
	input{
		width: 100%;
		height: 42px;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding-left: 30px;
		margin-bottom: 9px;
		outline: none;
		box-sizing: border-box;
		font-size: 14px;
	}
	.ok{
		width: 100%;
		border: none;
		background-color: #c93756;
		color: white;
		height: 42px;
		border-radius: 5px;
		margin-top: 15px;
		font-size: 16px;
	}
	.reg{
		font-size: 14px;
		margin-top: 20px;
		text-align: right;
	}
	.el-checkbox{
		float: left;
		margin-top: -10px;
	}
	/deep/ .el-checkbox__label{
		font-size: 12px;
	}
	.white{
		color: white;
	}
</style>