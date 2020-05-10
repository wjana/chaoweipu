<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			编辑菜谱
			<span></span>
		</div>
		<div class="whole">
			<p class="tishi"><span><i>！！！</i>编辑上传，审核通过就可以让其他人都看到哦~加油吧ヾ(◍°∇°◍)ﾉﾞ!!!</span></p>
			<form action="" method="post">
				<div class="uploadTitle upload">
					<p><b>菜谱名称：</b></p>
					<input v-model="title" type="" name="" id="" value="" />
				</div>
				<div class="uploadTitle upload">
					<p><b>菜谱简介：</b></p>
					<input v-model="info" type="" name="" id="" value="" />
				</div>
				<div class="uploadTitle uploadType upload">
					<p><b>菜谱类型：</b></p>
					<ul>
						<li :class="{border:index==b}" v-for="(item,index) in list" @click="chooseType(index)">{{item.ctype}}</li>
					</ul>
				</div>
				<div class="uploadImg upload">
				  	<p><b>成品图：</b></p>
				  	<el-upload
					    class="avatar-uploader"
					    action="http://localhost:8080/api/admin/upload/"
					    :show-file-list="false"
					    :on-success="handleAvatarSuccess"
					    :before-upload="beforeAvatarUpload">
					    <img v-if="imageUrl" :src="imageUrl" class="avatar">
					    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				  	</el-upload>
				</div>
				<div class="uploadMaterial upload">
					<p><b>用料：</b></p>
					<el-form :model="dynamicValidateForm1" ref="dynamicValidateForm1" class="demo-dynamic">
					  	<el-form-item
						    v-for="(material, index) in dynamicValidateForm1.materials"
						    :label="'用料' + parseInt(index+1)"
						    :key="material.key1"
						>
						    <el-input v-model="material.value"></el-input>
							<span>重量：</span><el-input v-model="material.weight"></el-input>
						    <el-button @click.prevent="removeDomain1(material)">删除</el-button>
						</el-form-item>
						<el-form-item>
						    <!--<el-button type="primary" @click="submitForm('dynamicValidateForm1')">提交</el-button>-->
						    <el-button type="primary" @click="addDomain1">新增用料</el-button>
						    <!--<el-button @click="resetForm('dynamicValidateForm1')">重置</el-button>-->
					  	</el-form-item>
					</el-form>
				</div>
				<div class="uploadStep upload">
					<p><b>步骤：</b></p>
					<el-form :model="dynamicValidateForm2" ref="dynamicValidateForm2" class="demo-dynamic">
					  	<el-form-item>
					  		<el-upload
							  action="http://localhost:8080/api/admin/uploadList/"
							  list-type="picture-card"
							  :on-preview="handlePictureCardPreview"
							  :on-remove="handleRemove"
							  :on-success="handleSuccess">
							  <i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible" :append-to-body="true" :close-on-click-modal="false">
							    <img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
					  	</el-form-item>
					  	
					  	<el-form-item
						    v-for="(step, index) in dynamicValidateForm2.steps"
						    :label="'步骤' + parseInt(index+1)"
						    :key="step.key2"
						    :prop="'steps.' + index + '.value'"
						    :rules="{
						      	required: true, message: '步骤不能为空', trigger: 'blur'
						    }"
						    class="mname"
						>
						    <el-input v-model="step.value"></el-input>
						    <!--<el-upload
							    class="avatar-uploader"
							    action="http://localhost:8080/api/admin/upload/"
							    :show-file-list="false"
							    :on-success="handleAvatarSuccess1"
							    :before-upload="beforeAvatarUpload1">
							    <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
							    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						  	</el-upload>-->
						    <el-button @click.prevent="removeDomain2(step)">删除</el-button>
						</el-form-item>
						
						<el-form-item>
						    <!--<el-button type="primary" @click="submitForm('dynamicValidateForm2')">提交</el-button>-->
						    <el-button type="primary" @click="addDomain2">新增步骤</el-button>
						    <el-button type="primary" @click="resetForm('dynamicValidateForm2')">重置</el-button>
					  	</el-form-item>
					</el-form>
				</div>
				
				<p class="ok" @click="ok">确定</p>
			</form>
		</div>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				uid:'',
				list:[],
				cid:'',
				title:'',
				info:'',
				type:'',
				imageUrl: '',
				imgUrl:'',//新地址
				formData: {
		         	imageUrl: '', //提交给后台的地址
		       	},
