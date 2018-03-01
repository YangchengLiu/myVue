// 入口文件
import Vue from 'vue'
//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次刚进入网站，肯定会调用main.js，在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到state中
var car = JSON.parse(localStorage.getItem('car')||'[]')
var store = new Vuex.Store({
    state:{
        car:car//将购物车中商品的数据，用一个数组存储起来，在car数组中，存储一些对象，咱们可以暂时将这个商品对象，设计成这个样子{id:商品的id,count:要购买的数量,price:商品的单价,selected:false}
    },
    mutations:{
        addToCar(state,goodsinfo){
            //点击加入购物车，把商品信息保存到store的car上
            //假设在购物车中，没有找到对应商品
            var flag=false
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count+=parseInt(goodsinfo.count)
                    flag=true
                    return true
                }
            })
            //如果循环完毕，flag还是false，把商品添加到购物车中
            if(!flag){
                state.car.push(goodsinfo)
            }
            //当更新car之后，把car数组，存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            //修改购物车中商品数量的值
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count=parseInt(goodsinfo.count)
                    return true
                }
            })
            //当修改完商品的数量，把最新的购物车数据，保存到本地储存中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            //根据Id从store中的购物车中删除那条商品数据
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(i,1)
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id==info.id){
                    item.selected=info.selected
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        //相当于计算属性，也相当于filters
        getAllCount(state){
            var c =0;
            state.car.forEach(item=>{
                c+=item.count
            })
            return c
        },
        getGoodsCount(state){
            var o={}
            state.car.forEach(item=>{
                o[item.id]=item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o={}
            state.car.forEach(item=>{
                o[item.id]=item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o={
                count:0,
                amount:0
            }
            state.car.forEach(item=>{
                if(item.selected){
                    o.count+=item.count
                    o.amount+=item.price*item.count
                }
            })
            return o
        }
    }
})
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
    router,
    store
})