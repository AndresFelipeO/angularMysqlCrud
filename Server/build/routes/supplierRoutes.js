"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplierController_1 = __importDefault(require("../controllers/supplierController"));
class SupplierRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //ruta inicial
        this.router.get('/', supplierController_1.default.list);
        this.router.get('/:id', supplierController_1.default.getOne);
        this.router.post('/', supplierController_1.default.create);
        this.router.put('/:id', supplierController_1.default.update);
        this.router.delete('/:id', supplierController_1.default.delete);
    }
}
const supplierRoutes = new SupplierRoutes();
exports.default = supplierRoutes.router;
