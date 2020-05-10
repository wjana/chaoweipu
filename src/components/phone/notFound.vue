<template>
	<main>
		<div class="sorry">
			<img src="../../../static/img/空 (1).png"/>
			<p><img src="../../../static/img/Sorry.png"/></p>
			<p>没有搜索到相关信息o(╥﹏╥)o</p>
			<span @click="back()">点击返回</span>
		</div>
		
	</main>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
		}
	}
</script>

<style scoped="">
	.sorry{
		margin-top: 50%;
	}
	p{
		margin: 10px 0;
	}
	span{
		background: rgba(201,55,86,0.5);
		padding: 5px 10px;
		border-radius: 10px;
	}
</style>