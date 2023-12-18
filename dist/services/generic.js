"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usTimeZoneDate = exports.formatDate = exports.stringifyJSONB = exports.parseJSONB = exports.parseData = exports.makeId = void 0;
const moment_1 = __importDefault(require("moment"));
//IG GENERATOR
function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.makeId = makeId;
// PARSE RETURN DATA FROM POSTGRES
const parseData = (data) => {
    if (data !== undefined && data !== null) {
        return JSON.parse(JSON.stringify(data));
    }
    else {
        return {};
    }
};
exports.parseData = parseData;
const parseJSONB = (data) => (data ? JSON.parse(data) : []);
exports.parseJSONB = parseJSONB;
const stringifyJSONB = (data) => (typeof data == 'object' ? JSON.stringify(data) : JSON.stringify([]));
exports.stringifyJSONB = stringifyJSONB;
// RANGE OF YEARS OF EXPERIENCE
const formatDate = (date, format) => (0, moment_1.default)(date).format(format);
exports.formatDate = formatDate;
// US TIMEZONE DATE
const usTimeZoneDate = (format) => (0, moment_1.default)().format(format);
exports.usTimeZoneDate = usTimeZoneDate;
