// 入口文件
import Vue from 'vue'
//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})
//2.1 导入 vue-resource
//2.2 安装 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://vue.studyit.io'
//全局设置post时候表单数据格式组织形式
Vue.http.options.emulateJSON = true
//导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//导入App根组件
import app from './App.vue'
//1.3淡入自己的router.js路由模块
import router from './router.js'
//按需导入 Mint-UI中的组件
/* import { Header, Swipe, SwipeItem, Button,Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload) */
import MintUI from 'mint-ui'
Vue.use(MintUI)
//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import 'mint-ui/lib/style.css'
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})