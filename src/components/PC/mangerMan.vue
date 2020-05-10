<template>
	<main>
		<div class="whole">
			<div class="title">
				<i class="fa fa-circle-o" aria-hidden="true"></i>
				管理员管理
				<button class="addM" @click="addM">添加管理员</button>
			</div>
			<div class="search">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	<el-form-item label="管理员ID">
				    	<el-input v-model="formInline.mid" placeholder="管理员ID"></el-input>
				  	</el-form-item>
				  	<el-form-item label="/ 管理员姓名">
				    	<el-input v-model="formInline.mname" placeholder="管理员姓名"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button type="primary" @click="onSubmit">查询</el-button>
				    	<el-button type="primary" @click="re">重置</el-button>
				  	</el-form-item>
				</el-form>
			</div>
			<div class="tab">
				<el-table
				    :data="tableData"
				    style="width: 100%"
				    height="350">
				    <el-table-column
				      	prop="mid"
				      	label="管理员ID"
				      	width="180">
				    </el-table-column>
				    <el-table-column
				      	prop="mname"
				      	label="姓名"
				      	width="180">
				    </el-table-column>
				    <el-table-column
				    	prop="sex"
				      	label="性别"
				      	width="120">
				    </el-table-column>
				    <el-table-column
				    	prop="phone"
				      	label="手机号"
				      	width="220">
				    </el-table-column>
				    <el-table-column
				      	prop="power"
				      	label="权限 *"
				      	width="160">
				    </el-table-column>
				    <el-table-column label="操作" width="240" fixed="right">
				      	<template slot-scope="scope">
				      		<el-button
					          	size="mini"
					          	@click="handleEdit(scope.$index, scope.row)">编辑
					        </el-button>
					        <el-dialog title="编辑管理员信息" :visible.sync="dialogFormVisible" :append-to-body="true">
							  <el-form :model="editForm" :ref="editForm" label-position="left" label-width="100px">
							    <el-form-item label="管理员ID">
							      <el-input v-model="editForm.mid" autocomplete="off"></el-input>
							    </el-form-item>
							    <el-form-item label="姓名">
							      <el-input v-model="editForm.mname" autocomplete="off" value="editForm.cname"></el-input>
							    </el-form-item>
							    <el-form-item label="性别">
								    <el-select v-model="editForm.sex" placeholder="请选择性别">
								      <el-option label="男" value="男"></el-option>
								      <el-option label="女" value="女"></el-option>
								    </el-select>
								</el-form-item>
							    <el-form-item label="手机号">
								    <el-input v-model="editForm.phone" autocomplete="off" value="editForm.phone"></el-input>
								</el-form-item>
							    <el-form-item label="权限">
							    	<el-select v-model="editForm.power" placeholder="请选择权限级别">
								      <el-option label="1" value="1"></el-option>
								      <el-option label="2" value="2"></el-option>
								    </el-select>
								    <p class="explain"><span>*</span> &nbsp;“1”为超级管理员，“2”为普通管理员</p>
								</el-form-item>
							  </el-form>
							  
							  <div slot="footer" class="dialog-footer">
							    <el-button @click="cancelEdit">取 消</el-button>
							    <el-button type="primary" @click="submitEdit">确 定</el-button>
							  </div>
							</el-dialog> 
					        <el-button
					          	size="mini"
					          	type="danger"
					          	@click="handleDelete(scope.$index, scope.row)">删除
					        </el-button>
				      	</template>
				    </el-table-column>
				</el-table>
			</div>
		</div>
		<p class="explain"><span>*</span> &nbsp;“1”为超级管理员，“2”为普通管理员</p>
		<!--添加管理员弹框-->
		<el-dialog title="添加管理员" :visible.sync="dialogFormVisible3" :append-to-body="true">
		  	<el-form label-position="left" label-width="100px">
			    <el-form-item label="管理员ID">
			      <el-input v-model="mid" autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="姓名">
			      <el-input v-model="mname" autocomplete="off" value=""></el-input>
			    </el-form-item>
			    <el-form-item label="密码">
				    <el-input v-model="mpasswd" autocomplete="off" value=""></el-input>
				    <p class="explain"><span>*</span> &nbsp;初始密码默认为123456</p>
				</el-form-item>
			    <el-form-item label="性别">
				    <el-select v-model="sex" placeholder="请选择性别">
				      <el-option label="男" value="男"></el-option>
				      <el-option label="女" value="女"></el-option>
				    </el-select>
				</el-form-item>
			    <el-form-item label="手机号">
				    <el-input v-model="phone" autocomplete="off" value=""></el-input>
				</el-form-item>
			    <el-form-item label="权限">
			    	<el-select v-model="power" placeholder="请选择权限级别">
				      <el-option label="1" value="1"></el-option>
				      <el-option label="2" value="2"></el-option>
				    </el-select>
				    <p class="explain"><span>*</span> &nbsp;“1”为超级管理员，“2”为普通管理员</p>
				</el-form-item>
			  </el-form>
		  
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="onSubmit1">确 定</el-button>
		  </div>
		</el-dialog>
	</main>
