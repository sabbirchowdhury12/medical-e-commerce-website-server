"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const product_controller_1 = require("./product.controller");
const express_1 = require("express");
const product_validation_1 = require("./product.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router
    .post('/', (0, validateRequest_1.default)(product_validation_1.ZProductCreate), product_controller_1.ProductController.insertToDB)
    .patch('/', (0, validateRequest_1.default)(product_validation_1.ZProductUpdate), product_controller_1.ProductController.updateToDB)
    .get('/', product_controller_1.ProductController.getAllFromDB)
    .get('/category/:id', product_controller_1.ProductController.getByCategory)
    // .get('/sub-categry', ProductController.getBySubCategory)
    .get('/:id', product_controller_1.ProductController.getFromDB)
    .delete('/:id', product_controller_1.ProductController.deleteFromDB);
exports.productRoutes = router;
