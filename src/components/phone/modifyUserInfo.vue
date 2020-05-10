<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			我的信息
			<span></span>
		</div>
		<div class="con">
			<div class="base">
				<p class="yh">用户ID:<span>{{uid}}</span></p>
				<h4>基本信息:</h4>
				<div class="modify">
					<div class="mbase">
						<div class="headList">
							<span>选择头像</span>
							<ul class="demo-basic--circle">
						        <li v-for="(item,index) in img" :class="{border:index==bo}" @click="choose(index)"><el-avatar :size="50" :src="item"></el-avatar></li>
							</ul>
						</div>
						<!--<mt-field label="用户ID" :placeholder="uid" type="tel" v-model="phone"></mt-field>-->
						<mt-field label="昵称" :placeholder="uname" v-model="username"></mt-field>
						<mt-field label="性别" class="sex">
							<el-radio v-model="radio" label="男">男</el-radio>
		  					<el-radio v-model="radio" label="女">女</el-radio>
						</mt-field>
						<div class="paypw" @click="change()">
							完成
						</div>
					</div>
					<div class="pw">
						<h4>密码管理:</h4>
						<el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
						  <el-form-item label="密码" prop="pass">
						    <el-input type="password" v-model="ruleForm1.pass" autocomplete="off"></el-input>
						  </el-form-item>
						  <el-form-item label="确认密码" prop="checkPass">
						    <el-input type="password" v-model="ruleForm1.checkPass" autocomplete="off"></el-input>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click="submitForm('ruleForm1')">提交</el-button>
						    <el-button @click="resetForm('ruleForm1')">重置</el-button>
						  </el-form-item>
						</el-form>
					</div>
					<div class="pw">
						<h4>支付密码管理:</h4>
						<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
						  <el-form-item label="密码" prop="pass">
						    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
						  </el-form-item>
						  <el-form-item label="确认密码" prop="checkPass">
						    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
						    <el-button @click="resetForm('ruleForm2')">重置</el-button>
						  </el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
	export default{
		data(){
			//1
			var validatePass1 = (rule, value, callback) => {
		        if (value === '') {
		          	callback(new Error('请输入密码'));
		        }else {
		          	if (this.ruleForm1.checkPass !== '') {
		            	this.$refs.ruleForm1.validateField('checkPass');
		          	}
		          	callback();
		        }
	      	};
	      	var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          	callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm1.pass) {
		          	callback(new Error('两次输入密码不一致!'));
		        } else {
		          	callback();
		        }
		    };
		    //2
		    var validatePass11 = (rule, value, callback) => {
		        if (value === '' || value.length<6) {
		          	callback(new Error('请输入6位数密码'));
		        }else {
		          	if (this.ruleForm2.checkPass !== '') {
		          		this.$refs.ruleForm2.validateField('checkPass');
		          	}
		          	callback();
		        }
	      	};
	      	var validatePass22 = (rule, value, callback) => {
		        if (value === '' || value.length<6) {
		          	callback(new Error('请再次输入6位数密码'));
		        } else if (value !== this.ruleForm2.pass) {
		          	callback(new Error('两次输入密码不一致!'));
		        } else {
		          	callback();
		        }
		    };
			return{
				uid:'',
				list:[],
				username:'',
				password:'',
				value:[],
				uname:'',
				radio:'男',
				uimg:'',
				ruleForm1: {
		          pass: '',
		          checkPass: ''
		        },
		        ruleForm2: {
		          pass: '',
		          checkPass: ''
		        },
		        rules1: {
		          pass: [
		            { validator: validatePass1, trigger: 'blur' }
		          ],
		          checkPass: [
		            { validator: validatePass2, trigger: 'blur' }
		          ]
		        },
		        rules2: {
		          pass: [
		            { validator: validatePass11, trigger: 'blur' }
		          ],
		          checkPass: [
		            { validator: validatePass22, trigger: 'blur' }
		          ]
		        },
		        img:['../../static/img/headimg1.png','../../static/img/headimg2.png','../../static/img/headimg3.png','../../static/img/headimg4.png','../../static/img/headimg5.png','../../static/img/headimg6.png'],
				bo:0
			};
			
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			submitForm(formName) {
				
					this.$refs[formName].validate((valid) => {
			          	if (valid) {
			            	if(formName=='ruleForm1'){
			            		let data3 = {'passwd':this.ruleForm1.pass, 'uid':this.uid}
								this.$http.post('/api/user/updatePw',data3)
					            .then((res)=>{
							    	if(res.status == 200){
						            	this.$toast({
								          	message: '保存成功',
								          	position: 'center',
											duration: 1500
								        })
					                }
							    	/*保存成功之后再跳回地址页*/
				                    setTimeout(function(){
				                        this.$router.push({path: '/modifyUserInfo'})
				                    }.bind(this),1000)
								})
			            	}
			            	if(formName=='ruleForm2'){
								let data4 = {'paypasswd':this.ruleForm2.pass, 'uid':this.uid}
								this.$http.post('/api/user/updatePaypw',data4)
					            .then((res)=>{
							    	if(res.status == 200){
						            	this.$toast({
								          	message: '保存成功',
								          	position: 'center',
											duration: 1500
								        })
						                /*保存成功之后再跳回地址页*/
					                    setTimeout(function(){
					                        this.$router.push({path: '/modifyUserInfo'})
					                    }.bind(this),1000)
					                    
					                }
								})
							}
			          	} else {
	//		            	console.log('error submit!!');
			            	return false;
			          	}
			        });
				
		        
		    },
		    resetForm(formName) {
//		    	console.log(formName)
		        this.$refs[formName].resetFields();
		    },
		    errorHandler() {
	        	return true
	      	},
	      	change(){
      			console.log(this.username,this.radio)
      			if(this.username==''){
      				this.username=this.list[0].uname
      			}
      			//用户ID	用户昵称	用户性别
      			let data2 = {'uimg':this.uimg, 'uname':this.username, 'sex':this.radio, 'uid':this.uid}
				this.$http.post('/api/user/updateBaseInfo',data2)
	            .then((res)=>{
			    	if(res.status == 200){
		            	this.$toast({
				          	message: '保存成功',
				          	position: 'center',
							duration: 1500
				        })
		                /*保存成功之后再跳回地址页*/
	                    setTimeout(function(){
	                        this.$router.push({path: '/modifyUserInfo'})
	                    }.bind(this),1000)
	                    
	                }
				})
	            .finally((f)=>{
	            	
	            })
	      	},
	      	choose(i){
//	      		console.log(this.img[i])
	      		this.bo=i
	      		this.uimg=this.img[i]
	      	}
		},
		mounted(){
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			
			let data1 = {'uid':this.uid}
			this.$http.post('/api/user/searchUid',data1)
            .then((res)=>{
		    	this.list=res.data
		    	console.log(this.list)
		    	this.uname=this.list[0].uname
		    	this.radio=this.list[0].sex
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
	}
	.mbase{
		overflow: hidden;
		padding-bottom: 20px;
	}
	h4{
		text-align: left;
		padding: 10px 15px;
	}
	.headList{
		text-align: left;
		padding: 0 10vw;
	}
	.headList ul{
		padding: 10px 0 5px 0;
	}
	.headList li{
		width: 32%;
		margin-bottom: 5px;
		text-align: center;
	}
	/deep/ .border .el-avatar--circle{
		border: 4px solid #C93756 !important;
		height: 60px !important;
    	width: 60px !important;
	}
	.paypw{
		padding: 5px 0;
		width: 15vw;
		border: 1px solid #C93756;
		border-radius: 5px;
		color: white;
		background-color: #C93756;
		font-size: 14px;
		float: right;
		margin-right: 5vw;
	}
	/deep/ .mint-field-core{
		border: 1px solid #F2F2F2;
		padding-left: 8px;
		height: 40px;
	}
	/deep/ .sex .mint-field-core{
		display: none;
	}
	.el-input{
		width: 70%;
	}
	/deep/ .el-form-item__label{
		text-align: center;
		padding: 0 0 0 12px;
		width: 70px !important;
	}
	/deep/ .el-form-item__content{
		margin-left: 0 !important;
	}
	/deep/ .el-radio__input.is-checked .el-radio__inner{
		border-color: #C93756;
    	background: #C93756;
	}
	/deep/ .el-radio__input.is-checked+.el-radio__label{
		color: #C93756;
	}
	/deep/ .el-button--primary{
		border-color: #C93756;
    	background: #C93756;
	}
	/deep/ .el-button+.el-button:focus{
		color: #C93756;
		border-color: #f0b9c8;
		background-color: #fcf1f4;
	}
	.pw{
		border-top: 10px solid #F2F2F2;
	}
	/deep/ .el-form-item__error{
		left: 3.5vw;
	}
	.yh{
		padding: 15px 15px;
		text-align: left;
		font-weight: bold;
	}
	.yh span{
		font-size: 18px;
		color: #C93756;
		margin-left: 15px;
	}
	/deep/ .mint-cell-wrapper{
		background-image: none;
	}
	
</style>