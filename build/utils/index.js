"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIsoDate = void 0;
const getIsoDate = (date) => {
    const toDateFormat = new Date(date);
    return toDateFormat.toISOString();
};
exports.getIsoDate = getIsoDate;
