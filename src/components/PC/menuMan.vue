<template>
	<main>
		<div class="whole">
			<div class="title">
				<i class="fa fa-circle-o" aria-hidden="true"></i>
				菜谱管理
			</div>
			<div class="search">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	<el-form-item label="菜谱编号">
				    	<el-input v-model="formInline.cid" placeholder="菜谱编号"></el-input>
				  	</el-form-item>
				  	<el-form-item label="/ 菜谱名称">
				    	<el-input v-model="formInline.cname" placeholder="菜谱名称"></el-input>
				  	</el-form-item>
				  	<el-form-item label="/ 菜谱作者">
				    	<el-input v-model="formInline.cauthor" placeholder="菜谱作者"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button type="primary" @click="onSubmit">查询</el-button>
				    	<el-button type="primary" @click="re">重置</el-button>
				  	</el-form-item>
				</el-form>
			</div>
			<div class="">
			  	<el-button @click="clearFilter"  size="mini">清除所有过滤器</el-button>
			  	<el-table
				    ref="filterTable"
				    :data="tableData"
				    style="width: 100%"
				    height="340">
				    <el-table-column type="expand"> 
				      <template slot-scope="props">
				        <el-form label-position="left" class="demo-table-expand">
          					<el-form-item label="用料">
				          		<span v-for="(item,index) in props.row.material"><span class="blank">{{item.things}}</span>：<span>{{item.weight}}</span>；</span>
				          	</el-form-item>
				          	<el-form-item label="步骤">
				          		<p class="stepList" v-for="(item,index) in props.row.step">
				          			<span>{{item.stepNum}}</span>
				          			<span class="imgBox"><img :src="item.stepImg" width="100%"/></span>
				          			<span>{{item.stepInfo}}</span>
				          		</p>
				          	</el-form-item>
				        </el-form>
				      </template>
				    </el-table-column>
				    <el-table-column
				      	prop="cid"
				      	label="菜谱编号"
				      	width="140">
				    </el-table-column>
				    <el-table-column
				      	prop="cname"
				      	label="菜谱名称"
				      	width="120">
				    </el-table-column>
				    <el-table-column
				      	label="图片"
				      	width="140">
				      	<template slot-scope="scope">
				      		<img :src="scope.row.cimg" width="80px"/>
				      	</template>
				    </el-table-column>
				    <el-table-column
				      	prop="ctype"
				      	label="菜谱类型"
				      	width="100"
				      	column-key="type"
				      	:filters="[{text: '特色小吃', value: '特色小吃'}, {text: '糕饼类', value: '糕饼类'}, {text: '粿类', value: '粿类'}, {text: '烙类', value: '烙类'}, {text: '甜点类', value: '甜点类'}, {text: '油炸类', value: '油炸类'}, {text: '手工类', value: '手工类'}, {text: '肉脯类', value: '肉脯类'}]"
				      	:filter-method="filterHandler">
				    </el-table-column>
				    <el-table-column
				      	prop="cauthor"
				      	label="作者"
				      	width="120">
				    </el-table-column>
			    	<el-table-column
				      	prop="cinfo"
				      	label="简介"
				      	width="180"
				      	:show-overflow-tooltip="true">
				    </el-table-column>
				    <el-table-column
				      	prop="collect"
				      	label="点赞人数"
				      	width="100">
				    </el-table-column>
				    <el-table-column
				      	prop="examine"
				      	label="状态"
				      	width="120">
				    </el-table-column>
				    <el-table-column label="操作" width="200" fixed="right">
				      	<template slot-scope="scope">
					        <el-button
					          	size="mini"
					          	@click="handleEdit(scope.$index, scope.row)">编辑
					        </el-button>
					        <el-dialog title="编辑菜谱" :visible.sync="dialogFormVisible" :append-to-body="true">
							  <el-form :model="editForm" :ref="editForm" label-position="left" label-width="100px">
							    <el-form-item label="菜谱ID">
							      <el-input v-model="editForm.cid" autocomplete="off" disabled></el-input>
							    </el-form-item>
							    <el-form-item label="菜谱名称">
							      <el-input v-model="editForm.cname" autocomplete="off" value="editForm.cname"></el-input>
							    </el-form-item>
							    <el-form-item label="成品图">
								    <img :src="editForm.cimg" width="100px" />
									<!--<el-upload
									  class="avatar-uploader"
									  action="http://localhost:8080/api/admin/upload"
									  :show-file-list="false"
									  :on-success="handleAvatarSuccess">
									  <img v-if="scope.row.cimg" :src="scope.row.cimg" width="100px" class="avatar">
									  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>-->
							    </el-form-item>
							    <el-form-item label="简介">
								    <el-input type="textarea" v-model="editForm.cinfo"></el-input>
								</el-form-item>
							    <el-form-item label="菜谱类型">
								    <el-select v-model="editForm.ctype" placeholder="请选择类型">
								      <el-option label="特色小吃" value="特色小吃"></el-option>
								      <el-option label="糕饼类" value="糕饼类"></el-option>
								      <el-option label="粿类" value="粿类"></el-option>
								      <el-option label="烙类" value="烙类"></el-option>
								      <el-option label="甜点类" value="甜点类"></el-option>
								      <el-option label="油炸类" value="油炸类"></el-option>
								      <el-option label="手工类" value="手工类"></el-option>
								      <el-option label="肉铺类" value="肉铺类"></el-option>
								    </el-select>
								</el-form-item>
								<el-form-item label="菜谱状态">
								    <el-select v-model="editForm.examine" placeholder="请选择状态">
								      <el-option label="审核通过" value="审核通过"></el-option>
								      <el-option label="待审核" value="待审核"></el-option>
								    </el-select>
								</el-form-item>
								<el-form-item label="作者">
							      <el-input v-model="editForm.cauthor" autocomplete="off" value="editForm.cauthor"></el-input>
							    </el-form-item>
								<el-form-item label="收藏数">
							      <el-input v-model="editForm.collect" autocomplete="off" value="editForm.collect"></el-input>
							    </el-form-item>
							    <el-form-item label="用料">
						          	<span v-for="(item,index) in editForm.material" class="mat">
						          		<el-input v-model="item.things" autocomplete="off" value="item.things"></el-input>
						          		<el-input v-model="item.weight" autocomplete="off" value="item.weight"></el-input>
						          	</span>
						        </el-form-item>
					          	<el-form-item label="步骤">
					          		<p class="st" v-for="(item,index) in editForm.step">
					          			<span>{{item.stepNum}}</span>
					          			<span class="imgBox"><img :src="item.stepImg" width="100%"/></span>
					          			<el-input v-model="item.stepInfo" autocomplete="off" value="item.stepInfo"></el-input>
					          		</p>
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
					          	@click="handleDelete(scope.$index, scope.row)">删除</el-button>
				      	</template>
				    </el-table-column>
			  	</el-table>
			</div>
		</div>
	</main>
