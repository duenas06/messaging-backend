"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const User_1 = __importDefault(require("./User"));
const unProtectedDef = (0, merge_1.mergeTypeDefs)([User_1.default]);
const protectedDef = (0, merge_1.mergeTypeDefs)([User_1.default]);
const schemas = {
    unProtectedDef,
    protectedDef,
};
exports.default = schemas;
