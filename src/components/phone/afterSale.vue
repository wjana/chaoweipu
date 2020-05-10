<template>
	<main>
		<div class="head">
			<i @click="back()" class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
			售后信息
			<span></span>
		</div>
		<div class="con">
			<p>亲亲有任何问题欢迎拨打下方电话联系我们或者添加客服微信进行反馈哦！</p>
			<p class="tleft">联系电话：<span>0663-5555555</span></p>
			<p class="tleft">客服微信号：<span>18418418418</span></p>
			<div class="imagePreview">
			  <el-image 
			    style="width: 200px; height: 200px"
			    :src="url" 
			    :preview-src-list="srcList">
			  </el-image>
			</div>
			<!--<p><img src="../../../static/img/客服.jpg"/></p>-->
			<p class="bottom tleft"><span>温馨提示：</span>如食材出现质量问题或者损坏，请记得拍照或者保留其他可供参考的凭据哦，我们会尽力完成您的诉求的！您的满意，是我们最大的动力！</p>
		</div>
	</main>
</template>

<script>
	export default{
		data(){
			return{
				url:'../../../static/img/客服.jpg',
				srcList: [
		          '../../../static/img/客服.jpg'
		        ]
		    }
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
	    },
		mounted(){
			
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
		padding: 20px 15px;
		padding-top: 14vw;
		box-sizing: border-box;
	}
	.tleft{
		text-align: left;
		margin-top: 10px;
	}
	.tleft span{
		color: #C93756;
	}
	.con img{
		width: 80%;
	}
	/deep/ .el-icon-circle-close{
		color: red;
	}
	.bottom{
		margin-top: 20px;
	}
	.bottom span{
		color: #e6a23c;
	}
</style>