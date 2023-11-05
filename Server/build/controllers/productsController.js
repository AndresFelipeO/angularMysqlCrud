"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const databases_1 = __importDefault(require("../databases"));
class ProductsController {
    index(req, res) {
        databases_1.default.query('describe user;');
        res.json('producttt');
    }
}
const indexController = new ProductsController();
exports.default = indexController;
