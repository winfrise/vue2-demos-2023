import Vue from 'vue'
import Router from 'vue-router'

import { constantRoutes } from './constantRoutes'
import { asyncRoutes } from './asyncRoutes'

Vue.use(Router)

const createRouter = () => new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [...asyncRoutes, ...constantRoutes]
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
