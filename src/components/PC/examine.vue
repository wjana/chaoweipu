<template>
	<main>
		<div class="whole">
			<div class="title">
				<i class="fa fa-circle-o" aria-hidden="true"></i>
				菜谱审核
			</div>
			<div class="">
			  	<el-table
				    :data="tableData"
				    style="width: 40%;border-right: 1px solid #999;"
				    height="465px">
				    <el-table-column
				      	prop="cname"
				      	label="菜谱名称"
				      	width="100">
				    </el-table-column>
				    <el-table-column
				      	label="图片"
				      	width="120">
				      	<template slot-scope="scope">
				      		<img :src="scope.row.cimg" width="80px"/>
				      	</template>
				    </el-table-column>
				  	</el-table-column>
				    <el-table-column
				      	prop="examine"
				      	label="状态"
				      	width="100">
				    </el-table-column>
				    <el-table-column label="操作" width="120">
				      	<template slot-scope="scope">
					        <el-button
					          	size="mini"
					          	@click="handleCheck(scope.$index, scope.row)">查看
					        </el-button>
					        <el-drawer
							  title="详情"
							  :visible.sync="table"
							  direction="rtl"
							  size="50%"
							  :append-to-body="true"
							  :modal="false">
							    <table class="checkTab" border="1" cellspacing="0" cellpadding="">
							    	<tr><th>菜谱ID</th><td>{{scope.row.cid}}</td></tr>
							    	<tr><th>菜谱名称</th><td>{{scope.row.cname}}</td></tr>
							    	<tr><th>成品图</th><td><img :src="scope.row.cimg" width="100px"/></td></tr>
							    	<tr><th>简介</th><td>{{scope.row.cinfo}}</td></tr>
							    	<tr><th>菜谱类型</th><td>{{scope.row.ctype}}</td></tr>
							    	<tr><th>菜谱状态</th><td>{{scope.row.examine}}</td></tr>
							    	<tr><th>作者</th><td>{{scope.row.cauthor}}</td></tr>
							    	<tr><th>用料</th>
							    		<td class="mat">
							    			<p v-for="(item,index) in scope.row.material" class="mat">
								          		<span>{{item.things}}</span>
								          		<span>{{item.weight}}</span>
							          		</p>
							    		</td>
							    	</tr>
							    	<tr><th>步骤</th>
							    		<td>
							    			<p class="st" v-for="(item,index) in scope.row.step">
							          			<span class="s1">{{item.stepNum}}</span>
							          			<span class="s2"><img :src="item.stepImg" width="100%"/></span>
							          			<span class="s3">{{item.stepInfo}}</span>
					          				</p>
							    		</td>
							    	</tr>
							    </table>
							    <button class="checkBtn" @click="check(scope.$index, scope.row)">确认审核通过</button>
							</el-drawer>
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
		       	table: false,
	      	}
    	},
    	methods: {
	      	handleCheck(index, row) {
//		        console.log(index, row);
		        this.table = true
		      },
		    check(index, row){
		    	console.log(index, row);
		    	let data1 = {'cid':row.cid}
	    		this.$http.post('/api/menu/updateExamine',data1)
	            .then((res)=>{
	            	this.table=false
	            	this.getData()
			    })
		    },
		    getData(){
		    	this.$http.post('/api/menu/selectState')
	            .then((res)=>{
	            	if(res.data == -1){
	            		this.tableData=[]
	            	}else{
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
			    	}
				})
	            .finally((f)=>{
	            	
	            })
		    }
    	},
    	mounted(){
			this.getData()
            
			            
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
	/deep/ .el-drawer.rtl{
		right: 20px;
		top: 80px;
	    height: 80%;
	    overflow-y: scroll;
	}
	/deep/ :focus{
		outline: none;
	}
	.checkTab th{
		width: 25%;
		border: 1px solid #F2F2F2;
	}
	.checkTab td{
		padding: 8px 10px;
		border: 1px solid #F2F2F2;
	}
	.mat span{
		display: inline-block;
		width: 45%;
		text-align: center;
	}
	.st{
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items:  flex-start;
	}
	.st span{
		display: inline-block;
	}
	.st .s1{
		width: 6%;
	}
	.st .s2{
		width: 20%;
	}
	.st .s3{
		width: 65%;
	}
	.checkBtn{
		position: absolute;
		top: 8px;
		left: 70px;
		background-color: #409EFF;
		padding: 5px 10px;
		color: white;
		border-radius: 5px;
	}
</style>