<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			发表评价
			<span></span>
			<button class="ok" @click="ok">发表</button>
		</div>
		<div class="con">
			<h4>说说宝贝的购买体验吧~</h4>
			<p class="oid">订单编号：{{list.oid}}</p>
			<section v-for="(item,index) in list">
				<p class="title">
					<i class="fa fa-list-alt" aria-hidden="true"></i>
					<img :src="item.opimg" width="60px"/>
					{{item.pname}}
				</p>
				<textarea placeholder="请输入评语" @input="setValue($event.target)" v-model="item.msg" v-on:input="change(index)" name="" rows="6" cols=""></textarea>
				
			</section>
		</div>
	</main>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	let moment = require("moment");
	export default{
		data(){
			return{
				list:[],
				msg:'',
				focusTextarea:'',
				userlist:'',
				uid:'',
				uname:'',
				uimg:'',
				time:'',
				showBtn:true,
				dis:false,
				sensitiveWords:[],
				w:''
			}
		},
		methods:{
			back(){
//				this.$router.go(-1)
				this.$router.push('myOrder')
			},
			forbiddenStr(str){
		        var re = '';
		 		for(var i=0;i<this.sensitiveWords.length;i++){
		            if(i==this.sensitiveWords.length-1)
		                re+=this.sensitiveWords[i];
		            else
		                re+=this.sensitiveWords[i]+"|";
		        }
		        //定义正则表示式对象
		        //利用RegExp可以动态生成正则表示式
		        var pattern = new RegExp(re,"g");
		        str=str.replace(pattern,function(s){
	    			var str = "";
    				for(var i = 0; i < s.length; i++){
        				str += "*";
    				}
    				return str
		        })
		        return str
         	},
         	setValue(target){
         		target.value=this.forbiddenStr(target.value)
         	},
         	change(i){
         		this.list[i].msg=this.forbiddenStr(this.list[i].msg)
         		console.log(this.list[i].msg)
         	},
			ok(){
				console.log(this.list)
				var a = new Date()
				this.time=moment(a).format('YYYY-MM-DD HH:mm:ss')
				for(let i in this.list){
					let data2 = {'pid':this.list[i].pid,'uid':this.uid,'img':this.uimg,'evaluation':this.list[i].msg,'time':this.time}
					this.$http.post('/api/evaluate/add',data2)
		            .then((res)=>{
		            	let data3 = {'state':'完成', 'oid':this.list[i].oid}
			            this.$http.post('/api/userOrder/updateState',data3)
			            .then((res)=>{
			            	this.$toast({
					          	message: '发布成功',
					          	position: 'center',
								duration: 1000
					       })
	                        setTimeout(function(){
	                            this.$router.push({path: '/my'})
	                        }.bind(this),1000)
			            })
			            .finally((f)=>{
							
			            })
//				    	
					})
		            .finally((f)=>{
		            	
		            })
				}
			}
		},
		mounted(){
			this.list=this.$route.params.evaluateList
			for(let i in this.list){
				this.list[i].msg=''
			}
			console.log(this.list)
			
			this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
			
			let data1 = {'uid':this.uid}
			this.$http.post('/api/user/searchUid',data1)
            .then((res)=>{
		    	this.userlist=res.data
		    	this.uname=this.userlist[0].uname
		    	this.uimg=this.userlist[0].uimg
			})
            .finally((f)=>{
            	
            })
            
            //检测敏感词汇
            this.$http.get('./static/data/word.txt')
		    .then((res)=>{
		     	this.sensitiveWords=res.data;
		     	console.log(this.sensitiveWords)
		    })
		    .catch(()=>{
		    
		    })
		    .finally((f)=>{
		    	
		    })
		}
	}
</script>

<style scoped="">
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
		z-index: 9;
	}
	.head i{
		position: relative;
		left: 10px;
	}
	.con{
		padding: 0 15px;
		padding-top: 14vw;
		text-align: left;
	}
	.con h4{
		text-align: left; 
	}
	.oid{
		margin: 10px 0;
	}
	.con section{
		box-shadow: 3px 3px 3px rgba(0,0,0,0.1);
		border-radius: 5px;
		overflow: hidden;
		padding: 10px 10px;
		border: 1px solid #F2F2F2;
		margin-bottom: 10px;
	}
	.title img{
		margin: 0 10px 0 10px;
		border-radius: 15px;
	}
	textarea{
		width: 100%;
		border: 1px ;
		background-color: #FAFAFA;
		margin-top: 20px;
		outline: none;
		padding: 10px;
		box-sizing: border-box;
		font-size: 15px;
	}
	.ok{
		background-color: #C93756;
		color: white;
		padding: 5px 10px;
		position: absolute;
		right: 10px;
	}
	.dis{
		background-color: #D9D9D9;
	}
</style>