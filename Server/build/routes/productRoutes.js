"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controllers/productController"));
const validate_token_1 = __importDefault(require("./validate-token"));
class ProductRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //ruta inicial
        this.router.get('/', validate_token_1.default, productController_1.default.list);
        this.router.get('/:id', validate_token_1.default, productController_1.default.getOne);
        this.router.post('/', validate_token_1.default, productController_1.default.create);
        this.router.put('/:id', validate_token_1.default, productController_1.default.update);
        this.router.delete('/:id', validate_token_1.default, productController_1.default.delete);
    }
}
const productRoutes = new ProductRoutes();
exports.default = productRoutes.router;
