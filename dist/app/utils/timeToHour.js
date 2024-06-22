"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeToHour = void 0;
const timeToHour = (time) => {
    const hour = Number(time.split(':')[0]);
    const min = Number(time.split(':')[1]);
    const minsInHour = min / 60;
    return hour + minsInHour;
};
exports.timeToHour = timeToHour;
