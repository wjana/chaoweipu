<template>
	<main>
		<textarea placeholder="请输入评语" v-model="msg" name="" rows="6" cols=""></textarea>
		<button class="ok" @click="ok">发表</button>
	
	</main>
</template>

<script>
//	import {SensitiveSearch} from '../../../static/js/word'
	export default{
		data(){
			
			return{
				msg:'',
				sensitiveWords:[]
			}
		},
		methods:{
			
         ok(){
         	//定义敏感词数组
         	var forbiddenArray = this.sensitiveWords;
         	function forbiddenStr(str){
		         var re = '';
		 
		         for(var i=0;i<forbiddenArray.length;i++){
		             if(i==forbiddenArray.length-1)
		                 re+=forbiddenArray[i];
		             else
		                 re+=forbiddenArray[i]+"|";
		         }
		         //定义正则表示式对象
		         //利用RegExp可以动态生成正则表示式
		         var pattern = new RegExp(re,"g");
		         if(pattern.test(str)){
		             console.log('有敏感词汇')
         			console.log(str)
		         }else{
		             console.log('正常')
		         }
         	}
//       	调用forbiddenStr函数，传入需要验证的字符串
         	forbiddenStr(this.msg)
         }
     },
		mounted(){
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
	
	
	
</style>