//		       	imageUrl1: '',
		       	dialogImageUrl: '',
        		dialogVisible: false,
				b:0,
				dynamicValidateForm1: {
		          	materials: [{
		            	value: '',
		            	weight: ''
		          	}]
		        },
				dynamicValidateForm2: {
		          	steps:[{
		          		value: '',
		          		img:''
		          	}]
		       	},
		       	cidList:[],
		       	stepImgList:['../../../static/img/24-2-2.jpg','../../../static/img/24-3.jpg']
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			chooseType(i){
				this.b=i
				this.type=this.list[i].ctype
			},
	      	
			handleAvatarSuccess(res, file) {
	        	this.imageUrl = URL.createObjectURL(file.raw);
	        	this.formData.imageUrl = res.filename;
				console.log(res.url)
				this.imgUrl=res.url
	      	},
	      	beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
	
		        if (!isLt2M) {
		          this.$message.error('上传图片大小不能超过 2MB!');
		        }
		        return isLt2M;
		    },
//		    handleAvatarSuccess1(res, file) {
//	        	this.imageUrl1 = URL.createObjectURL(file.raw);
//	        	this.formData.imageUrl = res.filename;
//				console.log(res.url)
//				this.imgUrl1=res.url
//	      	},
//	      	beforeAvatarUpload1(file) {
//		        const isJPG = file.type === 'image/jpeg';
//		        const isLt2M = file.size / 1024 / 1024 < 2;
//	
//		        if (!isLt2M) {
//		          this.$message.error('上传图片大小不能超过 2MB!');
//		        }
//		        return isLt2M;
//		    },
		    handleRemove(file, fileList) {
	        	console.log(file, fileList);
	      	},
	      	handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		        console.log(file,this.dialogImageUrl,this.dialogVisible)
	      	},
	      	submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
		            	alert('submit!');
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
		    },
	      	resetForm(formName) {
	        	this.$refs[formName].resetFields();
	      	},
	      	removeDomain1(item) {
		        var index = this.dynamicValidateForm1.materials.indexOf(item)
		        if (index !== -1) {
		          	this.dynamicValidateForm1.materials.splice(index, 1)
		        }
	      	},
	      	removeDomain2(item) {
		        var index = this.dynamicValidateForm2.steps.indexOf(item)
		        if (index !== -1) {
		          	this.dynamicValidateForm2.steps.splice(index, 1)
		        }
	      	},
	      	addDomain1() {
		        this.dynamicValidateForm1.materials.push({
		          	value: '',
		          	weight: '',
		          	key1: Date.now()
		        });
	      	},
	      	addDomain2() {
		        this.dynamicValidateForm2.steps.push({
		          	value: '', 
		          	key2: Date.now()
		        });
	      	},
	      	ok(){
	      		
	      		
//	      		console.log(this.title,this.info,this.type,this.imgUrl)
	      		let data1 = {'cid':this.cid,'cname':this.title,'cimg':this.imgUrl,'ctype':this.type,'cauthor':this.uid,'cinfo':this.info,'collect':0,'examine':'未审核'}
	      		this.$http.post('/api/menu/add',data1)
	            .then((res)=>{
	            	for(var i in this.dynamicValidateForm1.materials){
	//	      			console.log(this.dynamicValidateForm1[i].value,this.dynamicValidateForm1[i].weight)
		      			console.log(this.dynamicValidateForm1.materials[i])
		      			let data2 = {'cid':this.cid,'things':this.dynamicValidateForm1.materials[i].value,'weight':this.dynamicValidateForm1.materials[i].weight}
			      		this.$http.post('/api/material/add',data2)
			            .then((res)=>{
			            	
					    })
		      		}
	      			for(var j in this.dynamicValidateForm2.steps){
		      			console.log(this.dynamicValidateForm2.steps[j].value)
		      			let data3 = {'cid':this.cid,'stepNum':parseInt(j)+1,'stepImg':this.stepImgList[j],'stepInfo':this.dynamicValidateForm2.steps[j].value}
			      		this.$http.post('/api/step/add',data3)
			            .then((res)=>{
			            	
					    })
		      		}
	            	this.$toast({
			          	message: '发表成功，请耐心等待审核哦~',
			          	position: 'center',
						duration: 1500
			        })
	            	this.$router.push({ path: '/index' })
			    })
	            
	            
	      	},
			
		},
		mounted(){
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			
			this.id=this.$route.params.cid
            console.log(this.$route.params.cid)
			
			this.$http.post('/api/menu/searchtype')
            .then((res)=>{
            	this.list=res.data
            	this.type=this.list[0].ctype
            	
            })
            .finally((f)=>{
				
            })
            this.$http.post('/api/menu/searchAll')
            .then((res)=>{
            	for(var i in res.data){
                	this.cidList[i]=res.data[i].cid.substr(1)
              }
                this.cid=parseInt(this.cidList.sort().pop())+1
                this.cid='c'+String(this.cid).padStart(5,'0')
            	console.log(this.cid)
            })
            .finally((f)=>{
//          	
            })
		}
	}
