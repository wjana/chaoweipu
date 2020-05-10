<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			<router-link to="/index"><img src="../../../static/img/logo.png"/></router-link>
		</div>
		<div class="loop" :style="{'backgroundImage':'url('+ pic + ')'}">
			<!--<img v-bind:src="pic" alt=""/>-->
		</div>
		<h2>
			<img src="../../../static/img/菜品.png"/>{{this.name}}
			<span class="my">
				<span @click="star()">
					<i v-show="s1" class="fa fa-thumbs-o-up" aria-hidden="true"></i>
					<i v-show="s2" class="fa fa-thumbs-up" aria-hidden="true"></i>
					{{collect}}
				</span>
				<!--<span @click="thumbs()">
					<i v-show="th1" class="fa fa-thumbs-o-up" aria-hidden="true"></i>
					<i v-show="th2" class="fa fa-thumbs-up" aria-hidden="true"></i>
					{{collect}}
				</span>-->
				<!--<el-badge :value="12" class="item">
				  	<el-button size="small">评论</el-button>
				</el-badge>-->
			</span>
		</h2>
		<h3>
			<i class="fa fa-address-card-o" aria-hidden="true"></i>
			<span class="big">提供者：</span>{{this.cauthor}}
		</h3>
		<div class="info">
			<p class="big"><i class="fa fa-info-circle" aria-hidden="true"></i>简介：</p>
			<p>{{this.info}}</p>
			<p class="big"><i class="fa fa-shopping-bag" aria-hidden="true"></i>用料：</p>
			<table>
				<tr v-for="(item,index) in mat">
					<td>{{item.things}}</td>
					<td>{{item.weight}}</td>
				</tr>
			</table>
			<p class="big">
				<i class="fa fa-hand-o-right" aria-hidden="true"></i>做法：
				<button v-bind:class="{fen:isfen}" class="change" @click="fen()">看步骤图片</button>
				<button class="change" @click="bufen()">省略步骤图片</button>
				<button class="ringBtn">
					<div @click="startTime" :class="{animated:isanimated, shake:isanimated}">
						<i class="fa fa-bell-o fa-2x" aria-hidden="true"></i>
						<span v-show="time">
							<i>{{min}}</i>:<i>{{sec}}</i>
						</span>
						<!--<audio src="../../../static/audio/铃声-卡农.mp3">浏览器无效</audio>-->
			        </div>
			      
			        <div>
				      	<mt-datetime-picker ref="pickerStartTime" type="time" v-model="pickerValueStartTime" @confirm="handleConfirmStartTime"></mt-datetime-picker>
				    </div>
				</button>
				<button class="stopMusic" @click="stopMusic" v-show="musicShow">
		        	<i class="fa fa-bell-slash" aria-hidden="true"></i>
		        </button>
			</p>
			
			<p v-show="zuofa1" class="zf1">
				<i v-for="(item,index) in step">
					<i class="f9906f">{{item.stepNum}}</i>
					{{item.stepInfo}}
					<img v-bind:src="item.stepImg" alt=""/>
					<br/>
				</i>
				
			</p>
			
			<div v-show="zuofa2">
			  	<el-steps direction="vertical" :active="active" finish-status="success">
				    <el-step :description="item.stepInfo" v-for="(item,index) in step"></el-step>
				</el-steps>
			  	<el-button style="margin-top: 12px;" @click="next">下一步</el-button>
			</div>
		</div>
		<div class="footLogo">
			<p class="l">——烹调味尽东南美</p>
			<p class="r">最是工夫茶与汤——</p>
		</div>
		<div id="gotop" @click="gotop()">
			<!--<i class="fa fa-angle-double-up" aria-hidden="true"></i>-->
			<img src="../../../static/img/顶部.png"/>
		</div>
		<div class="Unaudited" v-if="Unaudited">
			<img src="../../../static/img/未审核.png"/>
		</div>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				name:'',
				cauthor:'',
				pic:'',
				info:'',
				collect:0,
				th1:true,
				th2:false,
				s1:true,
				s2:false,
				active: 0,
				zuofa1:true,
				zuofa2:false,
				isfen:true,
				pickerValueStartTime: '',
				time:true,
				min:'00',
				sec:'00',
				time:[],
				timetimer:null,
				mat:[],
				step:[],
				oidlist:[],
				Unaudited:false,
				isanimated:false,
				musicShow:false,
				uid:''
			}
		},
		methods:{
			star(){
				let data3 = {'uid':this.uid, 'cid':this.id}
				if(this.s1==true){
					this.collect++
		            this.$http.post('/api/collection/add',data3)
		            .then((res)=>{
		            	
		            })
				}else{
					this.collect--
					this.$http.post('/api/collection/delete',data3)
		            .then((res)=>{
		            	
		            })
				}
				this.s1=!this.s1
				this.s2=!this.s2
				
				let data1 = {'collect':this.collect, 'cid':this.id}
	            this.$http.post('/api/menu/updateCollect',data1)
	            .then((res)=>{
	            	
	            })
	        },
			next() {
//				console.log(this.step.length)
		        if (this.active++ > this.step.length) this.active = 0;
		   	},
		   	fen(){
		   		this.zuofa1=true
		   		this.zuofa2=false
		   	},
		   	bufen(){
		   		this.zuofa1=false
		   		this.zuofa2=true
		   		this.isfen=false
		   	},
			back(){
				this.$router.go(-1)
			},
			startTime () {
				this.time=true
		      	this.$refs.pickerStartTime.open()
		    },
		    handleConfirmStartTime () {
		    	this.musicShow=false
		    	clearInterval(this.timetimer);
//		      	console.log(this.pickerValueStartTime)
		      	this.time=this.pickerValueStartTime.split(':')
//		      	console.log(this.time)
		      	this.min=this.time[0]
		      	this.sec=this.time[1]
		      	this.timetimer = setInterval(()=>{
	                if(this.sec<=0 && this.min!=0){
	                    this.min=this.min-1;
	                    this.sec=59
	                }else{
	                	if(this.sec<=0 && this.min<=0){
	                	 	clearInterval(this.timetimer);
	                	 	console.log('时间到了')
	                	 	this.isanimated=true
	                	 	
	                	 	this.gamemuiscs1 = new Audio("../../../static/audio/铃声-卡农.mp3");
        					this.gamemuiscs1.play();
//      					this.gamemuiscs1.pause();
	                	 	
	                	 	this.musicShow=true
	                	}else{
	                		this.sec--;
	                	}
	                }
	                if(this.sec.toString().length<2){
	                	this.sec='0'+this.sec
	                }
	                if(this.min.toString().length<2){
	                	this.min='0'+this.min
	                }
					console.log(this.sec.toString().length)
	            }, 1000);
	        },
	        stopMusic(){
	        	this.gamemuiscs1.pause();
	        	this.musicShow=false
	        	this.isanimated=false
	        },
	        gotop(){
				document.documentElement.scrollTop = document.body.scrollTop = 0;
			}
		},
		mounted(){
			document.onscroll=null;
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
			document.documentElement.scrollTop=0;
			window.pageYOffset=0;
			document.body.scrollTop=0;
			
			this.id=this.$route.params.cid
            console.log(this.$route.params)
            
            this.cookies.getCookie()
			this.uid=this.cookies.getCookie()[0]
            
            let data = {'cid':this.id}
			
			this.$http.post('/api/menu/searchCid',data)
            .then((res)=>{
                if(res.data == -1) {
					this.$toast({
			          	message: '搜索结果为空',
			          	position: 'center',
						duration: 1500
			        })
                }else {
                	this.list=res.data
                	this.name=this.list[0].cname
                	this.pic=this.list[0].cimg
                	this.cauthor=this.list[0].cauthor
                	this.collect=this.list[0].collect
                	this.info=this.list[0].cinfo
                	if(this.list[0].examine=='未审核'){
                		this.Unaudited=true
                	}
                	console.log(this.list)
                }
            })
            .finally((f)=>{
          	
            })
			
			this.$http.post('/api/material/searchCid',data)
            .then((res)=>{
                this.mat=res.data
            })
            .finally((f)=>{
            	
            })
            
            this.$http.post('/api/step/searchCid',data)
            .then((res)=>{
               	this.step=res.data
            })
            .finally((f)=>{
            	
            })
            
            let data2 = {'uid':this.uid,'cid':this.id}
            this.$http.post('/api/collection/searchUid',data2)
            .then((res)=>{
               	if(res.data == -1) {
               		this.s1=true
					this.s2=false
               	}else{
               		this.s1=false
					this.s2=true
               	}
            })
            .finally((f)=>{
            	
            })
		}
	}
