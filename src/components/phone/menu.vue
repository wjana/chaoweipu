<template>
	<main>
		<div class="searchDiv">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			<div class="searchBox">
				<!--<select class="way">-->
					<!--<option value="">菜谱名</option>-->
				  	<!--<option v-for="(item,index) in wayList" v-bind:value="index" v-text="item" ></option>-->
				  	<!--<i class="fa fa-caret-down" aria-hidden="true"></i>-->
				<!--</select>-->
				
				<ul class="searchWay">
			      	<li class="way1" v-on:click.stop="arrowDown">
				        {{unitName}}
				        <i></i>
			      	</li>
			      	<li class="wayList" v-show="isShowSelect" v-for="(item,index) in wayList" @click.stop="select(item)">
			      		{{item}}
			        </li>
			    </ul>

				
				
				<input v-model="msg" v-on:input="change" @keydown.enter="sousuo" placeholder="请输入..." />
				<img @click="clear" v-if="show" src="../../../static/img/叉.png"/>
				<button @click="sousuo()">搜索菜谱</button>
			</div>
			<router-link to="/index"><i class="fa fa-home" aria-hidden="true"></i></router-link>
		</div>
		<ul class="menus">
			<li v-for="(item,index) in list" @click="food(index)">
				<!--<router-link to="/food">-->
					<img :src="item.cimg"/>
			    	<div>
				      	<p>{{item.cname}}</p>
				      	<p class="rcDes">{{item.cinfo}}</p>
				      	<span class="cau">{{item.cauthor}}</span>
			    	</div>
				<!--</router-link>-->
			</li>
		</ul>
		
		<div id="gotop" @click="gotop()">
			<!--<i class="fa fa-angle-double-up" aria-hidden="true"></i>-->
			<img src="../../../static/img/顶部.png"/>
		</div>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				msg:'',
				foodID:'',
				show:false,
				wayList:["菜谱名","用料名"],
				isShowSelect: false,
		        unitName:'菜谱名'
			}
		},
		methods:{
			arrowDown() {
	        	this.isShowSelect = !this.isShowSelect;
	      	},
	      	select(item) {
		        this.isShowSelect = false;
		        this.unitName = item;
	      	},
			gotop(){
				document.documentElement.scrollTop = document.body.scrollTop = 0;
			},
			back(){
				this.$router.go(-1)
			},
			sousuo(){
				if(this.unitName == '菜谱名'){
					let data = {'cname':this.msg}
					this.$http.post('/api/menu/searchCname',data)
		            .then((res)=>{
		                if(res.data == -1) {
							this.$toast({
					          	message: '搜索结果为空',
					          	position: 'center',
								duration: 1500
					        })
		                }else {
		                	this.list=res.data
		                }
		            })
		            .finally((f)=>{
		          	
		            })
				}
				if(this.unitName == '用料名'){
					let data1 = {'things':this.msg}
					this.$http.post('/api/material/searchThings',data1)
		            .then((res)=>{
		                if(res.data == -1) {
							this.$toast({
					          	message: '搜索结果为空',
					          	position: 'center',
								duration: 1500
					        })
		                }else {
		                	this.list=[]
					        var thingList=res.data
		                	for(var i in thingList){
		                		let data2 = {'cid':thingList[i].cid}
								this.$http.post('/api/menu/searchCid1',data2)
					            .then((res)=>{
					                this.list.push(res.data[0])
					            })
		                	}
		                }
		            })
		            .finally((f)=>{
		          	
		            })
				}
	            
			},
			change(){
				console.log(this.msg)
				this.show=true
			},
			clear(){
				this.msg=''
				this.show=false
				this.$http.post('/api/menu/search')
	            .then((res)=>{
	                this.list=res.data
	            })
	            .finally((f)=>{
        	
	            })
			},
			food(i){
				this.foodID=this.list[i].cid
				console.log(this.foodID)
				this.$router.push({name: 'food',params:{cid:this.foodID}})
			}
		},
		mounted(){
			this.$http.post('/api/menu/search')
            .then((res)=>{
                this.list=res.data
//              console.log(this.list)
            })
            .finally((f)=>{
//          	
            })
            
            document.onscroll=null;
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
			document.documentElement.scrollTop=0;
			window.pageYOffset=0;
			document.body.scrollTop=0;
		}
	}
</script>

<style scoped="">
	.searchDiv{
		width: 100%;
		padding: 10px 15px;
		text-align: left;
		border-bottom: 1px solid #F2F2F2;
		display: flex;
		align-items: center;
		position: fixed;
		background-color: white;
		box-sizing: border-box;
	}
	.searchBox{
		display: inline-block;
		margin-left: 20px;
		border: 1px solid #C93756;
		border-radius: 50px;
		width: 80%;
		height: 100%;
		position: relative;
	}
	.searchBox input{
		border: none;
		outline: none;
		padding-left: 55px;
		height: 27px;
		width: calc(70% - 55px);
	}
	.searchBox img{
		position: absolute;
		right: 22vw;
		top: 20%;
	}
	.searchBox button{
		height: 100%;
		background-color: #C93756;
		color: white;
		padding: 5px 10px;
		border-radius: 20px;
		float: right;
		font-size: 13px;
	}
	.searchWay{
		width: 50px;
		text-align: center;
		display: inline-block;
		color: white;
		font-size: 13px;
		position: absolute;
		line-height: 2.2;
	}
	.searchWay .way1{
		border-radius: 50px;
		width: 100%;
		height: 100%;
		background-color: #C93756;
	}
	.way1 i{
		display: inline-block;
		width:0; 
        height:0;
        border-width:3px;
        border-style:solid;
        border-color:transparent white white transparent;
        margin-left: -4px;
	}
	.searchWay .wayList{
		z-index: 9;
		background-color: #C93756;
		width: 100%;
	}
	.searchDiv a i{
		font-size: 24px;
		position: relative;
		right: -15px;
		color: #C93756;
		opacity: 0.7;
	}
	.menus {
		padding: 50px 13px;
		column-count: 2;
		column-gap: 10px;
	}
	.menus li{
		width: 100%;
		margin-top: 10px;
	  	border: 1px solid #eeeeee;
	  	border-radius: 5px;
	  	box-shadow: 3px 3px 5px rgb(0, 0, 0,0.3);
	  	overflow: hidden;
	}
	.menus li img{
	  	width: 100%;
	}
	.menus li p{
	  	padding: 0 10px;
	  	line-height: 2;
	}
	.menus li .rcDes{
	  	font-size: 15px;
	  	color: #807d7d;
	  	white-space: nowrap;
	  	overflow: hidden;
	  	text-overflow: ellipsis;
	  	text-align: left;
	}
	
	#gotop{
		border-radius: 50%;
		position: fixed;
		bottom: 50px;
		right: 20px;
		background-color: white;
	}
	.cau{
		color: #C93756;
		float: right;
		font-size: 14px;
		/*background-color: #C93756;*/
		padding: 0 10px 5px 0;
	}
</style>