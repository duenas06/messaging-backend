"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesPayloadExists = void 0;
const filesPayloadExists = (req, res, next) => {
    if (!req.hasOwnProperty('files'))
        return res.status(400).json({ status: 'error', message: 'No file found to process' });
    next();
};
exports.filesPayloadExists = filesPayloadExists;
