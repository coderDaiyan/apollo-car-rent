"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const bookings_route_1 = __importDefault(require("../modules/bookings/bookings.route"));
const cars_route_1 = __importDefault(require("../modules/cars/cars.route"));
const router = (0, express_1.Router)();
const paths = [
    {
        path: '/bookings',
        route: bookings_route_1.default,
    },
    {
        path: '/users',
        route: cars_route_1.default,
    },
    {
        path: '/auth',
        route: auth_route_1.default,
    },
    {
        path: '/cars',
        route: cars_route_1.default,
    },
];
paths.map((path) => router.use(path.path, path.route));
exports.default = router;
