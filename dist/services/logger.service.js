"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (file, method, message) => {
    const payload = {
        file: file,
        function: method,
        message: message,
    };
    console.debug(payload);
};
exports.logger = logger;
