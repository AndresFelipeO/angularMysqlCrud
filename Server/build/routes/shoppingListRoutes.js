"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shoppingListController_1 = __importDefault(require("../controllers/shoppingListController"));
class ShoppingListRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //ruta inicial
        this.router.get('/', shoppingListController_1.default.list);
        this.router.get('/:id', shoppingListController_1.default.getOne);
        this.router.get('/user/:id', shoppingListController_1.default.listUser);
        this.router.post('/', shoppingListController_1.default.create);
        this.router.put('/:id', shoppingListController_1.default.update);
        this.router.delete('/:id', shoppingListController_1.default.delete);
    }
}
const shoppingListRoutes = new ShoppingListRoutes();
exports.default = shoppingListRoutes.router;
