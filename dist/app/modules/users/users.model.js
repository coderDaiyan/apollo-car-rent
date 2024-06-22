"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
});
userSchema.pre('save', async function (next) {
    this.password = await bcrypt_1.default.hash(this.password, Number(config_1.default.salt_rounds));
    next();
});
userSchema.post('save', function (data, next) {
    data.password = '';
    next();
});
userSchema.statics.checkPasswordMatch = async function checkPasswordMatch(password, hash) {
    return await bcrypt_1.default.compare(password, hash);
};
userSchema.statics.ifUserExists = async function ifUserExists(email) {
    const data = await User.findOne({ email });
    return data;
};
userSchema.statics.ifUserExistsById = async function ifUserExists(id) {
    const data = await User.findOne({ _id: id });
    return data;
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
