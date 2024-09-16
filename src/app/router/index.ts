import { Router } from 'express'

import { authRoutes } from '../modules/auth/auth.route'
import { profileRoutes } from '../modules/profile/profile.route'
import { variantRoutes } from '../modules/variant/variant.route'
import { categoryRoutes } from '../modules/category/category.route'
import { productRoutes } from '../modules/product/product.route'
import { orderRoutes } from '../modules/order/order.route'

const router = Router()

const routes = [
  { path: '/auth', route: authRoutes },
  { path: '/profile', route: profileRoutes },
  { path: '/variant', route: variantRoutes },
  { path: '/category', route: categoryRoutes },
  { path: '/product', route: productRoutes },
  { path: '/order', route: orderRoutes },
]

routes.forEach(({ path, route }) => {
  router.use(path, route)
})

export default router
