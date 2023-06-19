"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.loginUser = exports.registerController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Helpers_1 = require("../Helpers");
const joiauth_1 = require("../Helpers/joiauth");
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //creates users id
        let User_Id = (0, uuid_1.v4)();
        console.log(User_Id);
        //gets users data from the body
        const { Username, Email, Password } = req.body;
        console.log(req.body);
        //validate first
        const { error } = joiauth_1.registrationSchema.validate(req.body);
        if (error) {
            return res.status(404).json(error.details[0].message);
        }
        const hashedPassword = yield bcrypt_1.default.hash(Password, 10);
        yield Helpers_1.DatabaseHelper.exec('insertUsers', { User_Id, Username, Email, Password: hashedPassword });
        return res.status(201).json({ message: "user added" });
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
});
exports.registerController = registerController;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        const result = yield Helpers_1.DatabaseHelper.exec('GetEmail', { Email });
        const user = result.recordset[0];
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isValidPassword = yield bcrypt_1.default.compare(Password, user.Password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const { resetSuccess, Username, isDeleted, User_Id } = user, rest = __rest(user, ["resetSuccess", "Username", "isDeleted", "User_Id"]);
        console.log(user);
        const payload = rest;
        console.log(payload);
        const token = jsonwebtoken_1.default.sign(payload, 'ttttweywastring', { expiresIn: '360000s' });
        return res.json({ mesage: "Login Successfull!!", token, role: user.isAdmin, username: user.username });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.loginUser = loginUser;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, newPassword } = req.body;
        const { error } = joiauth_1.resetPasswordSchema.validate(req.body);
        if (error) {
            return res.status(404).json(error.details[0].message);
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        let result = yield Helpers_1.DatabaseHelper.exec('ResetsPassword', { Email, newPassword: hashedPassword });
        if (result.rowsAffected[0] > 0) {
            let response = result.rowsAffected[0];
            return res.status(200).json({ message: "password reset successfully" });
            console.log(response);
        }
        else {
            return res.status(404).json({ message: "user does not exist" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.resetPassword = resetPassword;
