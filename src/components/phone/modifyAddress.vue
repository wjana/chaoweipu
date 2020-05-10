<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			修改收货地址
			<span></span>
		</div>
		<ul>
			<li>
				<p>昵称</p>
				<input type="text" :value="nicheng" disabled="" />
			</li>
			<li>
				<p>手机号</p>
				<input type="text" :value="phone" disabled=""/>
			</li>
			<li>
				<p>所在省市</p>
				<v-distpicker :province="sheng" :city="shi" hide-area @selected='selected'></v-distpicker>
			</li>
			<li>
				<p>详细地址</p>
				<input type="text" v-model="dizhi" v-on="di()"/>
			</li>
		</ul>
		
		
		
		<div class="save" @click="save">保存</div>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
				addressList:[],
				nicheng:'',
				phone:'',
				dizhi:'',
				addr:'',
				addvalue:[],
				index:0,
				updateData:'',
				sheng:'',
				shi:''
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
		 	// 省市区三级联动
		    selected(data){
		        console.log(data)
		        this.city = data.province.value+data.city.value
				console.log(this.city)
			},
			di(){
				console.log(this.dizhi)
			},
			save(){
//				console.log(this.nicheng,this.phone,this.city,this.dizhi)
//				this.addr=this.addr+"|"+this.city+this.dizhi
//				console.log(this.addr)
				this.addvalue[this.index]=this.city+this.dizhi
	            
	            for(var i in this.addvalue){
	            	if(i==0){
	            		this.updateData=this.addvalue[0]
	            	}else{
	            		this.updateData = this.updateData+'|'+this.addvalue[i]
	            	}
				}
	            console.log(this.updateData)
				let data = {'address':this.updateData, 'uid':this.phone}
				console.log(data)
	            this.$http.post('/api/user/updateAddr',data)
	            .then((res)=>{
	            	if(res.status == 200){
		            	this.$toast({
				          	message: '保存成功',
				          	position: 'center',
							duration: 1500
				        })
	                    setTimeout(function(){
	                        this.$router.push({path: '/address'})
	                    }.bind(this),1000)
	                }
	            })
	            .finally((f)=>{
					
	            })
	            
			}
		},
		mounted(){
			this.cookies.getCookie()
	    	this.phone=this.cookies.getCookie()[0]
			
			this.addvalue=this.$route.params.address
			this.index = this.$route.params.index
//			console.log(this.addvalue,this.index)
			this.sheng=this.addvalue[this.index].substring(0,this.addvalue[this.index].indexOf("省")+1)
			this.shi=this.addvalue[this.index].substring(this.addvalue[this.index].indexOf("省")+1,this.addvalue[this.index].indexOf("市")+1)
			console.log(1,this.sheng,this.shi)
			
			let data = {'uid':this.phone}
            this.$http.post('/api/user/searchUid',data)
            .then((res)=>{
               	this.list=res.data
               	console.log(this.list)
               	this.nicheng=this.list[0].uname
               	this.addr = this.list[0].address
//             	var addrs = new Array()
//             	addrs = this.addr.split("|")
//             	for(var i in addrs){
//             		console.log(addrs[i]+"<br/>")
//             	}
				
				
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
	}
	.head i{
		position: relative;
		left: 10px;
	}
	ul{
		padding-top: 20vw;
		padding-bottom: 50px;
		background-color: white;
	}
	ul li{
		width: 100%;
		text-align: left;
		padding: 10px 30px;
		box-sizing: border-box;
	}
	li p{
		margin-bottom: 10px;
	}
	li input{
		width: 100%;
		outline: none;
		line-height: 1.5;
		font-size: 18px;
		border: none;
		border-bottom: 1px solid #C93756;
	}
	input:disabled {
	    background-color: white;
	    color: #999999;
	}
	
	.save{
		width: 70%;
		margin: 0 auto;
		background-color: #C93756;
		line-height: 2.5;
		color: white;
	}
</style>