</template>

<script>
	export default{
		data() {
			return {
	      		formInline: {
		          mid: '',
		          mname: '',
		        },
		        tableData:[],
		        t:[],
		        dialogFormVisible:false,
		        dialogFormVisible3:false,
		        mid:'',
		        mname:'',
		        mpasswd:'123456',
		        sex:'',
		        phone:'',
		        power:'',
		        editForm:{
		       		mid:'',
		       		mname:'',
		       		phone:'',
					power:'',
					sex:''
		       	},
		       	editMid:''
	      	}
	   	},
	   	methods:{
	   		
	   		onSubmit() {
		        console.log(this.formInline);
		        let data1 = {'mid':this.formInline.mid,'mname':this.formInline.mname}
				this.$http.post('/api/manger/selectMan',data1)
	            .then((res)=>{
			    	this.tableData = res.data
			    	console.log(this.tableData)
				})
	            .finally((f)=>{
	            	
	            })
		    },
		    re(){
		    	this.formInline={
		          cid: '',
		          cname: '',
		          cauthor: '',
		        }
			    this.tableData=this.t
		    },
	      	handleEdit(index, row) {
//		        console.log(index, row);
		        this.dialogFormVisible=true
		        this.editForm = Object.assign({}, row);
		        this.editMid=this.editForm.mid
		    },
		    cancelEdit(){
				this.dialogFormVisible = false
				this.editForm = Object.assign({
					mid:'',
		       		mname:'',
		       		phone:'',
					power:'',
					sex:''
				});
		        console.log(this.editForm)
		    },
		    submitEdit(){
		    	let data4 = {'mid':this.editForm.mid,'mname':this.editForm.mname,'phone':this.editForm.phone,'power':this.editForm.power,'sex':this.editForm.sex,'oldMid':this.editMid}
	    		this.$http.post('/api/manger/update',data4)
	            .then((res)=>{
	            	this.$http.post('/api/manger/search')
		            .then((res)=>{
				    	this.tableData=res.data
				    	this.t=this.tableData
				    })
			    })
	            this.dialogFormVisible = false
		    },
		    handleDelete(index, row) {
		        console.log(index, row);
		        let data2 = {'mid':row.mid}
	    		this.$http.post('/api/manger/deleteManger',data2)
	            .then((res)=>{
	            	this.$http.post('/api/manger/search')
		            .then((res)=>{
				    	this.tableData=res.data
				    	this.t=this.tableData
				    })
			    })
		    },
		    addM(){
		    	this.dialogFormVisible3=true
		    },
		    cancel(){
		    	this.dialogFormVisible3=false
		    	this.mid=''
		        this.mname=''
		        this.mpasswd='123456'
		        this.sex=''
		        this.phone=''
		        this.power=''
		    },
		    onSubmit1(){
		    	function codeVerification(phone){
				    let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
				    return phoneCodeVerification.test(phone);
				}
				if(this.mid == "" || this.mname == "" || this.mpasswd == ""|| this.sex == "" || this.phone == ""|| this.power == ""){
	                this.$message({
			          	message: '请输入完整 的信息',
			          	type: 'warning'
			        });
	            }else{
	            	if(!codeVerification(this.phone)){
						this.$message.error('手机号码不正确，请重新填写！');
						return false;
					}
			    	this.dialogFormVisible3=false
			    	console.log(this.mid,this.mname,this.mpasswd,this.sex,this.phone,this.power)
			    	let data3 = {'mid':this.mid,'mname':this.mname,'mpasswd':this.mpasswd,'sex':this.sex,'phone':this.phone,'power':this.power}
		    		this.$http.post('/api/manger/addMan',data3)
		            .then((res)=>{
		            	this.$http.post('/api/manger/search')
			            .then((res)=>{
					    	this.tableData=res.data
					    	this.t=this.tableData
					    })
				    })
		        }
		    }
	   	},
	   	mounted(){
	   		this.$http.post('/api/manger/search')
            .then((res)=>{
		    	this.tableData = res.data
		    	console.log(this.tableData)
		    	this.t=this.tableData
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
	.search{
		margin-top: 20px;
	}
	.tab{
		padding-left: 20px;
	}
	.explain{
		color: #999999;
		font-size: 14px;
		text-align: left;
	}
	.explain span{
		color: red;
		font-weight: bolder;
		font-size: 14px;
	}
	.addM{
		float: right;
		padding: 5px 10px;
		color: #409EFF;
	}
</style>