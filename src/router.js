import Vue from 'vue'
import Router from 'vue-router'
import login from './components/Login'
import home from './components/Home'
import welcome from './components/Welcome'
import userList from './components/user/UserList'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: welcome },
        { path: '/home/userList', component: userList }
      ]
    }
  ]
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
