<template>
	<main>
		<vpay ref="pays"
    v-model="show"           
    @close="close"
    @forget="forget"
    @input-end="inputEnd"
></vpay>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				show:true
			}
		},
		methods:{
			close(){
				
			},
			forget(){
				
			},
			inputEnd(){
				
			}
		},
	mounted(){
//		this.$refs.pays.$success(true).then(res => {
//  console.log('支付成功')
//  this.$router.push('/success')
//}),
//this.$refs.pays.$fail('可以自定义错误提示，默认：支付密码错误') 
	}}
</script>

<style>
</style>