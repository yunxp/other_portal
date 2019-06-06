import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRoutes = [
  // { path: '/login', redirect: 'localhost:3000/app_login?app_name=cage' },
  { path: '/login', hidden: true,
    beforeEnter(to, from, next) {
      // Put the full page url including the protocol http(s) below
      window.location = 'http://localhost:3000/app_login?app_name=cage'
    }
  },
  { path: '/auth-redirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta:
      { title: 'dashboard', icon: 'dashboard' }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/player',
    component: Layout,
    redirect: '/player/search',
    name: 'fund_management',
    alwaysShow: true,
    meta: {
      permissions: ['player_balance_enquiry'],
      title: 'fundManagement',
      icon: 'user'
    },
    children: [
      {
        path: 'search',
        name: 'Search',
        component: () => import('@/views/player/search'),
        meta:
        {
          permissions: ['player_balance_enquiry'],
          title: 'balanceEnquiry',
          icon: 'list'
        },
        children: [
          {
            path: 'detail/:id_type/:id_value',
            name: 'Detail',
            hidden: true,
            component: () => import('@/views/player/detail'),
            meta:
            {
              permissions: ['player_balance_enquiry']
            }
          }
        ]
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
