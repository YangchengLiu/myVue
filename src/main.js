// 入口文件
import Vue from 'vue'
//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//2.1 导入 vue-resource
//2.2 安装 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//导入App根组件
import app from './App.vue'
//1.3淡入自己的router.js路由模块
import router from './router.js'
//按需导入 Mint-UI中的组件
import {Header,Swipe, SwipeItem} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem)
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router 
})