"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return next(result.error);
        }
        next();
    };
};
exports.validate = validate;
