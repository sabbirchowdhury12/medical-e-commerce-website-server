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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const product_model_1 = require("./product.model");
const product_constant_1 = require("./product.constant");
const pagination_1 = require("../../../helper/pagination");
const insertToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
const updateToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
    }).exec();
    return result;
});
const getAllFromDB = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: product_constant_1.productSearchableFields.map(element => ({
                [element]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = pagination_1.pagination.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const total = yield product_model_1.Product.countDocuments();
    const whereConditon = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield product_model_1.Product.find(whereConditon)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    return {
        meta: {
            page,
            limit,
            total,
            skip,
        },
        data: result,
    };
});
const getByCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({ categoryId: id }).exec();
    return result;
});
const getBySubCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({ categoryId: id }).exec();
    return result;
});
const getFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.Product.findById(id).populate('variants').exec();
        return result;
    }
    catch (error) {
        console.error(`Failed to fetch product with id ${id}:`, error);
        return null;
    }
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id).exec();
    return result;
});
exports.ProductService = {
    insertToDB,
    updateToDB,
    getAllFromDB,
    getFromDB,
    deleteFromDB,
    getByCategory,
    getBySubCategory,
};
