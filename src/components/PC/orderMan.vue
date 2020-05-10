<template>
	<main>
		<div class="whole">
			<div class="title">
				<i class="fa fa-circle-o" aria-hidden="true"></i>
				订单管理
			</div>
			<div class="search">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
				  	<el-form-item label="订单ID">
				    	<el-input v-model="formInline.oid" placeholder="订单ID"></el-input>
				  	</el-form-item>
				  	<el-form-item label="/ 用户ID">
				    	<el-input v-model="formInline.uid" placeholder="用户ID"></el-input>
				  	</el-form-item>
				  	<el-form-item>
				    	<el-button type="primary" @click="onSubmit">查询</el-button>
				    	<el-button type="primary" @click="re">重置</el-button>
				  	</el-form-item>
				</el-form>
			</div>
			<div class="">
			  	<el-button @click="clearFilter" size="mini">清除过滤器</el-button>
			  	<el-table
				    ref="filterTable"
				    :data="tableData"
				    style="width: 100%"
				    height="340">
				    <el-table-column type="expand"> 
				      <template slot-scope="props">
				        <el-form label-position="left" class="demo-table-expand">
          					<el-form-item>
          						<strong>订单详情</strong>
          						<div class="detail">
          							<p><span>商品ID</span><span>商品图片</span><span>名称</span><span>购买数量</span><span>单价</span><span>总价</span></p>	
					          		<p class="d2" v-for="(item,index) in props.row.details">
					          			<span>{{item.pid}}</span>
					          			<span><img :src="item.opimg" width="80px"/></span>
					          			<span>{{item.pname}}</span>
					          			<span>{{item.opnum}}</span>
					          			<span>{{item.oprice}}</span>
					          			<span>{{item.total}}</span>
					          		</p>
          						</div>
				          	</el-form-item>
				        </el-form>
				      </template>
				    </el-table-column>
				    <el-table-column
				      	prop="oid"
				      	label="订单ID"
				      	width="140">
				    </el-table-column>
				    <el-table-column
				      	prop="uid"
				      	label="用户ID"
				      	width="120">
				    </el-table-column>
				    <el-table-column
				      	label="收货地址"
				      	width="140"
				      	prop="oaddress">
				    </el-table-column>
				    <el-table-column
				      	prop="uid"
				      	label="收货手机号"
				      	width="120">
				    </el-table-column>
				    <el-table-column
				      	prop="state"
				      	label="订单状态"
				      	width="100"
				      	:filters="[{text: '待收货', value: '待收货'}, {text: '完成', value: '完成'}, {text: '待付款', value: '待付款'}, {text: '待发货', value: '待发货'}]"
				      	:filter-method="filterState">
				    </el-table-column>
				    <el-table-column
				      	prop="time"
				      	label="时间"
				      	width="120">
				    </el-table-column>
				    <el-table-column label="操作" width="200" fixed="right">
				      	<template slot-scope="scope">
					        <el-button
					          	size="mini"
					          	@click="handleEdit(scope.$index, scope.row)" v-if="scope.row.state=='待发货'">确认发货
					        </el-button>
					        <el-button
					          	size="mini"
					          	type="danger"
					          	@click="handleStop(scope.$index, scope.row)" v-if="scope.row.state!='完成'">终止订单
					        </el-button>
				      	</template>
				    </el-table-column>
			  	</el-table>
			</div>
		</div>
	</main>
</template>

<script>
	import Vue from 'vue'
	let moment = require("moment");
	export default{
		data() {
	      	return {
	      		mid:'',
	      		mname:'',
	      		list:[],
	      		formInline: {
		          oid: '',
		          uid: '',
		        },
		        t:[],
		       	tableData:[],
		       	tableData1:[],
		       	tableData2:[],
		       	dialogFormVisible:false,
		       	formLabelWidth: '120px',
	      	}
    	},
    	methods: {
    		onSubmit() {
		        console.log(this.formInline);
		        let data2 = {'oid':this.formInline.oid,'uid':this.formInline.uid}
				this.$http.post('/api/userOrder/selectOrder',data2)
	            .then((res)=>{
			    	this.tableData = res.data
			    	for(let i in this.tableData){
			    		//时间格式
	               		this.tableData[i].time=moment(this.tableData[i].time).format('YYYY-MM-DD'); 
			    	}
			    	console.log(this.tableData)
			    	for(let i in this.tableData){
			    		let data3 = {'oid':this.tableData[i].oid}
			    		this.$http.post('/api/orderDetail/searchOid',data3)
			            .then((res)=>{
			            	if(res.data != -1){
			            		this.tableData1=res.data
	//					    	console.log(this.tableData1)
						    	Vue.set(this.tableData[i],"details",this.tableData1)
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
	      	filterState(value, row, column) {
	        	const property = column['property'];
	        	return row[property] === value;
	      	},
	      	handleEdit(index, row) {
		        console.log(index, row);
		        this.dialogFormVisible=true
		        let data4 = {'state':'待收货','oid':row.oid}
	    		this.$http.post('/api/userOrder/updateState',data4)
	            .then((res)=>{
	            	this.getMsg()
	            })
	       },
	       handleStop(index, row){
	       		let data5 = {'state':'完成','oid':row.oid}
	    		this.$http.post('/api/userOrder/updateState',data5)
	            .then((res)=>{
	            	this.getMsg()
	            })
	       },
	      	getMsg(){
	      		this.$http.post('/api/userOrder/selectAll')
	            .then((res)=>{
			    	this.tableData=res.data
			    	for(let i in this.tableData){
			    		//时间格式
	               		this.tableData[i].time=moment(this.tableData[i].time).format('YYYY-MM-DD'); 
			    	}
			    	
			    	console.log(this.tableData)
			    	for(let i in this.tableData){
			    		let data1 = {'oid':this.tableData[i].oid}
			    		this.$http.post('/api/orderDetail/searchOid',data1)
			            .then((res)=>{
			            	if(res.data != -1){
			            		this.tableData1=res.data
	//					    	console.log(this.tableData1)
						    	Vue.set(this.tableData[i],"details",this.tableData1)
			            	}
					    })
			    	}
			    	this.t=this.tableData
				})
	            .finally((f)=>{
	            	
	            })
	      	}
    	},
    	mounted(){
			this.getMsg()
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
	.detail p span{
		display: inline-block;
		width: 120px;
		text-align: center;
	}
	.detail .d2 span{
		width: 116px;
		margin-bottom: 5px;
	}
</style>