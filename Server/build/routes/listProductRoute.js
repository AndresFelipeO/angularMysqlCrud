"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listProductController_1 = __importDefault(require("../controllers/listProductController"));
const validate_token_1 = __importDefault(require("./validate-token"));
class ListProductControllerRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //ruta inicial
        this.router.get('/:id', validate_token_1.default, listProductController_1.default.list);
        this.router.post('/', validate_token_1.default, listProductController_1.default.create);
        this.router.put('/:id', validate_token_1.default, listProductController_1.default.update);
        this.router.delete('/:id', validate_token_1.default, listProductController_1.default.delete);
    }
}
const listProductControllerRoutes = new ListProductControllerRoutes();
exports.default = listProductControllerRoutes.router;
