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
const { createSecretKey } = require('crypto');
const jose_1 = require("jose");
const _256_BIT_KEY = process.env.ENCRYPTION_KEY || '';
const ISSUER = process.env.JOSE_ISSUER || '';
const AUDIENCE = process.env.JOSE_AUDIENCE || '';
const signJWT = (object) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secret = new TextEncoder().encode(createSecretKey(_256_BIT_KEY));
        const alg = 'HS256';
        const jwt = yield new jose_1.SignJWT(Object.assign({}, object))
            .setProtectedHeader({ alg })
            .setExpirationTime('360h') // 15 days
            .setIssuer(ISSUER)
            .setAudience(AUDIENCE)
            .sign(secret);
        return jwt;
    }
    catch (_a) {
        throw new Error('ERR_JWE_ENCRYPTION_FAILED');
    }
});
exports.default = signJWT;
