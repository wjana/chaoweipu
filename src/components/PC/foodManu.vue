<template>
	<main>
		<div class="whole">
			<div class="title">
				<i class="fa fa-circle-o" aria-hidden="true"></i>
				食材/产品管理
				<button class="addM" @click="addM">添加食材产品</button>
			</div>
			<div class="search">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	<el-form-item label="食材ID">
				    	<el-input v-model="formInline.pid" placeholder="食材ID"></el-input>
				  	</el-form-item>
				  	<el-form-item label="/ 名称">
				    	<el-input v-model="formInline.pname" placeholder="名称"></el-input>
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
				    height="380">
				    <el-table-column
				      	prop="pid"
				      	label="食材ID"
				      	width="120">
				    </el-table-column>
				    <el-table-column
				      	prop="pname"
				      	label="名称"
				      	width="140">
				    </el-table-column>
				    <el-table-column
				      	label="图片"
				      	width="140">
				      	<template slot-scope="scope">
				      		<img :src="scope.row.pimg" width="100px"/>
				      	</template>
				    </el-table-column>
				    <el-table-column
				    	prop="pinfo"
				      	label="介绍"
				      	width="220"
				      	:show-overflow-tooltip="true">
				    </el-table-column>
				    <el-table-column
				    	prop="price"
				      	label="价格"
				      	width="120">
				    </el-table-column>
				    <el-table-column
				      	prop="stock"
				      	label="库存"
				      	sortable
				      	width="120">
				    </el-table-column>
				    <el-table-column
				      	prop="weight"
				      	label="重量/份"
				      	width="140">
				    </el-table-column>
				    <el-table-column label="操作" width="240" fixed="right">
				      	<template slot-scope="scope">
				      		<el-button
					          	size="mini"
					          	@click="handleEdit(scope.$index, scope.row)">编辑
					        </el-button>
					        <el-dialog title="编辑食材信息" :visible.sync="dialogFormVisible" :append-to-body="true">
							  <el-form :model="editForm" :ref="editForm" label-position="left" label-width="100px">
							    <el-form-item label="食材ID">
							      <el-input v-model="editForm.pid" autocomplete="off" value="editForm.pid" disabled></el-input>
							    </el-form-item>
							    <el-form-item label="名称">
							      <el-input v-model="editForm.pname" autocomplete="off" value="editForm.pname"></el-input>
							    </el-form-item>
							    <el-form-item label="图片">
								    <img :src="editForm.pimg" width="100px" />
								</el-form-item>
								<el-form-item label="介绍">
							      <el-input v-model="editForm.pinfo" autocomplete="off" value="editForm.pinfo"></el-input>
							    </el-form-item>
							    <el-form-item label="价格">
							      <el-input v-model="editForm.price" autocomplete="off" value="editForm.price"></el-input>
							    </el-form-item>
							    <el-form-item label="库存">
							      <el-input v-model="editForm.stock" autocomplete="off" value="editForm.stock"></el-input>
							    </el-form-item>
							    <el-form-item label="重量/份">
							      <el-input v-model="editForm.weight" autocomplete="off" value="editForm.weight"></el-input>
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
		<!--添加弹框-->
		<el-dialog title="添加食材" :visible.sync="dialogFormVisible3" :append-to-body="true">
		  	<el-form :model="addForm" label-position="left" label-width="100px">
			    <el-form-item label="食材ID">
			      	<el-input v-model="addForm.pid" autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="名称">
			      	<el-input v-model="addForm.pname" autocomplete="off" value=""></el-input>
			    </el-form-item>
			    <el-form-item label="图片">
				    <img :src="addForm.pimg" width="100px" />
				    <el-upload
					    class="avatar-uploader"
					    action="http://localhost:8080/api/admin/upload/"
					    :show-file-list="false"
					    :on-success="handleAvatarSuccess"
					    :before-upload="beforeAvatarUpload">
					    <img v-if="imageUrl" :src="imageUrl" class="avatar">
					    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				  	</el-upload>
				</el-form-item>
				<el-form-item label="介绍">
			      	<el-input v-model="addForm.pinfo" autocomplete="off" value="addForm.pinfo"></el-input>
			    </el-form-item>
			    <el-form-item label="价格">
			      	<el-input v-model="addForm.price" autocomplete="off" value="addForm.price"></el-input>
			    </el-form-item>
			    <el-form-item label="库存">
			      	<el-input v-model="addForm.stock" autocomplete="off" value="addForm.stock"></el-input>
			    </el-form-item>
			    <el-form-item label="重量/份">
			      	<el-input v-model="addForm.weight" autocomplete="off" value="addForm.weight"></el-input>
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
		          pid: '',
		          pname: '',
		        },
		        tableData:[],
		        t:[],
		        dialogFormVisible:false,
		        dialogFormVisible3:false,
		        editForm:{
		        	pid:'',
		        	pname:'',
		        	pimg:'',
		        	pinfo:'',
		        	price:'',
		        	stock:'',
		        	weight:''
		        },
		        addForm:{
		        	pid:'',
		        	pname:'',
		        	pimg:'',
		        	pinfo:'',
		        	price:'',
		        	stock:'',
		        	weight:''
		        },
		        imageUrl: '',
				imgUrl:'',//新地址
				formData: {
		         	imageUrl: '', //提交给后台的地址
		       	},
	      	}
	   	},
	   	methods:{
	   		handleAvatarSuccess(res, file) {
	        	this.imageUrl = URL.createObjectURL(file.raw);
	        	this.formData.imageUrl = res.filename;
				console.log(res.url)
				this.imgUrl=res.url
				console.log(res);
	      	},
	      	beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
	
		        if (!isLt2M) {
		          this.$message.error('上传图片大小不能超过 2MB!');
		        }
		        return isLt2M;
		    },
	   		onSubmit() {
		        console.log(this.formInline);
		        let data1 = {'pid':this.formInline.pid,'pname':this.formInline.pname}
				this.$http.post('/api/product/searchpro',data1)
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
//		        console.log(this.editForm)
		    },
		    cancelEdit(){
				this.dialogFormVisible = false
				this.editForm = Object.assign({pid:'',
		        	pname:'',
		        	pimg:'',
		        	pinfo:'',
		        	price:'',
		        	stock:'',
		        	weight:''});
//		        console.log(this.editForm)
		    },
		    submitEdit(){
		    	let data4 = {'pname':this.editForm.pname,'pimg':this.editForm.pimg,'pinfo':this.editForm.pinfo,'price':this.editForm.price,'stock':this.editForm.stock,'weight':this.editForm.weight,'pid':this.editForm.pid}
	    		this.$http.post('/api/product/update',data4)
	            .then((res)=>{
	            	this.$http.post('/api/product/search')
		            .then((res)=>{
				    	this.tableData=res.data
				    	this.t=this.tableData
				    })
			    })
	            this.dialogFormVisible = false
		    },
		    handleDelete(index, row) {
		        console.log(index, row);
		        let data2 = {'pid':row.pid}
	    		this.$http.post('/api/product/delete',data2)
	            .then((res)=>{
	            	this.$http.post('/api/product/search')
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
		    	this.addForm = Object.assign({pid:'',
		        	pname:'',
		        	pimg:'',
		        	pinfo:'',
		        	price:'',
		        	stock:'',
		        	weight:''});
		        	this.imageUrl=''
		    },
		    onSubmit1(){
		    	for(var i in this.t){
		    		if(this.addForm.pid==this.t[i].pid){
		    			this.$message({
				          	message: '食材id已存在，请重新输入！',
				          	type: 'warning'
				        });
				        return false
		    		}else{
		    			if(this.addForm.pid==''||this.addForm.pname==''||this.addForm.price==''||this.addForm.stock==''){
		    				this.$message({
					          	message: '请输入完整 的信息',
					          	type: 'warning'
					        });
					        return false
		    			}
		    		}
		    	}
		    	this.dialogFormVisible3=false
		    	console.log(this.addForm)
		    	let data3 = {'pid':this.addForm.pid,'pname':this.addForm.pname,'pimg':'../../../static/img/headImg1.jpg','pinfo':this.addForm.pinfo,'price':this.addForm.price,'stock':this.addForm.stock,'weight':this.addForm.weight}
	    		this.$http.post('/api/product/add',data3)
	            .then((res)=>{
	            	this.$http.post('/api/product/search')
		            .then((res)=>{
				    	this.tableData=res.data
				    	this.t=this.tableData
				    })
			    })
		   },
		   handleAvatarSuccess(res, file) {
	        this.imageUrl = URL.createObjectURL(file.raw);
	      },
	   	},
	   	mounted(){
	   		this.$http.post('/api/product/search')
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
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
    }
  	.avatar-uploader .el-upload:hover {
    	border-color: #409EFF;
  	}
  	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 100px;
	    height: 100px;
	    line-height: 100px;
	    text-align: center;
  	}
  	.avatar {
	    width: 100px;
	    height: 100px;
	    display: block;
  	}
  	/deep/ .el-upload {
  		border: 1px solid #8c939d;
  	}
</style>