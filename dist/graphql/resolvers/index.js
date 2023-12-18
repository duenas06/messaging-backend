"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserResolver_1 = __importDefault(require("./UserResolver"));
const unProtectedResolvers = [(0, UserResolver_1.default)()];
const protectedResolvers = [(0, UserResolver_1.default)()];
const resolvers = {
    unProtectedResolvers,
    protectedResolvers,
};
exports.default = resolvers;
