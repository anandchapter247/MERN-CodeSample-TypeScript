"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
exports.ValidationFormatter = (err) => {
    let errorObject = {};
    for (const key in err) {
        if (err.hasOwnProperty(key)) {
            const e = err[key];
            errorObject[e.param] = e.msg;
        }
    }
    return errorObject;
};
