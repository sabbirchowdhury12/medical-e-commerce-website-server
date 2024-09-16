"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantService = void 0;
const variant_model_1 = require("./variant.model");
const insertToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield variant_model_1.Variant.create(payload);
    return category;
});
const updateToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield variant_model_1.Variant.findByIdAndUpdate(id, payload, {
        new: true,
    }).exec();
    return category;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield variant_model_1.Variant.find().exec();
    return categories;
});
const getFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield variant_model_1.Variant.findOne({ id });
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield variant_model_1.Variant.findByIdAndDelete(id).exec();
    return result;
});
exports.VariantService = {
    insertToDB,
    updateToDB,
    getAllFromDB,
    getFromDB,
    deleteFromDB,
};