</script>

<style scoped="">
	main{
		background-color: #fafafa;
		min-height: 100vh;
		overflow: hidden;
	}
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
	.whole{
		padding: 0 13px;
		padding-top: 12vw;
		text-align: left;
		margin-bottom: 50px;
	}
	.tishi{
		margin: 10px 0;
		background-color: #F0C78A;
		overflow: hidden;
	}
	.tishi span{
		color: black;
		display: inline-block;
		white-space: nowrap;
		animation: myslide 8s linear infinite normal;
		font-size: 14px;
	}
	@keyframes myslide
	{
		from {transform: translateX(100%);}
		to {transform: translateX(-100%);}
	}
	.tishi i{
		color: red;
		font-weight: bold;
	}
	.upload{
		background-color: white;
		border-left: 1px solid #999;
		padding: 5px;
		border-radius: 10px;
		box-shadow: 3px 3px 5px #CCCCCC;
		margin: 20px 0;
	}
	.upload input{
		width: 65vw;
		height: 25px;
		margin: 5px 0px;
		border: 1px solid #999;
	}
	.uploadTitle input{
		width: 85vw;
		margin-left: 5px;
	}
	.uploadType ul{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin-bottom: 10px;
	}
	.uploadType li{
		padding: 5px 10px;
		border: 1px solid #FAECD8;
		margin-top: 10px;
		margin-right: 10px;
	}
	.uploadType .border{
		border: 1px solid #3d97f4;
	}
	/deep/ .avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	    border: 1px solid #8c939d;
	    margin-top: 6px;
  	}
  	.avatar-uploader .el-upload:hover {
    	border-color: #409EFF;
  	}
  	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
  	}
  	.avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
  	}
	.step{
		display: inline-block;
		margin: 10px 5px;
		font-size: 13px;
	}
	.ok{
		display: block;
		width: 150px;
		margin: 0 auto;
		font-size: 16px;
		box-shadow: 3px 3px 5px #999;
		text-align: center;
	}
	.step,.ok{
		padding: 5px 10px;
		background-color: #409eff;
		border-radius: 50px;
		color: white;
		border: none;
	}
	/deep/ .uploadMaterial .el-form-item span{
		margin-left: 5px;
	}
	/deep/ .uploadMaterial .el-input{
		width: 20%;
	}
	/deep/ .uploadStep .el-input{
		width: auto;
	}
	/*/deep/ .el-upload--picture-card{
		width: 80px; 
	    height: 80px; 
	    line-height: 80px; 
	}*/
</style>