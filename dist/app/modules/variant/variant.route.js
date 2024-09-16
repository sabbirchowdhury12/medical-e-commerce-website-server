"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variantRoutes = void 0;
const express_1 = require("express");
const variant_controller_1 = require("./variant.controller");
const router = (0, express_1.Router)();
router
    .post('', variant_controller_1.VariantController.insertToDB)
    .patch('', variant_controller_1.VariantController.updateToDB)
    .get('/', variant_controller_1.VariantController.getAllFromDB)
    .get('/:id', variant_controller_1.VariantController.getFromDB)
    .delete('/:id', variant_controller_1.VariantController.deleteFromDB);
exports.variantRoutes = router;
