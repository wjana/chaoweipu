<template>
	<main>
		<div class="">
			<p><img src="../../../static/img/ring.png"/></p>
			<span>{{countDownList}}</span>:
			<!--<span>{{sec}}</span>-->
		</div>
		<div class="">
			<span @click="on()">播放</span>
			<span @click="stop()">暂停</span>
			<span @click="again()">重新开始</span>
		</div>
		<input type="time" name="" id="" value="" />
	</main>
</template>

<script>
	export default{
		data(){
			return{
				min:10,
				sec:59,
				timer:'',
				countDownList: '00天00时00分00秒',
　　　　　　		actEndTime: '2020-1-1 18:50:00'
			}
		},
		created(){
			this.countDown();
		},
		methods:{
			on(){
				
			},
			stop(){
				
			},
			again(){
				
			},
			timeFormat(param) {
　　　　　　return param < 10 ? '0' + param : param;
　　　　},
　　　　countDown(it) {
　　　　　　var interval = setInterval(() => {
　　　　　　　　// 获取当前时间，同时得到活动结束时间数组
　　　　　　　　let newTime = new Date().getTime();
　　　　　　　　// 对结束时间进行处理渲染到页面
　　　　　　　　let endTime = new Date(this.actEndTime).getTime();
　　　　　　　　let obj = null;
　　　　　　　　// 如果活动未结束，对时间进行处理
　　　　　　　　if (endTime - newTime > 0) {
　　　　　　　　　　let time = (endTime - newTime) / 1000;
　　　　　　　　　　// 获取天、时、分、秒
　　　　　　　　　　let day = parseInt(time / (60 * 60 * 24));
　　　　　　　　　　let hou = parseInt(time % (60 * 60 * 24) / 3600);
　　　　　　　　　　let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
　　　　　　　　　　let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
　　　　　　　　　　obj = {
　　　　　　　　　　　　day: this.timeFormat(day),
　　　　　　　　　　　　hou: this.timeFormat(hou),
　　　　　　　　　　　　min: this.timeFormat(min),
　　　　　　　　　　　　sec: this.timeFormat(sec)
　　　　　　　　　　};
　　　　　　　　} else { // 活动已结束，全部设置为'00'
　　　　　　　　　　obj = {
　　　　　　　　　　　　day: '00',
　　　　　　　　　　　　hou: '00',
　　　　　　　　　　　　min: '00',
　　　　　　　　　　　　sec: '00'
　　　　　　　　　　};
　　　　　　　　　　clearInterval(interval);
　　　　　　　　}
　　　　　　　　this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒';
　　　　　　}, 1000);
　　　　}
	}
	}
</script>

<style scoped="">
</style>