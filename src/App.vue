<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {                                    
    return {
      reload: this.reload                                              
    }
	},
	data() {
    return{
      isRouterAlive: true
    }
	},
	methods: {
    reload () {
      this.isRouterAlive = false;
    	this.$nextTick(function () {
      	this.isRouterAlive = true;
      }) 
    }
  }
}
</script>

<style>
*{
	margin:0;
	padding:0;
}
body{
	/*max-width: 750px;*/
	height: auto;
	margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
	height: auto;
	font-size: 16px;
}
ul {
  list-style-type: none;
}
li {
  display: inline-block;
  list-style:none;
}
em,i{
	font-style:normal;
}
img{
	border:0;
	vertical-align:middle;
} 
p{
	word-wrap:break-word;
}
a{
	color:#333;
	text-decoration: none;
}
button{
	border: none;
	outline: none;
}

	.distpicker-address-wrapper select{
		border: 1px solid rgba(201, 55, 86, 0.5);
	}
	.distpicker-address-wrapper select option{
    font-size: 14px;
	}
	
	.el-checkbox__inner:hover {
    border-color: #c93756;
	}
	.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #c93756;
    border-color: #c93756;
	}
	.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #c93756;
	}
	
</style>
