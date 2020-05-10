<template>
	<main>
		<div class="">
			<p><img src="../../../static/img/支付宝-1.png"/></p>
			<i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
			<p>正在跳转到支付宝...</p>
		</div>
	</main>
</template>

<script>
	export default{
		mounted(){
			setTimeout(function(){
                this.$router.push({path: '/my'})
            }.bind(this),3000)
	    }
	}
</script>

<style scoped="">
	div{
		color: #108ee9;
		margin-top: 30vh;
	}
	p{
		margin: 10px 0;
	}
</style>