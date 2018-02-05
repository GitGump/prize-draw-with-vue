import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        name: 'index',
        component: App.components.index
    },
    {
    	path: '/qian',
    	name: '前',
    	component: resolve => require(['@/components/qian.vue'], resolve)
    },
    {
    	path: '/cheng',
    	name: '程',
    	component: resolve => require(['@/components/cheng.vue'], resolve)
    },
    {
    	path: '/si',
    	name: '似',
    	component: resolve => require(['@/components/si.vue'], resolve)
    },
    {
    	path: '/jin',
    	name: '锦',
    	component: resolve => require(['@/components/jin.vue'], resolve)
    },
    {
    	path: '/meng',
    	name: '梦',
    	component: resolve => require(['@/components/meng.vue'], resolve)
    },
    {
    	path: '/xiang',
    	name: '想',
    	component: resolve => require(['@/components/xiang.vue'], resolve)
    },
    {
    	path: '/cheng2',
    	name: '成',
    	component: resolve => require(['@/components/cheng2.vue'], resolve)
    },
    {
    	path: '/zhen',
    	name: '真',
    	component: resolve => require(['@/components/zhen.vue'], resolve)
    }
  ]
})
