"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./Routes/userRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/usersroutes', userRoutes_1.router);
app.listen(4000, () => {
    console.log('server running');
});
