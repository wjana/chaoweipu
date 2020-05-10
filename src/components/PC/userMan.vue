<template>
	<main>
		<div class="whole">
			<div class="title">
				<i class="fa fa-circle-o" aria-hidden="true"></i>
				用户管理
			</div>
			<div class="search">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	<el-form-item label="用户ID/手机号">
				    	<el-input v-model="formInline.uid" placeholder="用户ID/手机号"></el-input>
				  	</el-form-item>
				  	<el-form-item label="/ 用户昵称">
				    	<el-input v-model="formInline.uname" placeholder="用户昵称"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button type="primary" @click="onSubmit">查询</el-button>
				    	<el-button type="primary" @click="re">重置</el-button>
				  	</el-form-item>
				</el-form>
			</div>
			<div class="tab">
				<el-button @click="clearFilter" size="mini">清除过滤器</el-button>
			  	<el-table
			  		ref="filterTable"
				    :data="tableData"
				    style="width: 100%"
				    height="340">
				    <el-table-column
				      	prop="uid"
				      	label="用户ID"
				      	width="220">
				    </el-table-column>
				    <el-table-column
				      	prop="uname"
				      	label="用户昵称"
				      	width="220">
				    </el-table-column>
				    <el-table-column
				    	prop="sex"
				      	label="性别"
				      	width="160"
				      	:filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]"
					    :filter-method="filterSex">
				    </el-table-column>
				    <el-table-column
				    	prop="uid"
				      	label="用户手机号"
				      	width="220">
				    </el-table-column>
				    <el-table-column label="操作" width="220" fixed="right">
				      	<template slot-scope="scope">
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
	export default{
		data() {
	      	return {
	      		formInline: {
		          uid: '',
		          uname: '',
		        },
		        tableData:[],
		        t:[],
		        dialogFormVisible:false,
	      	}
	   	},
	   	methods:{
	   		onSubmit() {
		        console.log(this.formInline);
		        console.log(this.formInline.uname);
		        let data1 = {'uid':this.formInline.uid,'uname':this.formInline.uname}
				this.$http.post('/api/user/selectID',data1)
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
		    clearFilter() {
		        this.$refs.filterTable.clearFilter();
		    },
	      	filterSex(value, row) {
	        	return row.sex === value;
	      	},
		    handleDelete(index, row) {
		        console.log(index, row);
		        let data2 = {'uid':row.uid}
	    		this.$http.post('/api/user/delete',data2)
	            .then((res)=>{
	            	this.$http.post('/api/user/selectUser')
		            .then((res)=>{
				    	this.tableData=res.data
				    })
			    })
		    },
	   	},
	   	mounted(){
	   		this.$http.post('/api/user/selectUser')
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
</style>