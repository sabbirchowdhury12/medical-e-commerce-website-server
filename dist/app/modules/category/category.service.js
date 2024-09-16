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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_model_1 = __importDefault(require("./category.model"));
const insertToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.create(payload);
    return category;
});
const updateToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    }).exec();
    return category;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.default.find().exec();
    return categories;
});
const getFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield category_model_1.default.findById(id).exec();
    console.log(result);
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.default.findByIdAndDelete(id).exec();
    return result;
});
exports.CategoryService = {
    insertToDB,
    updateToDB,
    getAllFromDB,
    getFromDB,
    deleteFromDB,
};
