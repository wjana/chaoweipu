<template>
	<main>
		<div class="whole">
			<div class="title">
				<i class="fa fa-circle-o" aria-hidden="true"></i>
				个人信息
				<button @click="pw" class="pw">修改密码</button>
			</div>
			<table class="tab" cellspacing="0">
				<tr><td>管理员ID</td><td>{{mid}}</td></tr>
				<tr><td>姓名</td><td>{{mname}}</td></tr>
				<tr><td>性别</td><td>{{sex}}</td></tr>
				<tr><td>手机号</td><td>{{phone}}</td></tr>
				<tr><td>权限等级</td><td>{{power}}</td></tr>
			</table>
		</div>
		<button class="modify" @click="modify">修改</button>
		<!--修改信息信息弹框-->
		<el-dialog title="修改管理员信息" :visible.sync="dialogFormVisible1" :append-to-body="true">
		  <el-form :model="list[0]" label-position="left" label-width="100px">
		    <el-form-item label="管理员ID">
		      <el-input v-model="mid" autocomplete="off" disabled></el-input>
		    </el-form-item>
		    <el-form-item label="姓名">
		      <el-input v-model="mname" autocomplete="off" value="cname"></el-input>
		    </el-form-item>
		    <el-form-item label="性别">
			    <el-select v-model="sex" placeholder="请选择性别">
			      <el-option label="男" value="男"></el-option>
			      <el-option label="女" value="女"></el-option>
			    </el-select>
			</el-form-item>
		    <el-form-item label="手机号">
			    <el-input v-model="phone" autocomplete="off" value="phone"></el-input>
			</el-form-item>
		    <el-form-item label="权限">
		    	<el-input v-model="power" autocomplete="off" disabled></el-input>
			    <p class="explain"><span>*</span> &nbsp;“1”为超级管理员，“2”为普通管理员</p>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="onSubmit">确 定</el-button>
		  </div>
		</el-dialog>
		<!--修改密码弹框-->
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible2" :append-to-body="true">
		  	<el-form :model="list[0]" label-position="left" label-width="100px">
			    <div v-if="show1">
			    	<el-input class="oldinput" v-model="old" placeholder="请输入原密码" autocomplete="off" show-password></el-input>
			    	<el-button type="primary" @click="oldPw">确 定</el-button>
			    	<p class="error" v-show="show3">原密码错误，请重新输入！</p>
			    </div>
		    	<el-form-item v-if="show2" label="修改密码">
			      	<el-input v-model="newpw" placeholder="请输入修改密码" autocomplete="off" show-password></el-input>
			    </el-form-item>
		    </el-form>
		  
		  <div slot="footer" v-if="show2" class="dialog-footer">
		    <el-button @click="cancel2">取 消</el-button>
		    <el-button type="primary" @click="onSubmit2">确 定</el-button>
		  </div>
		</el-dialog>
	</main>
</template>

<script>
	export default {
	    data() {
	      return {
	      	mid:'',
	        list:[],
	        mname:'',
	        sex:'',
	        phone:'',
	        power:'',
	        mpasswd:'',
	        dialogFormVisible1:false,
	        dialogFormVisible2:false,
	        old:'',
	        newpw:'',
	        show1:true,
	        show2:false,
	        show3:false,
	      }
	    },
	    methods: {
	      onSubmit() {
	        let data2 = {'mname':this.mname,'sex':this.sex,'phone':this.phone,'power':this.power,'mid':this.mid}
    		this.$http.post('/api/manger/updateMinfo',data2)
            .then((res)=>{
            	let data3 = {'mid':this.mid}
	    		this.$http.post('/api/manger/searchManger',data3)
	            .then((res)=>{
	            	this.list=res.data
	            	console.log(this.list)
	            	this.mid=this.list[0].mid
			    	this.mname=this.list[0].mname
			    	this.sex=this.list[0].sex
			    	this.phone=this.list[0].phone
			    	this.power=this.list[0].power
			    	this.mpasswd=this.list[0].mpasswd
			    })
	            this.dialogFormVisible1 = false
		    })
	      },
	      modify(){
	      	this.dialogFormVisible1=true
	      },
	      cancel(){
	      	this.dialogFormVisible1 = false
	      	this.mid=this.list[0].mid
	    	this.mname=this.list[0].mname
	    	this.sex=this.list[0].sex
	    	this.phone=this.list[0].phone
	    	this.power=this.list[0].power
	    	this.mpasswd=this.list[0].mpasswd
	      },
	      pw(){
	      	this.dialogFormVisible2=true
	      },
	      oldPw(){
	      	if(this.old==this.mpasswd){
	      		this.show2=true
	      		this.show1=false
	      		this.show3=false
	      	}else{
	      		this.show3=true
	      	}
	      },
	      cancel2(){
	      	this.show2=false,
	      	this.show1=true
	      	this.show3=false,
	      	this.dialogFormVisible2 = false
	    	this.mpasswd=this.list[0].mpasswd
	    	this.old=''
	      },
	      onSubmit2(){
	      	let data5 = {'mpasswd':this.newpw,'mid':this.mid}
    		this.$http.post('/api/manger/updateMpw',data5)
            .then((res)=>{
            	let data6 = {'mid':this.mid}
	    		this.$http.post('/api/manger/searchManger',data6)
	            .then((res)=>{
	            	this.list=res.data
	            	console.log(this.list)
	            	this.mid=this.list[0].mid
			    	this.mname=this.list[0].mname
			    	this.sex=this.list[0].sex
			    	this.phone=this.list[0].phone
			    	this.power=this.list[0].power
			    	this.mpasswd=this.list[0].mpasswd
			    })
	            this.dialogFormVisible2 = false
		    })
	      }
	    },
	    mounted(){
	    	this.cookies.getCookie()
			this.mid=this.cookies.getCookie()[0]
			console.log(this.mid)
			
	    	let data1 = {'mid':this.mid}
    		this.$http.post('/api/manger/searchManger',data1)
            .then((res)=>{
            	this.list=res.data
            	console.log(this.list)
            	this.mid=this.list[0].mid
		    	this.mname=this.list[0].mname
		    	this.sex=this.list[0].sex
		    	this.phone=this.list[0].phone
		    	this.power=this.list[0].power
		    	this.mpasswd=this.list[0].mpasswd
		    })
	    }
	}
</script>

<style scoped="">
	.whole{
		background-color: white;
		margin: 20px 0;
		border-radius: 10px;
		overflow: hidden;
	}
	.title{
		line-height: 40px;
		text-align: left;
		color: black;
		font-weight: bold;
		padding-left: 20px;
		font-size: 14px;
	}
	.tab{
		padding-bottom: 15px;
		width: 100%;
	}
	.tab td{
		padding: 15px 0;
	}
	.modify{
		width: 150px;
		color: #FFF;
		background-color: #409EFF;
		border-color: #409EFF;
		padding: 10px 0;
		border-radius: 50px;
	}
	.pw{
		color: #409EFF;
		float: right;
		padding: 5px 10px;
	}
	.oldinput{
		width: 80% !important;
	}
	.error{
		color: red;
	}
</style>