</script>

<style scoped="">
	.head{
		padding: 5px 15px;
		text-align: left;
		border-bottom: 1px solid #F2F2F2;
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 9;
		background-color: white;
		width: 100%;
	}
	.head i{
		margin-right: 15px;
	}
	.loop{
		padding-top: 58px;
		width: 100%;
		height: 300px;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}
	.loop img{
		width: 100%;
	}
	h2,.info{
		text-align: left;
	}
	.fa{
		margin-right: 5px;
	}
	.fa-certificate{
		color: #ff8936;
	}
	.fa-info-circle{
		color: #9c5333;
	}
	.fa-shopping-bag{
		color: #ca6924;
	}
	.fa-hand-o-right{
		color: #f9906f;
	}
	h2{
		padding: 15px 15px 0 15px;
		position: relative;
		top: -30px;
		margin: 0 auto;
		width: 85%;
		background-color: white;
		border-radius: 15px 15px 0 0;
	}
	h2 img{
		margin-right: 8px;
	}
	h2 .my{
		float: right;
		font-size: 18px;
		line-height: 2;
		color: red;
	}
	h3{
		text-align: left;
		padding: 0 15px 20px 15px;
		margin-top: -10px;
		color: #C93756;
		font-weight: 400;
		font-size: 16px;
	}
	h3 i{
		color: #409EFF;
	}
	h3 .big{
		color: black;
		font-weight: bold;
	}
	.info{
		padding: 0 15px 50px 15px;
		margin-top: -25px;
	}
	.info p{
		margin-bottom: 5px;
		line-height: 1.8;
	}
	.info .big{
		font-size: 18px;
		font-weight: bold;
		margin-top: 25px;
		position: relative;
	}
	table{
		width: 100%;
		border-collapse:collapse;
	}
	table tr{
		border-bottom: 1px solid #F2F2F2;
	}
	table td{
		width: 50%;
		padding: 5px 0;
	}
	.el-button:active {
		color: #f9906f;
		border-color: #f9906f;
	}
	.el-button:focus, .el-button:hover {
		color: #f9906f;
		border-color: burlywood;
		background-color: cornsilk;
	}
	.change{
		color: #f9906f;
		border: 1px solid #F2F2F2;
		padding: 5px 10px;
		border-radius: 20px;
		background-color: white;
	}
	.fen, .change:focus, .change:hover {
		color: #f9906f;
		border-color: burlywood;
		background-color: cornsilk;
	}
	.f9906f{
		color: #f9906f;
		font-size: 18px;
		margin-right: 5px;
	}
	.ringBtn{
		color: #C93756;
		float: right;
		border-radius: 50%;
		padding: 5px;
		text-align: center;
		background-color: #FAFAFA;
		box-shadow: 0px 2px 5px #CCCCCC;
	}
	.ringBtn span{
		display: block;
		margin-top: 2px;
	}
	/deep/ .mint-datetime-action{
		color: #C93756 !important;
	}
	/deep/ .el-step__description{
		font-size: 16px;
		padding: 0;
		margin-bottom: 15px;
	}
	/deep/ .el-step__main .is-wait{
		color: #999999;
	}
	.zf1{
		width: 100%;
	}
	.zf1 img{
		width: 100%;
	}
	.zf1>i{
		display: block;
		margin-bottom: 30px;
	}
	.footLogo{
		padding: 15px;
		color: #C93756;
		opacity: 0.7;
		font-size: 13px;
		background-color: #F2F2F2;
	}
	.l{
		text-align: left;
	}
	.r{
		text-align: right;
	}
	#gotop{
		border-radius: 50%;
		position: fixed;
		bottom: 50px;
		right: 20px;
		background-color: white;
		z-index: 10;
	}
	.Unaudited{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.4);
		position: fixed;
		top: 15vw;
		z-index: 9;
	}
	.Unaudited img{
		margin-top: 40vh;
	}
	.shake{
		animation-iteration-count: 5;
	}
	 .stopMusic{
	 	position: absolute;
	    right: 0px;
    	top: -32px;
	    background-color: white;
	    font-size: 28px;
	    color: #C93756;
	 }
</style>