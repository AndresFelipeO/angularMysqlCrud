"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //ruta inicial
        this.router.get('/', userController_1.default.list);
        this.router.post('/login', userController_1.default.loginUser);
        this.router.post('/', userController_1.default.create);
        this.router.put('/:id', userController_1.default.update);
        this.router.delete('/:id', userController_1.default.delete);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
