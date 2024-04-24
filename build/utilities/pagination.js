"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffSet = void 0;
const getOffSet = ({ skip = 1, take = 1000, }) => {
    const offSetBySkip = (skip - 1) * take;
    return offSetBySkip;
};
exports.getOffSet = getOffSet;
