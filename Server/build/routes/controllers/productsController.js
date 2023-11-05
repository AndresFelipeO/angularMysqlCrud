"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductsController {
    index(req, res) {
        res.send('Products');
    }
}
const indexController = new ProductsController();
exports.default = indexController;
