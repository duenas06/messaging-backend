'use strict';
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
const jose_1 = require("jose");
const { createSecretKey } = require('crypto');
const _256_BIT_KEY = process.env.ENCRYPTION_KEY || '';
const UserAccountResolver_1 = require("../graphql/resolvers/UserAccountResolver");
/**
 *
 *  @param jwt the JSON Web Token to be validate
 *
 *  @returns object
 *
 */
const validator = (jwt = '') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secret = new TextEncoder().encode(createSecretKey(_256_BIT_KEY));
        const { payload } = yield (0, jose_1.jwtVerify)(jwt, secret, {
            issuer: process.env.JOSE_ISSUER,
            audience: process.env.JOSE_AUDIENCE,
        });
        const userInfo = yield (0, UserAccountResolver_1.getUserInfo)(payload === null || payload === void 0 ? void 0 : payload.id);
        return userInfo ? userInfo : 'INVALID_TOKEN';
    }
    catch (_a) {
        return 'INVALID_TOKEN';
    }
});
exports.default = validator;
