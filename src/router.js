import Vue from 'vue'
import Router from "vue-router"
import Index from "./page/index.vue"
import Login from "./page/login.vue"
import Order from "./page/order.vue"
import Gift from "./page/gift.vue"
import OrderDetail from "./page/orderDetail.vue"
import LogisticsDetail from "./page/logisticsDetail.vue"
import ProductList from "./page/productList.vue"
import Code from "./page/code.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  base:'/integral/',
  routes:[
    {
      path: '/',
      name: "index",
      component: Index
    },
    {
      path: '/index',
      name: "index",
      component: Index
    },
    {
      path:'/login',
      name: "login",
      component: Login
    },
    {
      path:'/order',
      name: "order",
      component: Order
    },
    {
      path:'/orderDetail',
      name: "orderDetail",
      component: OrderDetail
    },
    {
      path:'/gift',
      name: "gift",
      component: Gift
    },
    {
      path:'/logisticsDetail',
      name: "logisticsDetail",
      component: LogisticsDetail
    },
    {
      path:'/productList',
      name: "productList",
      component: ProductList
    },
    {
      path:'/code',
      name: "code",
      component: Code
    }
  ]
})