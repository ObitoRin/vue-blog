import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

//懒加载
const router =  new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/views/Index/template.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/Login/template.vue')
    },
    {
      path: '/detail/:blogId',
      component: () => import('@/views/Detail/template.vue')
    },
    {
      path: '/edit/:blogId',
      component: () => import('@/views/Edit/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      component: () => import('@/views/Create/template.vue'),
      meta: { requiresAuth: true }//登录后才能访问的组件
    },
    {
      path: '/user/:userId',
      component: () => import('@/views/User/template.vue')
    },
    {
      path: '/my',
      component: () => import('@/views/My/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      component: () => import('@/views/Register/template.vue')
    }
  ]
})

// 导航守卫  路由创建之前
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断用户是否登录  没登录就跳转到登录页面  登录了就继续执行下去
    store.dispatch('checkLogin').then(isLogin=>{
      if (!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }    
    })
  } else {
    next()
  }
})

export default router
 