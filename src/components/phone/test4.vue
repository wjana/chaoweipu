<template>
	<main>
		<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm loginFrom">
			 <h2>登陆</h2>
			 <el-form-item >
			  <el-input placeholder="账号" v-model="ruleForm.userName"></el-input>
			 </el-form-item>
			 <el-form-item>
			  <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
			 </el-form-item>
			 <div class="clear">
			  <span class="lf" style="color:#0489cc;">帮助</span>
			  <div class="rt">
			   <el-checkbox>一周内自动登录</el-checkbox>
			   <span @click="clearCookie">忘记密码？</span>
			  </div>
			 </div>
			 <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
		</el-form>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				ruleForm: {
				    userName: '', //用户名
				    password: '' //密码
			   	},
			}
		},
   		methods: {
        	//点击登录调用方法
		  	submitForm(formName) {
		    	//保存的账号
			    var name=this.ruleForm.userName;
			    //保存的密码
			    var pass=this.ruleForm.password;
			    if(name==''||name==null){
				    alert("请输入正确的用户名");
				    return
			    }else if(pass==''||pass==null) {
			     	alert("请输入正确的密码");
			     	return
			    }
			    //判断复选框是否被勾选 勾选则调用配置cookie方法
			    if(this.checked=true){
			      	//传入账号名，密码，和保存天数3个参数
			     	this.setCookie(name,pass,7);
			    }
			    //接口
			    var url='login';
			    this.$http.post(url,this.ruleForm,{emulateJSON:true})
			    .then(res=>{
			      	if(res.body=="fail"){
			       		alert("用户名或密码错误,请重新输入");
			       		this.ruleForm.userName='';
			       		this.ruleForm.password='';
			       		return
			      	} else{
			      		alert("登陆成功！")
			       		this.$router.push("/index")
			      	}
		   		});
		   	},
		   	//设置cookie
		 	setCookie(c_name,c_pwd,exdays) {
			  	var exdate=new Date();//获取时间
			  	exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
			  	//字符串拼接cookie
			  	window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
			  	window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
		 	},
		 	//读取cookie
		 	getCookie:function () {
		  		if (document.cookie.length>0) {
		   			var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
				   	for(var i=0;i<arr.length;i++){
					    var arr2=arr[i].split('=');//再次切割
					    //判断查找相对应的值
					    if(arr2[0]=='userName'){
					     	this.ruleForm.userName=arr2[1];//保存到保存数据的地方
					    }else if(arr2[0]=='userPwd'){
					     	this.ruleForm.password=arr2[1];
					    }
			   		}
		  		}
			},
		 	//清除cookie
		 	clearCookie:function () {
		  		this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
		 	}
       	},
       	mounted(){
	    	this.getCookie()
	    }
	}
</script>

<style scoped="">
</style>


<!--<template>
	<main>
		<div class="login">
			
			<img src="../../../static/img/logo.jpg"/>
            <input type="text" placeholder="请输入手机号" v-model="uid"><br />
            <input type="password" placeholder="请输入密码" v-model="passwd"><br />
            
            <button class="ok" @click="login()">登录</button>
            <div class="reg">
            	<span>还没账号？</span>
            	<router-link to="/register">去注册>></router-link>
            </div>
            
        </div>
        
	</main>
</template>

<script>
	export default{
		data(){
			return{
				uid: '',
				passwd:'',
			}
		},
		methods:{
		    login() {
		    	function codeVerification(phone){
				    let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
				    return phoneCodeVerification.test(phone);
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
			}
		}
	}
</script>

<style scoped="">
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
		line-height: 42px;
		border-radius: 5px;
		margin-top: 15px;
		font-size: 16px;
	}
	.reg{
		font-size: 14px;
		margin-top: 20px;
		text-align: right;
	}
</style>-->