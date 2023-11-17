import Layout from '@/layout'

const files = require.context('../pages', true, /\.vue$/)
const routesMap = []
files.keys().forEach(name => {
    const matches = name.match(/^.\/([\w-]+)\/([\w-]+).vue$/)
    if (!matches) return
    const meta = files(name).default.meta || {}
    if (!routesMap[matches[1]]) {
      routesMap[matches[1]] = {
        path: `/${matches[1]}`,
        component: Layout,
        children: [],
        meta: {
          title: meta.cateTitle || matches[1],
          icon: meta.icon || '',
        }
      }
    }
    if (meta.cateTitle) {
      routesMap[matches[1]].meta.title = meta.cateTitle
    }
    routesMap[matches[1]].children.push({
      path: matches[2],
      component: files(name).default,
      meta: {
        title: meta.title || matches[2],
        icon: meta.icon || '',
      }
    })
})

export const asyncRoutes = Object.values(routesMap)
