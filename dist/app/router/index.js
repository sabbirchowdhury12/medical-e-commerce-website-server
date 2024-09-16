"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const profile_route_1 = require("../modules/profile/profile.route");
const variant_route_1 = require("../modules/variant/variant.route");
const category_route_1 = require("../modules/category/category.route");
const product_route_1 = require("../modules/product/product.route");
const order_route_1 = require("../modules/order/order.route");
const router = (0, express_1.Router)();
const routes = [
    { path: '/auth', route: auth_route_1.authRoutes },
    { path: '/profile', route: profile_route_1.profileRoutes },
    { path: '/variant', route: variant_route_1.variantRoutes },
    { path: '/category', route: category_route_1.categoryRoutes },
    { path: '/product', route: product_route_1.productRoutes },
    { path: '/order', route: order_route_1.orderRoutes },
];
routes.forEach(({ path, route }) => {
    router.use(path, route);
});
exports.default = router;
