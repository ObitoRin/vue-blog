import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
/*import Index from '../views/Index/template.vue'
import Create from '../views/Create/template.vue'
import Detail from '../views/Detail/template.vue'
import Edit from '../views/Edit/template.vue'
import Login from '../views/Login/template.vue'
import Register from '../views/Register/template.vue'
import User from '../views/User/template.vue'
import My from '../views/My/template.vue'*/


Vue.use(VueRouter)

/*const router =  new VueRouter({
  routes: [{
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/create',
      component: Create
    },
    {
      path: '/my',
      component: My
    },
    {
      path: '/detail/:blogId',
      component: Detail
    },
    {
      path: '/edit/:blogId',
      component: Edit
    },
    {
      path: '/user/:blogId',
      component: User
    }
  ]
})*/

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
 