</template>

<script>
	import Vue from 'vue'
	export default{
		data() {
	      	return {
	      		mid:'',
	      		mname:'',
	      		list:[],
	      		formInline: {
		          cid: '',
		          cname: '',
		          cauthor: '',
		        },
		        t:[],
		       	tableData:[],
		       	tableData1:[],
		       	tableData2:[],
		       	dialogFormVisible:false,
		       	formLabelWidth: '120px',
		       	editForm:{
		       		cid:'',
		       		cname:'',
		       		cauthor:'',
					cimg:'',
					cinfo:'',
					collect:0,
					ctype:'',
					examine:'',
					material:[],
					step:[]
		       	},
		       	addForm:{
		        	cid:'',
		       		cname:'',
		       		cauthor:'',
					cimg:'',
					cinfo:'',
					collect:0,
					ctype:'',
					examine:'',
					material:[],
					step:[]
		        },
	      	}
    	},
    	methods: {
    		onSubmit() {
		        console.log(this.formInline);
		        let data2 = {'cid':this.formInline.cid,'cname':this.formInline.cname,'cauthor':this.formInline.cauthor}
				this.$http.post('/api/menu/searchMenu1',data2)
	            .then((res)=>{
			    	this.tableData = res.data
			    	console.log(this.tableData)
			    	for(let i in this.tableData){
			    		let data2 = {'cid':this.tableData[i].cid}
			    		this.$http.post('/api/material/searchCid',data2)
			            .then((res)=>{
			            	if(res.data != -1){
			            		this.tableData1=res.data
	//					    	console.log(this.tableData1)
						    	Vue.set(this.tableData[i],"material",this.tableData1)
			            	}
					    })
			            this.$http.post('/api/step/searchCid',data2)
			            .then((res)=>{
			            	if(res.data != -1){
						    	this.tableData2=res.data
	//					    	console.log(this.tableData2)
						    	Vue.set(this.tableData[i],"step",this.tableData2)
						    }
						})
			    	}
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
		    clearFilter() {
		        this.$refs.filterTable.clearFilter();
		    },
	      	filterHandler(value, row, column) {
	        	const property = column['property'];
	        	return row[property] === value;
	      	},
	      	handleEdit(index, row) {
//		        console.log(index, row);
		        this.dialogFormVisible=true
		        this.editForm = Object.assign({}, row);
//		        console.log(this.editForm)
		    },
		    cancelEdit(){
				this.dialogFormVisible = false
				this.editForm = Object.assign({
					cid:'',
		       		cname:'',
		       		cauthor:'',
					cimg:'',
					cinfo:'',
					collect:0,
					ctype:'',
					examine:'',
					material:[],
					step:[]
				});
		        console.log(this.editForm)
		    },
		    submitEdit(){
		    	let data4 = {'cname':this.editForm.cname,'cauthor':this.editForm.cauthor,'cimg':this.editForm.cimg,'cinfo':this.editForm.cinfo,'collect':this.editForm.collect,'ctype':this.editForm.ctype,'examine':this.editForm.examine,'cid':this.editForm.cid}
	    		this.$http.post('/api/menu/update',data4)
	            .then((res)=>{
	            	this.$http.post('/api/menu/searchAll')
		            .then((res)=>{
				    	this.tableData=res.data
				    	this.t=this.tableData
				    })
			    })
	            this.dialogFormVisible = false
		    },
		    handleDelete(index, row) {
		        console.log(index, row);
		        let data3 = {'cid':row.cid}
	    		this.$http.post('/api/menu/delete',data3)
	            .then((res)=>{
	            	console.log(this.editForm)
	            	this.$http.post('/api/menu/search')
		            .then((res)=>{
				    	this.tableData=res.data
				    })
			    })
		    },
    	},
    	mounted(){
			this.$http.post('/api/menu/searchAll')
            .then((res)=>{
		    	this.tableData=res.data
		    	console.log(this.tableData)
		    	for(let i in this.tableData){
		    		let data2 = {'cid':this.tableData[i].cid}
		    		this.$http.post('/api/material/searchCid',data2)
		            .then((res)=>{
		            	if(res.data != -1){
		            		this.tableData1=res.data
//					    	console.log(this.tableData1)
					    	Vue.set(this.tableData[i],"material",this.tableData1)
		            	}
				    })
		            this.$http.post('/api/step/searchCid',data2)
		            .then((res)=>{
		            	if(res.data != -1){
					    	this.tableData2=res.data
//					    	console.log(this.tableData2)
					    	Vue.set(this.tableData[i],"step",this.tableData2)
					    }
					})
		    	}
		    	this.t=this.tableData
		    	console.log(this.tableData)
			})
            .finally((f)=>{
            	
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
	/deep/ .el-select-dropdown{
		position: absolute;
		top: 222px;
		left: 335px !important;
	}
	.search{
		margin-top: 20px;
	}
	.blank{
		margin-left: 20px;
	}
	.imgBox{
		display: inline-block;
		width: 60px;
	}
	.stepList{
		margin-left: 60px;
	}
	/deep/ .mat .el-input{
		width: 48%;
	}
	/deep/ .st .el-input{
		width: 80% !important;
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
</style>