<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			我的收货地址
			<span></span>
		</div>
		<ul>
			<li v-for="(item,index) in newList">
				<i class="fa fa-map-marker" aria-hidden="true"></i>
				<div class="info">
					<p>
						<span class="name">{{item.uname}}</span>
						<span>{{item.uid}}</span>
					</p>
					<p class="ad">{{item.address}}</p>
				</div>
				<hr />
				<p class="modify">
					<span @click="modify(index)">编辑</span>
					<span @click="del(index)">删除</span>
				</p>
			</li>
		</ul>
		<router-link class="add" to="/addAddress">
			新增地址
		</router-link>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				addr:'',
				addrsList:[],
				newList:[],
				newaddr:'',
				uid:''
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			modify(i){
//				console.log(this.addrsList[i])
                this.$router.push({name: 'modifyAddress',params:{address:this.addrsList,index:i}})
			},
			del(i){
				this.addrsList.splice(i,1)
				console.log(this.addrsList)
				this.newaddr=''
				for(var j=0;j<this.addrsList.length;j++){
					if(j<this.addrsList.length-1){
						this.newaddr += this.addrsList[j]+'|'
					}else{
						this.newaddr += this.addrsList[j]
					}
				}
				console.log(this.newaddr)
				let data1 = {'address':this.newaddr,'uid':this.uid}
				this.$http.post('/api/user/updateAddr',data1)
	            .then((res)=>{
	                console.log('更新成功')
			               	
	                this.newList.pop(this.newList[i])
	                
				})
	            .finally((f)=>{
	            	
	            })
	        }
		},
		mounted(){
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			
			let data = {'uid':this.uid}
            this.$http.post('/api/user/searchUid',data)
            .then((res)=>{
               	this.list=res.data
               	this.addr = this.list[0].address
               	if(this.addr==''){
               		this.newList=[]
               	}
               	else{
               		this.addrsList = this.addr.split("|")
	               	for(var j in this.addrsList){
	               		this.newList.push({uid:this.list[0].uid,uname:this.list[0].uname,address:this.addrsList[j]})
	               	}
               	}
               	
            })
            .finally((f)=>{
            	
            })
		}
	}
</script>

<style scoped="">
	main{
		background-color: #fafafa;
		min-height: 100vh;
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
	}
	.head i{
		position: relative;
		left: 10px;
	}
	ul{
		padding-top: 12vw;
		margin-bottom: 30px;
	}
	ul li{
		background-color: white;
		width: 100%;
		text-align: left;
		padding: 10px 13px;
		box-sizing: border-box;
	}
	hr{
		border-color: #F2F2F2;
		opacity: 0.5;
	}
	.fa-map-marker{
		float: left;
		font-size: 26px;
		padding: 10px 0;
		color: #C93756;
	}
	.info{
		display: inline-block;
		margin-left: 10px;
	}
	.info p{
		margin-bottom: 5px;
	}
	.name{
		font-size: 20px;
		margin-right: 30px;
	}
	.ad{
		color: #333;
	}
	.modify{
		float: right;
		margin-top: 5px;
	}
	.modify span{
		display: inline-block;
		margin: 0 20px;
		color: #807D7D;
	}
	.add{
		display: block;
		width: 70%;
		line-height: 2.5;
		margin: 0 auto;
		background-color: #C93756;
		color: white;
	}
</style>