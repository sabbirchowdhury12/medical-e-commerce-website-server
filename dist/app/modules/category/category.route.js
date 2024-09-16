"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router
    .post('/', (0, validateRequest_1.default)(category_validation_1.ZCategoryCreate), category_controller_1.CategoryController.insertToDB)
    .get('/', category_controller_1.CategoryController.getAllFromDB)
    .get('/:id', category_controller_1.CategoryController.getFromDB)
    .patch('/:id', (0, validateRequest_1.default)(category_validation_1.ZCategoryUpdate), category_controller_1.CategoryController.updateToDB)
    .delete('/:id', category_controller_1.CategoryController.deleteFromDB);
exports.categoryRoutes = router;
