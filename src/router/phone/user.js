import Vue from 'vue'
import Router from 'vue-router'

import test from '@/components/phone/test.vue'
import test1 from '@/components/phone/test1.vue'
import index from '@/components/phone/index.vue'
import login from '@/components/phone/login.vue'
import register from '@/components/phone/register.vue'
import my from '@/components/phone/my.vue'
import basket from '@/components/phone/basket.vue'
import menu from '@/components/phone/menu.vue'
import food from '@/components/phone/food.vue'
import twentyFour from '@/components/phone/twentyFour.vue'
import type from '@/components/phone/type.vue'
import shop from '@/components/phone/shop.vue'
import notFound from '@/components/phone/notFound.vue'
import address from '@/components/phone/address.vue'
import addAddress from '@/components/phone/addAddress.vue'
import modifyAddress from '@/components/phone/modifyAddress.vue'
import confirm from '@/components/phone/confirm.vue'
import editMenu from '@/components/phone/editMenu.vue'
import productDetails from '@/components/phone/productDetails.vue'
import pay from '@/components/phone/pay.vue'
import myOrder from '@/components/phone/myOrder.vue'
import charge from '@/components/phone/charge.vue'
import zhifubao from '@/components/phone/zhifubao.vue'
import modifyUserInfo from '@/components/phone/modifyUserInfo.vue'
import orderDetail from '@/components/phone/orderDetail.vue'
import myInfo from '@/components/phone/myInfo.vue'
import myPost from '@/components/phone/myPost.vue'
import afterSale from '@/components/phone/afterSale.vue'
import evaluate from '@/components/phone/evaluate.vue'
import popularMenu from '@/components/phone/popularMenu.vue'
import myCollection from '@/components/phone/myCollection.vue'

Vue.use(Router)

let user = new Router({
  routes: [
    {
			path:'/',
			redirect:'/login'
		},
		{
			path:'/index',
			component:index
		},
		{
			name: "login",
			path:'/login',
			component:login
		},
		{
			path:'/register',
			component:register
		},
		{
			path:'/test',
			component:test
		},
		{
			path:'/test1',
			component:test1
		},
		{
			path:'/my',
			component:my
		},
		{
			path:'/basket',
			component:basket
		},
		{
			path:'/menu',
			component:menu
		},
		{
			name: "food",
			path:'/food',
			component:food
		},
		{
			path:'/twentyFour',
			component:twentyFour
		},
		{
			path:'/type',
			component:type
		},
		{
			path:'/shop',
			component:shop
		},
		{
			path:'/notFound',
			component:notFound
		},
		{
			path:'/address',
			component:address
		},
		{
			path:'/addAddress',
			component:addAddress
		},
		{
			name: "modifyAddress",
			path:'/modifyAddress',
			component:modifyAddress
		},
		{
			name: "confirm",
			path:'/confirm',
			component:confirm
		},
		{
			name: "editMenu",
			path:'/editMenu',
			component:editMenu
		},
		{
			name: "productDetails",
			path:'/productDetails',
			component:productDetails
		},
		{
			name: "pay",
			path:'/pay',
			component:pay
		},
		{
			path:'/myOrder',
			component:myOrder
		},
		{
			path:'/charge',
			component:charge
		},
		{
			path:'/zhifubao',
			component:zhifubao
		},
		{
			path:'/modifyUserInfo',
			component:modifyUserInfo
		},
		{
			path:'/myInfo',
			component:myInfo
		},
		{
			name: "orderDetail",
			path:'/orderDetail',
			component:orderDetail
		},
		{
			path:'/myPost',
			component:myPost
		},
		{
			path:'/afterSale',
			component:afterSale
		},
		{
			name: "evaluate",
			path:'/evaluate',
			component:evaluate
		},
		{
			path:'/popularMenu',
			component:popularMenu
		},
		{
			path:'/myCollection',
			component:myCollection
		},

  ]
})


export default user


