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
exports.getUserInfo = void 0;
const logger_service_1 = require("../../services/logger.service");
const models_1 = require("../models");
const getUserInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const model = models_1.ProfileModel;
        return yield model.query().select('*').findById(id);
    }
    catch (e) {
        (0, logger_service_1.logger)('getUserInfo', 'getUserInfo', e.message);
        return null;
    }
});
exports.getUserInfo = getUserInfo;
