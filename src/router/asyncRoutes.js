import Layout from '@/layout'

const files = require.context('../pages', true, /\.vue$/)
const routesMap = []
files.keys().forEach(name => {
    const matches = name.match(/^.\/([\w-]+)\/([\w-]+).vue$/)
    if (!matches) return
    if (!routesMap[matches[1]]) {
      routesMap[matches[1]] = {
        path: `/${matches[1]}`,
        component: Layout,
        children: [],
        meta: {
          title: matches[1]
        }
      }
    }
    routesMap[matches[1]].children.push({
      path: matches[2],
      component: files(name).default,
      meta: {
        title: matches[2],
      }
    })
})

export const asyncRoutes = Object.values(routesMap)
