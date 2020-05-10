<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			24节气
			<span></span>
		</div>
		<div class="con">
			<h3>当「二十四节气」遇上潮汕美食，肚子一下就饿了</h3>
			<div class="successNav">
			  	<swiper :options="swipersuccess">
			   		<swiper-slide v-for="(item,index) in imgList"><img @click="cli(index)" :src="item.src"/></swiper-slide>
				</swiper>
			  	<div class="pagination">
					<!--<span v-for="(item,index) in imgList">{{item.name}}</span>-->	
			  	</div>
			</div>
		</div>
		<div class="introduction">
			<mt-popup
			  v-model="popupVisible"
			  position="center">
			  不同的节气，不同的季节，不同的天候，不同的农事规律，当然，还有不同的应时美食。现在就让我们来看看潮汕的二十四节气美食吧！
			</mt-popup>
		</div>
	</main>
</template>

<script>
	
	export default{
		data(){
		    return{
		    	
		      	imgList:[],
		      	popupVisible:'',
		        swipersuccess:{
		          	effect:"coverflow",
		          	grabCursor: true,
		          	watchSlidesProgress: true,
		          	centeredSlides: true,
		          	loop: true,
		          	loopedSlides: 3,
		          	slidesPerView: 3,
//		          	autoplay: {
//		            	delay: 3000,//自动播放速度
//		            	disableOnInteraction: false//鼠标移上去时是否还继续播放
//		          	},
		          	coverflowEffect: {
		          	  	rotate: 30,
			            stretch: 0,
			            depth: 60,
			            modifier: 6,
			            slideShadows : false
		          	},
		          	pagination:{
		          		el: '.pagination',
	                  	clickable :true,
	                  	//自定义分页类型
	                  	type : 'bullets',
	                  	//自定义分页
	                  	renderBullet: function (index, className) {
				          	let text
				          	switch(index){
					            case 0:text='立春';break;
					            case 1:text='雨水';break;
					            case 2:text='惊蛰';break;
					            case 3:text='春分';break;
					            case 4:text='清明';break;
					            case 5:text='谷雨';break;
					            case 6:text='立夏';break;
					            case 7:text='小满';break;
					            case 8:text='芒种';break;
					            case 9:text='夏至';break;
					            case 10:text='小暑';break;
					            case 11:text='大暑';break;
					            case 12:text='立秋';break;
					            case 13:text='处暑';break;
					            case 14:text='白露';break;
					            case 15:text='秋分';break;
					            case 16:text='寒露';break;
					            case 17:text='霜降';break;
					            case 18:text='立冬';break;
					            case 19:text='小雪';break;
					            case 20:text='大雪';break;
					            case 21:text='冬至';break;
					            case 22:text='小寒';break;
					            case 23:text='大寒';break;
					        }
					        return '<span class="' + className + '">' + text + '</span>';
				        },
		          	}
		      	},
		      	swipersuccess1:{
		      		autoplay: {
		            	delay: 3000,//自动播放速度
		            	disableOnInteraction: false//鼠标移上去时是否还继续播放
		          	},
		          	loop: true,
		          	parallax: true
		      	},
		    }
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			cli(i){
				this.$toast({
				  	message: this.imgList[i].menu,
				  	iconClass: 'mintui mintui-field-success',
				  	position: 'center',
					duration: 5000
				});
				console.log(i)
			}
		},
		computed: {
		    swiper() {
		      return this.$refs.mySwiper.swiper;
		    }
		},
		mounted(){
			this.$http.get('./static/data/24img.json')
		    .then((res)=>{
		     	this.imgList=res.data.imgList;
		     	console.log(this.imgList)
		    })
		    .catch(()=>{
		    
		    })
		    .finally((f)=>{
		    	
		    })
		}
	}
</script>

<style scoped="">
	.successNav .swiper-slide.swiper-slide-active img {
	  	transform: scaleX(1.6);
	  	border-radius: 5px;
	}
	.successNav .swiper-slide.swiper-slide-duplicate-prev img,
	.successNav .swiper-slide.swiper-slide-next img,
	.successNav .swiper-container-3d .swiper-slide-shadow-right,
	.successNav .swiper-container-3d .swiper-slide-shadow-left,
	.successNav .swiper-slide.swiper-slide-prev img,
	.successNav .swiper-slide.swiper-slide-prev{
	  	border-radius: 5px !important;
	}
	.swiper-container {
		height: 100%;
	}
	.successNav .swiper-container{
		height: 63vh;
		line-height: 63vh;
	}
	.swiper-slide img{
		width: 100%;
		height: 99%;
		border: 1px solid #999999;
	}	
	main{
		position: relative;
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
		z-index: 9;
	}
	.head i{
		position: relative;
		left: 10px;
	}
	.con{
		padding-top: 14vw;
	}
	h3{
		padding: 5px 15px;
		text-align: left;
	}
	.mint-popup{
	    background-color: rgba(0,0,0,0.01);
		color: white;
		line-height: 1.5;
		border: 3px solid #C93756;
		padding: 10px;
	}
	.pagination{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
	}
	/deep/ .pagination{
		margin: 15px 0;
	}
	/deep/ .swiper-pagination-bullet{
		width: 10%;
		height: 25px;
		border-radius: 10px;
		margin: 3px 3px;
		line-height: 25px;
		border:1px solid #F3D19E;
		background-color: white;
		color: #666;
		overflow: hidden;
		opacity:1;
	}
	/deep/ .swiper-pagination-bullet-active{
		background: none;
		background-color: #FAECD8;
		border:2px solid #F3D19E;
		color: black;
	}
</style>