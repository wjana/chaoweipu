<template>
	<div class="text">
		<p>{{mid}} {{mname}}您好</p>
		<p>欢迎进入潮味谱后台管理系统！</p>
	</div>
</template>

<script>
	export default{
		data() {
	      	return {
	      		mid:'',
	      		mname:'',
	      		list:[]
	      	}
    	},
    	methods: {
    	},
    	mounted(){
    		this.cookies.getCookie()
			this.mid=this.cookies.getCookie()[0]
			
			let data1 = {'mid':this.mid}
			this.$http.post('/api/manger/searchManger',data1)
            .then((res)=>{
		    	this.list=res.data
		    	this.mname=this.list[0].mname
			})
            .finally((f)=>{
            	
            })
    	}
    }
</script>

<style scoped="">
	.text{
		margin-top: 100px;
		font-size: 28px;
		font-weight: bold;
	}
</style>