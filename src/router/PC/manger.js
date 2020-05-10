import Vue from 'vue'
import Router from 'vue-router'

import PCIndex from '@/components/PC/PCIndex.vue'
import pLogin from '@/components/PC/pLogin.vue'
import userMan from '@/components/PC/userMan.vue'
import menuMan from '@/components/PC/menuMan.vue'
import welcome from '@/components/PC/welcome.vue'
import mangerMan from '@/components/PC/mangerMan.vue'
import personalInfo from '@/components/PC/personalInfo.vue'
import orderMan from '@/components/PC/orderMan.vue'
import foodManu from '@/components/PC/foodManu.vue'
import examine from '@/components/PC/examine.vue'

Vue.use(Router)

let manger = new Router({
	routes: [
		{
			path:'/',
			redirect:'/pLogin'
		},
		{
			name:'PCIndex',
			path:'/PCIndex',
			component:PCIndex,
			children:[
				{name:'userMan',path:'/userMan',component:userMan},
				{name:'menuMan',path:'/menuMan',component:menuMan},
				{name:'welcome',path:'/welcome',component:welcome},
				{name:'mangerMan',path:'/mangerMan',component:mangerMan},
				{name:'personalInfo',path:'/personalInfo',component:personalInfo},
				{name:'orderMan',path:'/orderMan',component:orderMan},
				{name:'foodManu',path:'/foodManu',component:foodManu},
				{name:'examine',path:'/examine',component:examine},
			]
		},
		{name:'pLogin',path:'/pLogin',component:pLogin},
	]
})

export default manger