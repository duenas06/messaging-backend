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
const generic_1 = require("../../services/generic");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const UserResolver = () => ({
    Query: {
        getUserById: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield UserModel_1.default.query().where({ id: args.input.id });
                return {
                    status: result[0] !== null ? 'success' : 'failed',
                    message: result[0] !== null ? 'User details retrieved.' : 'No User details retrieved.',
                    data: result[0],
                };
            }
            catch (e) {
                return {
                    status: 'failed',
                    message: 'Sorry User cannot be retrieved, unknown error.',
                    data: null,
                };
            }
        }),
    },
    Mutation: {
        postNewUser: (_, args, conteValue) => __awaiter(void 0, void 0, void 0, function* () {
            var result = null;
            var status = 'success';
            var message = 'Sorry user cannot be created, user already existed.';
            console.log(args === null || args === void 0 ? void 0 : args.input);
            try {
                const dataExisted = yield UserModel_1.default.query().where({
                    userId: args === null || args === void 0 ? void 0 : args.input.userId,
                });
                if (dataExisted.length === 0) {
                    // @ts-ignore
                    result = yield UserModel_1.default.query().insert({
                        // @ts-ignore
                        username: args === null || args === void 0 ? void 0 : args.input.username,
                        nickname: args === null || args === void 0 ? void 0 : args.input.nickname,
                        profileUrl: args === null || args === void 0 ? void 0 : args.input.profileUrl,
                        createdDate: (0, generic_1.usTimeZoneDate)('MM-DD-YYYY'),
                    });
                    message = 'New user was successfully created';
                }
                return {
                    status: status,
                    message: message,
                    data: result,
                };
            }
            catch (e) {
                return {
                    status: 'failed',
                    message: 'Sorry user cannot be created, unknown error.',
                    data: null,
                };
            }
        }),
    },
});
exports.default = UserResolver;
