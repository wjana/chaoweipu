<template>
	<main>
		<!--<div class="successNav">
		  	<swiper :options="swipersuccess">
		   		<swiper-slide><router-link to="/"><img src="../../static/img/img11.jpg"/></router-link></swiper-slide>
				<swiper-slide><router-link to="/"><img src="../../static/img/img11.jpg"/></router-link></swiper-slide>
				<swiper-slide><router-link to="/"><img src="../../static/img/img11.jpg"/></router-link></swiper-slide>
		    </swiper>
		</div>
		<div class="successNav1">
			<div style="background-image:url(../../static/img/img8.jpg)" data-swiper-parallax="-23%" data-swiper-parallax-duration="3000"></div>
		  	<swiper :options="swipersuccess1">
		   		<swiper-slide><router-link to="/"><div data-swiper-parallax="-100">Slide 1</div></router-link></swiper-slide>
				<swiper-slide><router-link to="/"><div data-swiper-parallax="-100">Slide 2</div></router-link></swiper-slide>
				<swiper-slide><router-link to="/"><div data-swiper-parallax="-100">Slide 3</div></router-link></swiper-slide>
		    </swiper>
		</div>
		<div class="">
			拍照片
			发作品
		</div>-->
	</main>
</template>

<script>
	
	export default{
		data(){
		    return{
		        swipersuccess:{
		          	effect:"coverflow",
		          	grabCursor: true,
		          	watchSlidesProgress: true,
		          	centeredSlides: true,
		          	loop: true,
		          	loopedSlides: 3,
		          	slidesPerView: 3,
		          	autoplay: {
		            	delay: 3000,//自动播放速度
		            	disableOnInteraction: false//鼠标移上去时是否还继续播放
		          	},
		          	coverflowEffect: {
		          	  	rotate: 30,
			            stretch: 0,
			            depth: 60,
			            modifier: 6,
			            slideShadows : false
		          	}
		      	},
		      	swipersuccess1:{
		      		autoplay: {
		            	delay: 3000,//自动播放速度
		            	disableOnInteraction: false//鼠标移上去时是否还继续播放
		          	},
		          	loop: true,
		          	parallax: true
		      	}
		    }
		},
		computed: {
		    swiper() {
		      return this.$refs.mySwiper.swiper;
		    }
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
		height: 150px;
		line-height: 150px;
	}
	.successNav{
		background-color: palegreen;
	}
	.successNav1{
	}
	.swiper-slide img{
		width: 100%;
	}	
</style>