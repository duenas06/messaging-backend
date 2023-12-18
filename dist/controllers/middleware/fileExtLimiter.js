"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExtLimiter = void 0;
const path_1 = __importDefault(require("path"));
const fileExtLimiter = (allowedExtArray) => {
    return (req, res, next) => {
        const files = req.files;
        const fileExtensions = [];
        Object.keys(files).forEach((key) => {
            const extName = path_1.default.extname(files[key].name);
            // @ts-ignore
            fileExtensions.push(extName);
        });
        // Are the file extension allowed?
        const allowed = fileExtensions.every((ext) => allowedExtArray.includes(ext));
        if (!allowed) {
            const formats = allowedExtArray.map((ext) => ext.replace('.', '')).join(', ');
            const message = `Upload failed,${formats.toString()} files are only allowed.`.replace(',', ', ');
            return res.status(400).json({ status: 'error', message });
        }
        next();
    };
};
exports.fileExtLimiter = fileExtLimiter;
