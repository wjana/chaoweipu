<template>
	<main>
		<!--<button @click="register">注册</button>-->
		<div class="register">
			<img src="../../../static/img/logo1.png" width="220px"/>
            <input type="" name="uid" placeholder="请输入手机号码" v-model="uid" /><br />
            <input type="text" placeholder="请输入用户名" v-model="uname"><br />
            <input type="password" placeholder="请输入密码" v-model="passwd"><br />
            <button class="ok" @click="register()">注册</button>
            <div class="log">
            	<router-link to="/login" class="white">返回登录>></router-link>
            </div>
        </div>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				uid:'',
				uname:'',
				passwd:''
			}
		},
		methods:{
			register(){
				function codeVerification(phone){
				    let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
				    return phoneCodeVerification.test(phone);
				}
				
	            if(this.uid == "" || this.uname == "" || this.passwd == ""){
	                this.$toast({
			          	message: '请输入完整 的用户信息',
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
	                let data = {'uid':this.uid,'uname':this.uname,'passwd':this.passwd}
	                this.$http.post('/api/user/addUser',data).then((res)=>{
	                    console.log(res)
	                    /*接口的传值是(-1,该用户已存在)*/
	                    if(res.data == -1) {
	                        this.$toast({
					          	message: '该账号已存在',
					          	position: 'center',
								duration: 1500
					        })
	                        this.uid = ''
	                        this.uname = ''
	                        this.passwd = ''
	                    }
	                    else if(res.status == 200){
	                        this.$toast({
					          	message: '注册成功',
					          	position: 'center',
								duration: 1500
					        })
	                        this.uid = ''
	                        this.uname = ''
	                        this.passwd = ''
	                         /*注册成功之后再跳回登录页*/
	                        setTimeout(function(){
	//                          this.showTishi = false,
	                            this.$router.push({path: '/login'})
	                        }.bind(this),1000)
	                    }
	                })
	            }
	        }
			
		}
	}
</script>

<style scoped="">
	main{
		background: url(../../../static/img/bg_phone1.jpg) no-repeat;
		min-height: 100vh;
		background-size: 100% 100%;
	}
	.register{
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
		line-height: 42px;
		border-radius: 5px;
		margin-top: 15px;
		font-size: 16px;
	}
	.log{
		font-size: 14px;
		margin-top: 20px;
		text-align: right;
	}
	.white{
		color: white;
	}
</style>