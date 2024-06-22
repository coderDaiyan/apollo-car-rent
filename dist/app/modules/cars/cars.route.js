"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cars_controller_1 = require("./cars.controller");
const cars_validation_1 = require("./cars.validation");
const carRouter = (0, express_1.Router)();
carRouter.post('/', [(0, auth_1.default)('admin'), (0, validateRequest_1.default)(cars_validation_1.CarValidation.CarValidationSchema)], cars_controller_1.CarControllers.createCar);
carRouter.get('/', cars_controller_1.CarControllers.getAllCars);
carRouter.get('/:id', cars_controller_1.CarControllers.getACar);
carRouter.put('/return', (0, auth_1.default)('admin'), cars_controller_1.CarControllers.returnACar);
carRouter.put('/:id', [(0, auth_1.default)('admin'), (0, validateRequest_1.default)(cars_validation_1.CarValidation.CarUpdateValidationSchema)], cars_controller_1.CarControllers.updateACar);
carRouter.delete('/:id', (0, auth_1.default)('admin'), cars_controller_1.CarControllers.deleteACar);
exports.default = carRouter;
