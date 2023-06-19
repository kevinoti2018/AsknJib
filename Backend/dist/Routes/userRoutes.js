"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const userControllers_1 = require("../Controllers/userControllers");
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.post('/register', userControllers_1.registerController);
exports.router.post('/login', userControllers_1.loginUser);
exports.router.post('/reset', userControllers_1.resetPassword);
